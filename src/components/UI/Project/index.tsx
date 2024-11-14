"use client";

import { Box, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import { GitHubLogoIcon, Link1Icon } from "@radix-ui/react-icons";

import Image from "next/image";
import { PrimitivesThumbnail } from "@samvera/clover-iiif";
import React from "react";
import { Thumbnail } from "@samvera/clover-iiif/primitives";
import UILink from "../Link";

interface UIProjectProps {
  children?: React.ReactNode;
  href: string;
  hrefLabel?: string;
  repository?: string;
  title: string;
  thumbnail: any;
}

const UIProject: React.FC<UIProjectProps> = ({
  children,
  href,
  hrefLabel,
  repository,
  title,
  thumbnail,
}) => {
  // @ts-ignore
  return (
    <Box my="3">
      <Card size="2" variant="ghost">
        <Flex gap="4">
          <Inset
            side="left"
            p="0"
            m="current"
            style={{
              flexShrink: 0,
              width: "60px",
              height: "60px",
              overflow: "hidden",
              borderRadius: "50%",
              position: "relative",
              boxShadow: "var(--shadow-4)",
              opacity: 0.382,
            }}
            className="project-inset"
          >
            {thumbnail[0].type === "Image" ? (
              <Image
                src={thumbnail[0].id}
                alt=""
                width={60}
                height={60}
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <Thumbnail thumbnail={thumbnail} />
            )}
          </Inset>
          <Box>
            <Heading as="h3" size="5">
              {title}
            </Heading>
            <Flex gap="4" asChild mt="2" align="center" wrap="wrap">
              <Text
                size={{
                  initial: "1",
                  sm: "2",
                }}
              >
                <Flex asChild align="center" gap="2">
                  {/* 
                  // @ts-ignore */}
                  <UILink href={href} target="_blank">
                    <Link1Icon color="var(--gray-8)" width="1em" />
                    {hrefLabel ? hrefLabel : href}
                  </UILink>
                </Flex>
                {repository && (
                  <Flex asChild align="center" gap="2">
                    {/* 
                    // @ts-ignore */}
                    <UILink href={repository} target="_blank">
                      <GitHubLogoIcon color="var(--gray-8)" width="1em" />
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
