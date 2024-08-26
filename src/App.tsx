import { ChakraProvider } from "@chakra-ui/react";
import { HomePage } from "components/pages";
import React from "react";
import { theme } from "theme/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  );
}

export default App;
