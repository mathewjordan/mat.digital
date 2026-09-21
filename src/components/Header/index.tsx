import {
  Container,
  Flex,
  Link,
  Section,
} from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

import UILink from "../UI/Link";

export default function Header() {
  return (
    <>
      <Section
        asChild
        size="2"
        mx={{
          initial: "5",
          md: "0",
        }}
      >
        <header className="site-header">
          <Container size="2">
            <Flex justify="between" align="center">
              <Flex align="center" gap="2" asChild>
                <UILink
                  href="/"
                  style={{ color: "var(--gray-11)", textDecoration: "none" }}
                >
                  Mat Jordan
                </UILink>
              </Flex>
              <Flex gap="3" align="center">
                <Link
                  href="https://github.com/mathewjordan"
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubLogoIcon color="var(--gray-11)" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/mathewjordan/"
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInLogoIcon color="var(--gray-11)" />
                </Link>
                <Link
                  href="mailto:mat@northwestern.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email Mat"
                >
                  <EnvelopeClosedIcon color="var(--gray-11)" />
                </Link>
              </Flex>
            </Flex>
          </Container>
        </header>
      </Section>
    </>
  );
}
