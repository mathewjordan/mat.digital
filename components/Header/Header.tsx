import { Box, Flex, Heading, Link } from "@radix-ui/themes";

import Signature from "./Signature";

const Header: React.FC = () => {
  return (
    <Box asChild mb="6">
      <header>
        <Flex gap="5" justify="between">
          <Heading size="1" trim="both">
            <Signature />
          </Heading>
          <Flex gap="4">
            <Link href="https://github.com/mathewjordan" target="_blank">
              Code
            </Link>
          </Flex>
        </Flex>
      </header>
    </Box>
  );
};

export default Header;
