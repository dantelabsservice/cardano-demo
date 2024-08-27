import { Flex } from "@chakra-ui/react";
import React from "react";
import { SelectInput } from "../molecules";
import { DIFFICULTY_OPTIONS, GROOMED_OPTIONS } from "@/constants";
import { rem } from "polished";
import useFilterStore, { GroomedTypes } from "@/zustand/filter";

export const SearchFilters = () => {
  const {
    difficulty,
    groomed,
    maxElevationGain,
    setDifficulty,
    setGroomed,
    setMaxElevationGain,
  } = useFilterStore();

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficulty(event.target.value);
  };

  const handleGroomedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroomed(event.target.value as GroomedTypes);
  };

  const handleMaxElevationGainChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMaxElevationGain(parseInt(event.target.value));
  };

  return (
    <Flex gap="md" pos="sticky" top={rem(-24)} bgColor="white">
      <SelectInput
        label="Difficulty Level"
        options={DIFFICULTY_OPTIONS}
        value={difficulty}
        onChange={handleDifficultyChange}
      />
      <SelectInput
        label="Show only groomed trails"
        options={GROOMED_OPTIONS}
        defaultValue={"False"}
        value={groomed}
        onChange={handleGroomedChange}
      />
      <SelectInput
        label="Maximum elevation gain"
        options={["500", "1000", "1500", "2000"]}
        defaultValue={"500"}
        value={maxElevationGain}
        onChange={handleMaxElevationGainChange}
      />
    </Flex>
  );
};
