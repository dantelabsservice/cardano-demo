import { Flex, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import { TrailType } from "../types/api";
import { ListResultSubitem } from "./ListResultSubitem";
import { ResultItemInfo } from "../atoms";
import { rem } from "polished";

interface ListResultItemProps extends TrailType {}

export const ListResultItem: React.FC<ListResultItemProps> = ({
  id,
  difficulty,
  groomed,
  name,
  accessedByLifts,
}) => {
  return (
    <GridItem key={id} role="listitem">
      <Flex
        flexDir="column"
        alignItems="center"
        py={{ base: "md", md: "md", lg: "lg" }}
        px={{ base: "sm", md: "md", lg: "2xl"  }}
        borderRadius="2xl"
        bgColor="blue.100"
      >
        <Heading as="h1" fontWeight="bold" size="md">
          {name}
        </Heading>
        <Flex
          flexDir="column"
          textAlign="center"
          mb="lg"
          w="100%"
          gap={rem(1)}
          mt="sm"
        >
          <ResultItemInfo
            label="Difficulty"
            value={difficulty}
            bgColor="blue.300"
            color="white"
          />
          <ResultItemInfo
            label="Groomed"
            value={groomed ? "Yes" : "No"}
            bgColor="blue.300"
            color="white"
          />
        </Flex>
        <ListResultSubitem accessedByLifts={accessedByLifts} />
      </Flex>
    </GridItem>
  );
};
