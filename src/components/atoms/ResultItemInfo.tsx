import { capitalize } from "@/utils/capitalize";
import { Flex, Text } from "@chakra-ui/react";
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
      className="result-item-info"
      width="100%"
      justifyContent="space-between"
      bgColor={bgColor}
      color={color}
      px="sm"
      py="xs"
      borderRadius="md"
      fontSize="xs"
    >
      <Text as="label" fontWeight="bold">
        {capitalize(label)}:
      </Text>
      <Text as="span">{value.toUpperCase()}</Text>
    </Flex>
  );
};
