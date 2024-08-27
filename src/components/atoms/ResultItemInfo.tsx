import { Flex, Text, Theme } from "@chakra-ui/react";
import React from "react";

interface ResultItemInfoProps {
  label: string;
  value: string;
  color?: string;
  bgColor?: string;
}

export const ResultItemInfo: React.FC<ResultItemInfoProps> = ({
  label,
  value,
  bgColor = "blue.900",
  color = "white",
}) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      bgColor={bgColor}
      color={color}
      px="sm"
      py="xs"
      borderRadius="md"
      fontSize="xs"
    >
      <Text as="span" fontWeight="bold">
        {label}:
      </Text>
      <Text as="span">{value}</Text>
    </Flex>
  );
};
