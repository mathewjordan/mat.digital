"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const DynamicThumbnail = dynamic(
  () =>
    import("@samvera/clover-iiif/primitives").then(
      (Primitives) => Primitives.Thumbnail
    ),
  {
    loading: () => <></>,
  }
);

const Figure = () => {
  return (
    <div
      style={{
        height: "600px",
        width: "100%",
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        objectFit: "contain",
        objectPosition: "50% 50%",
        overflow: "hidden",
        maskImage:
          "linear-gradient(0deg, transparent 6em, black, #0006 calc(100% - 3em))",
        opacity: 1,
        zIndex: -1,
        background: "var(--accent-a3)",
      }}
    >
      <Image
        src={"/flower-gap.jpg"}
        layout="fill"
        objectFit="cover"
        alt="flower-gap"
        style={{
          objectFit: "cover",
          mixBlendMode: "multiply",
          opacity: 0.618,
        }}
      />
    </div>
  );
};

export default Figure;
