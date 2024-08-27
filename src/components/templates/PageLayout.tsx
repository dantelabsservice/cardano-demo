import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Header } from "./Header";
import { PageMain } from "./HomeLayout";
import { BaseLayoutProps } from "../types/layout";

export const PageLayout: React.FC<BaseLayoutProps> = ({
  children,
  pageProps,
}) => {
  return (
    <Flex flexDirection="column" h="100vh">
      <Header />
      <PageMain>
        <Box
          w={{ base: "100%", md: "container.xl" }}
          h="100%"
          bgColor="background.internal"
          p="xl"
          borderRadius="lg"
          boxShadow="xl"
          overflow="auto"
        >
          {children}
        </Box>
      </PageMain>
    </Flex>
  );
};
