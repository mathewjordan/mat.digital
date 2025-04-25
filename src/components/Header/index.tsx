import {
  Container,
  Flex,
  Link,
  Section,
  Text,
  ThickChevronRightIcon,
} from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  ThickArrowRightIcon,
} from "@radix-ui/react-icons";

import Figure from "../UI/Figure";
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
        <header>
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
                  rel="nofollow"
                >
                  <GitHubLogoIcon color="var(--gray-11)" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/mathewjordan/"
                  target="_blank"
                  rel="nofollow"
                >
                  <LinkedInLogoIcon color="var(--gray-11)" />
                </Link>
                <Link
                  href="mailto:mat@northwestern.edu"
                  target="_blank"
                  rel="nofollow"
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
