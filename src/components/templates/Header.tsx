import { noPrintElement } from "@/theme";
import {
  Button,
  ButtonGroup,
  ButtonProps,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type NavigationButtonProps = ButtonProps & {
  to: string;
  children: React.ReactNode;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  children,
  ...rest
}) => (
  <Button colorScheme="whiteAlpha" variant="outline" {...rest}>
    <Link href={to}>{children}</Link>
  </Button>
);

export const Header = () => {
  return (
    <Flex
      as="header"
      bgColor="primary"
      w="100%"
      px="lg"
      py="sm"
      alignItems="center"
      sx={noPrintElement}
    >
      <Link href="/">
        <Heading as="h1" size="md" color="white" lineHeight={1}>
          Ski Trip Manager
        </Heading>
      </Link>
      <ButtonGroup ml="auto">
        <NavigationButton display={{ base: "none", md: "unset" }} to="/">
          Home
        </NavigationButton>
        <NavigationButton to="/about">About</NavigationButton>
        <NavigationButton to="/groups">Groups</NavigationButton>
      </ButtonGroup>
    </Flex>
  );
};
