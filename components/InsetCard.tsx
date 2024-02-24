import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Inset,
  Link,
  Text,
} from "@radix-ui/themes";

import React from "react";
// @ts-ignore
import { Thumbnail } from "@samvera/clover-iiif/primitives";

interface InsetCardProps {
  children: React.ReactNode;
  href: string;
  imageSrc: string;
  side?: "left" | "right";
  title: string;
  type?: "image" | "video";
}

const InsetCard: React.FC<InsetCardProps> = ({
  children,
  href,
  imageSrc,
  side = "left",
  title,
  type = "image",
}) => {
  const deg = side === "left" ? "270deg" : "90deg";

  return (
    <Flex
      gap="6"
      style={{
        position: "relative",
        minHeight: "600px",
      }}
      direction="column"
      justify="end"
    >
      <Box
        style={{
          display: "block",
          objectFit: "cover",
          minWidth: "800px",
          height: "600px",
          position: "absolute",
          right: side === "right" ? "0" : "auto",
          left: side === "left" ? "0" : "auto",
          filter: "opacity(0.382) sepia(1) contrast(1.382) brightness(0.618)",
          maskImage: `linear-gradient(${deg}, transparent 5%, #000 100%)`,
        }}
      >
        {type === "video" ? (
          <Thumbnail
            thumbnail={[
              {
                type: "Video",
                id: "https://meadow-streaming.rdc.library.northwestern.edu/6f/a4/29/85/-6/c8/f-/44/b6/-9/2d/d-/6b/e8/d1/92/ee/38/inu-brkflk-ac_AstiFolkFestival.m3u8#t=75,105",
                format: "application/x-mpegurl",
                width: 800,
                height: 600,
                duration: 30,
              },
            ]}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <img
            src={imageSrc}
            alt={title}
            style={{
              display: "block",
              objectFit: "cover",
              width: "800px",
              height: "600px",
            }}
          />
        )}
      </Box>
      <Box my="9">
        <Container size="3">
          <Box
            style={{
              paddingLeft: side === "left" ? "38.2%" : "0",
              paddingRight: side === "right" ? "38.2%" : "0",
            }}
          >
            <Text>
              <Heading as="h3" weight="medium" size="5" mb="3">
                <Link href={href} target="_blank">
                  {title}
                </Link>
              </Heading>
              {children}
            </Text>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};
export default InsetCard;
