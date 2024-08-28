import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Header } from "./Header";
import { PageMain } from "./HomeLayout";
import { BaseLayoutProps } from "../types/layout";

export const PageLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" h="100vh" position="relative">
      <Header />
      <PageMain>
        <Box
          w={{
            base: "100%",
            md: "container.md",
            lg: "container.lg",
            xl: "container.xl",
          }}
          h="100%"
          bgColor="background.internal"
          px="sm"
          borderRadius="lg"
          boxShadow="xl"
        >
          <Box
            id="content-page"
            h="100%"
            w="100%"
            overflow="auto"
            p={{ md: "lg" }}
            py={{ base: "md" }}
          >
            {children}
          </Box>
        </Box>
      </PageMain>
    </Flex>
  );
};
