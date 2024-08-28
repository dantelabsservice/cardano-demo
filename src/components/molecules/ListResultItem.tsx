import { Flex, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import { SubitemList, ListResultSubitemProps } from "./ListResultSubitem";
import { ResultItemInfo } from "../atoms";
import { rem } from "polished";
import { mapObjectEntries } from "@/utils/mapObjectEntries";

interface ItemProps {
  [key: string]: string;
}

export interface ListResultItemProps {
  id: string;
  name: string;
  itemProps: ItemProps;
  subList?: ListResultSubitemProps[];
  onClick?: (value: string) => void;
}

export const ListResultItem: React.FC<ListResultItemProps> = ({
  id,
  name,
  itemProps,
  subList,
  onClick,
}) => {
  const restProps = mapObjectEntries(itemProps);

  const handleOnClick = () => {
    if (onClick) {
      onClick(id);
    }
  }

  return (
    <GridItem
      key={id}
      role="listitem"
      onClick={handleOnClick}
      _hover={{ cursor: "pointer" }}
      _active={{
        opacity: 0.8,
        transform: "scale(0.98)",
        transition: "all 0.2s",
      }}
    >
      <Flex
        flexDir="column"
        alignItems="center"
        py={{ base: "md", md: "md", lg: "lg" }}
        px={{ base: "sm", md: "md", lg: "2xl" }}
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
          {restProps.map(({ key, value }) => (
            <ResultItemInfo
              key={key}
              label={key}
              value={value}
              bgColor="blue.300"
              color="white"
            />
          ))}
        </Flex>

        {subList && <SubitemList list={subList} />}
      </Flex>
    </GridItem>
  );
};
