import { Box, Card, Flex, Heading, Inset, Link, Text } from "@radix-ui/themes";

import React from "react";
// @ts-ignore
import { Thumbnail } from "@samvera/clover-iiif/primitives";

interface InsetCardProps {
  children: React.ReactNode;
  href: string;
  imageSrc: string;
  title: string;
  type?: "image" | "video";
}

const InsetCard: React.FC<InsetCardProps> = ({
  children,
  href,
  imageSrc,
  title,
  type = "image",
}) => {
  return (
    <Card size="4" style={{ backgroundColor: "var(--accent-1)" }}>
      <Flex gap="6">
        <Inset
          side="left"
          style={{
            width: "200px",
            minHeight: "200px",
            flexShrink: 0,
            backgroundColor: "var(--accent-6)",
            position: "relative",
          }}
        >
          <Box
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              filter:
                "opacity(0.6) grayscale(0.9) contrast(1.382) brightness(1.382)",
              maskImage: "linear-gradient(310deg, #0009 0%, #000 20%)",
            }}
          >
            {type === "video" ? (
              <Thumbnail
                thumbnail={[
                  {
                    type: "Video",
                    id: "https://meadow-streaming.rdc.library.northwestern.edu/6f/a4/29/85/-6/c8/f-/44/b6/-9/2d/d-/6b/e8/d1/92/ee/38/inu-brkflk-ac_AstiFolkFestival.m3u8#t=75,105",
                    format: "application/x-mpegurl",
                    width: 200,
                    height: 300,
                    duration: 30,
                  },
                ]}
                style={{
                  display: "block",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />
            ) : (
              <img
                src={imageSrc}
                alt={title}
                style={{
                  display: "block",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </Box>
        </Inset>
        <Text>
          <Heading as="h3" weight="medium" size="4" mb="3">
            <Link href={href} target="_blank">
              {title}
            </Link>
          </Heading>
          {children}
        </Text>
      </Flex>
    </Card>
  );
};
export default InsetCard;
