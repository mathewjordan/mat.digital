"use client";

import { Box, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import { GitHubLogoIcon, ImageIcon, Link1Icon } from "@radix-ui/react-icons";

import Image from "next/image";
import React from "react";
import UILink from "../Link";

interface UIProjectProps {
  children?: React.ReactNode;
  href: string;
  hrefLabel?: string;
  repository?: string;
  title: string;
  thumbnail?: { id: string; type: string }[];
}

const UIProject: React.FC<UIProjectProps> = ({
  children,
  href,
  hrefLabel,
  repository,
  title,
  thumbnail,
}) => {
  const image = thumbnail?.find((item) => item.type === "Image");
  return (
    <Box my="3">
      <Card size="2" variant="ghost">
        <Flex gap="4">
          {thumbnail && (
          <Inset
            side="left"
            p="0"
            m="current"
            style={{
              flexShrink: 0,
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              position: "relative",
              backgroundColor: "var(--gray-1)",
            }}
            className="project-inset"
          >
            {image ? (
              <Image
                src={image.id}
                alt=""
                width={120}
                height={120}
                style={{
                  objectFit: "cover",
                  opacity: 0.618,
                }}
              />
            ) : (
              <span className="project-placeholder" aria-hidden="true">
                <ImageIcon width={24} height={24} />
              </span>
            )}
          </Inset>
          )}
          <Box className="project-content">
            <Heading as="h3" size="5" weight="regular">
              {title}
            </Heading>
            <Flex gap="4" asChild mt="2" align="center" wrap="wrap" className="project-links">
              <Text
                size={{
                  initial: "1",
                  sm: "2",
                }}
              >
                <Flex asChild align="center" gap="2">
                  <UILink href={href} target="_blank" rel="noopener noreferrer">
                    <Link1Icon color="currentColor" width="1em" aria-hidden="true" />
                    {hrefLabel ? hrefLabel : href}
                  </UILink>
                </Flex>
                {repository && (
                  <Flex asChild align="center" gap="2">
                    <UILink href={repository} target="_blank" rel="noopener noreferrer" aria-label={`${title} source code`}>
                      <GitHubLogoIcon color="currentColor" width="1em" aria-hidden="true" />
                      Code
                    </UILink>
                  </Flex>
                )}
              </Text>
            </Flex>
            <Text>{children}</Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default UIProject;
