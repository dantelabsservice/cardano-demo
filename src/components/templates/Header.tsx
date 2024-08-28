import {
  Button,
  ButtonGroup,
  ButtonProps,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import * as SiteData from "@/data/site.json";
import { HEADER_MENU_ITEMS } from "@/constants";

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
    >
      <Link href="/" role="link">
        <Heading as="h1" size="md" color="white" lineHeight={1}>
          {SiteData.header.title}
        </Heading>
      </Link>
      <ButtonGroup ml="auto" role="navigation">
        <NavigationButton
          display={{ base: "none", md: "unset" }}
          to={HEADER_MENU_ITEMS[0].href}
          role="link"
        >
          {HEADER_MENU_ITEMS[0].name}
        </NavigationButton>
        {HEADER_MENU_ITEMS.slice(1).map((navItem) => (
          <NavigationButton key={navItem.href} to={navItem.href} role="link">
            {navItem.name}
          </NavigationButton>
        ))}
      </ButtonGroup>
    </Flex>
  );
};
