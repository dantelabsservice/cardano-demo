import { ComponentStyleConfig } from "@chakra-ui/react";

export const Heading: ComponentStyleConfig = {
  baseStyle: {},
  defaultProps: {},
  variants: {
    "page-heading": {
      fontSize: "2xl",
      w: "100%",
      textAlign: "center",
      textTransform: "uppercase",
    },
  },
  sizes: {
    "2xl": {
      fontSize: "2xl",
      marginBottom: "lg",
    },
  },
};
