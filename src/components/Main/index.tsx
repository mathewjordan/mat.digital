import { Container, Section } from "@radix-ui/themes";

export default function Main({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Section asChild>
      <main>
        <Container size="2">{children}</Container>
      </main>
    </Section>
  );
}
