"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "@/lib/markdown-helpers";

export default function Toc({ headings }: { headings: TocEntry[] }) {
  const details = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  // <details> stays uncontrolled: the browser owns the open attribute, and this
  // state only mirrors it. Passing `open` back in fights the native toggle.
  function close() {
    if (details.current) details.current.open = false;
  }

  // The toggle event does not bubble, so React's delegated onToggle never fires
  // here. Listen natively instead, or the label and aria state drift from the
  // panel the browser is actually showing.
  useEffect(() => {
    const element = details.current;
    if (!element) return;
    const sync = () => setOpen(element.open);
    sync();
    element.addEventListener("toggle", sync);
    return () => element.removeEventListener("toggle", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!details.current?.contains(event.target as Node)) close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      close();
      details.current?.querySelector("summary")?.focus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (headings.length < 2) return null;

  return (
    <details ref={details} className="post-toc">
      <summary aria-expanded={open}>
        {/* The label carries the layout: setting display on <summary> itself
            strips its disclosure semantics in Chrome. */}
        <span className="post-toc-label">
          Contents
          <ChevronDownIcon aria-hidden="true" />
        </span>
      </summary>
      <nav aria-label="Article sections">
        <ol>
          {headings.map((heading) => (
            <li key={heading.id} data-level={heading.level}>
              <a href={`#${heading.id}`} onClick={close}>{heading.text}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
