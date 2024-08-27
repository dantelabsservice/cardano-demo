import { Flex } from "@chakra-ui/react";
import React from "react";
import { SelectInput } from "../molecules";
import { DIFFICULTY_OPTIONS } from "@/constants";
import { rem } from "polished";

export const SearchFilters = () => {
  return (
    <Flex gap="md" pos="sticky" top={rem(-24)} bgColor="white">
      <SelectInput label="Difficulty Level" options={DIFFICULTY_OPTIONS} />
      <SelectInput
        label="Show only groomed trails"
        options={["True", "False"]}
        defaultValue={"False"}
      />
      <SelectInput
        label="Minimum elevation gain"
        options={["0", "500", "1000", "1500", "2000"]}
        defaultValue={"0"}
      />
    </Flex>
  );
};
