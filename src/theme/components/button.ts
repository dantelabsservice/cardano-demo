import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    _hover: {
      cursor: "pointer",
    },
    _active: {
      transform: "scale(0.98)",
      opacity: 0.8,
    }
  },
  defaultProps: {},
  variants: {
    primary: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "primaryHover",
      },
    },
    secondary: {
      bg: "secondary",
      color: "white",
      _hover: {
        bg: "secondaryHover",
      },
    },
  },
};
