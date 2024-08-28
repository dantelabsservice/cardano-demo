import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Header } from "./Header";
import { BaseLayoutProps } from "../types/layout";

const BG_IMAGE = "url('images/snowy-mountains.png')";

export const PageMain: React.FC<BaseLayoutProps> = ({ children }) => (
  <Flex
    position="relative"
    flexDir="column"
    as="main"
    flex="1"
    h={0}
    px="lg"
    py="md"
    bgBlendMode="overlay"
    bgImage={BG_IMAGE}
    backgroundColor="background.external"
    bgPosition="center"
    bgSize="cover"
    justifyContent="center"
    alignItems="center"
  >
    {children}
  </Flex>
);

export const HomeLayout: React.FC<BaseLayoutProps> = ({
  children,
  pageProps,
}) => {
  return (
    <Flex flexDirection="column" h="100vh">
      <Header />
      <PageMain>
        {pageProps?.pageHeading && (
          <Heading as="h1" size="2xl" textAlign="center">
            {pageProps.pageHeading}
          </Heading>
        )}
        <Box
          w={{ base: "100%", md: "container.md" }}
          bgColor="background.internal"
          p="xl"
          borderRadius="lg"
          boxShadow="xl"
        >
          {children}
        </Box>
      </PageMain>
    </Flex>
  );
};
