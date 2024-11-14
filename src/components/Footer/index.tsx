import { Container, Section, Text } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Section asChild size="2">
      <footer>
        <Container size="2" style={{ textAlign: "center" }}>
          <Text color="gray" size="2" align="center">
            &copy; Mat Jordan {new Date().getFullYear()}
          </Text>
        </Container>
      </footer>
    </Section>
  );
}
