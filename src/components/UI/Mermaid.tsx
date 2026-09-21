"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

let initialized = false;
let nextDiagramId = 0;

// Hydration signal without setState-in-effect: the server snapshot is false,
// the client snapshot is true, and nothing ever changes after that.
const neverChanges = () => () => {};
const onClient = () => true;
const onServer = () => false;

export default function Mermaid({ chart }: { chart: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<{ chart: string; svg: string }>();
  const [failedChart, setFailedChart] = useState<string>();
  const [inView, setInView] = useState(false);
  const svg = result?.chart === chart ? result.svg : undefined;
  const failed = failedChart === chart;

  // The source block is the fallback for no JavaScript and for a diagram that
  // will not compile, so it has to be in the server-rendered HTML. Once script
  // is running we can swap it for a placeholder, since a render is coming.
  const hydrated = useSyncExternalStore(neverChanges, onClient, onServer);

  const canObserve = hydrated && typeof IntersectionObserver !== "undefined";
  // Nothing to wait for when the browser cannot tell us what is on screen.
  const near = inView || (hydrated && !canObserve);

  // Mermaid is by far the heaviest thing on an article, so hold the import
  // until the diagram is nearly in view. The margin starts the fetch before
  // the reader arrives, so the source block is rarely seen.
  useEffect(() => {
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    const diagramId = `mermaid-diagram-${++nextDiagramId}`;

    async function renderDiagram() {
      try {
        const { default: mermaid } = await import("mermaid");
        await document.fonts.ready;
        if (cancelled || !container.current) return;

        if (!initialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            suppressErrorRendering: true,
            htmlLabels: false,
            theme: "base",
            // Mermaid 12 defaults to a styled look with drop shadows and
            // gradient borders; "classic" keeps the diagram flat.
            look: "classic",
            fontFamily: getComputedStyle(container.current).fontFamily,
            // Diagrams use the amber scale; the accent is reserved for links and actions.
            themeVariables: {
              darkMode: true,
              background: "#202020",
              primaryColor: "#412700",
              primaryTextColor: "#ffe7b3",
              primaryBorderColor: "#ffc100",
              secondaryColor: "#1d180f",
              tertiaryColor: "#1d180f",
              lineColor: "#ffc916",
              textColor: "#ffe7b3",
              mainBkg: "#412700",
              clusterBkg: "#16120c",
              clusterBorder: "#8f6424",
              edgeLabelBackground: "#202020",
              fontSize: "16px",
            },
            flowchart: {
              useMaxWidth: true,
              curve: "linear",
              nodeSpacing: 36,
              rankSpacing: 76,
              padding: 28,
              subGraphTitleMargin: { top: 8, bottom: 16 },
            },
          });
          initialized = true;
        }

        const rendered = await mermaid.render(diagramId, chart);
        if (!cancelled) {
          const diagram = new DOMParser().parseFromString(rendered.svg, "image/svg+xml").documentElement;
          // These static diagrams have a complete title and description, like an image.
          diagram.setAttribute("role", "img");
          setResult({ chart, svg: new XMLSerializer().serializeToString(diagram) });
          setFailedChart(undefined);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Unable to render Mermaid diagram:", error);
          setFailedChart(chart);
        }
      }
    }

    void renderDiagram();
    return () => { cancelled = true; };
  }, [chart, near]);

  return (
    <figure className="mermaid-figure">
      {/* The rendered diagram scales to fit, so only the source fallback can
          overflow. Make this a keyboard-scrollable region just for that case,
          rather than leaving a focus stop with nothing to scroll. */}
      <div
        ref={container}
        className="mermaid-diagram"
        aria-busy={!svg && !failed}
        {...(svg ? {} : { role: "region", "aria-label": "Diagram source", tabIndex: 0 })}
      >
        {svg ? (
          <div className="mermaid-svg" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : hydrated && !failed ? (
          <div className="mermaid-loading" aria-hidden="true" />
        ) : (
          <pre><code>{chart}</code></pre>
        )}
      </div>
      {failed && (
        <figcaption role="status">This diagram could not be displayed. Its text is shown above.</figcaption>
      )}
    </figure>
  );
}
