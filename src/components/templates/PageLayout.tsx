import { Box } from "@chakra-ui/react";
import React from "react";
import { Header } from "./Header";

interface BaseLayoutProps {
  children?: React.ReactNode;
}

export const PageLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main" w="100%" px="lg" py="md">
        {children}
      </Box>
    </>
  );
};
