import { Container, Section } from "@radix-ui/themes";

export default function Main({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Section size="1" asChild>
      <main id="main-content" tabIndex={-1}>
        <Container size="2">{children}</Container>
      </main>
    </Section>
  );
}
