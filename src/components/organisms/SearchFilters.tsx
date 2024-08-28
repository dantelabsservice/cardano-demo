import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SelectInput } from "../molecules";
import { DIFFICULTY_OPTIONS, DifficultyLevels, GROOMED_OPTIONS } from "@/constants";
import { rem } from "polished";
import useFilterStore, { GroomedTypes } from "@/zustand/filter";

const DesktopSearchFilters = () => {
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
    setDifficulty(event.target.value as DifficultyLevels);
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
    <>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: rem(1), md: "md" }}
        bgColor="white"
      >
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
    </>
  );
};

const MobileSearchFilters = () => (
  <Accordion allowToggle bgColor="white">
    <AccordionItem bgColor="white">
      <Text as="span">
        <AccordionButton bgColor="white">
          <Box flex="1" textAlign="left">
            Filters
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>
        <DesktopSearchFilters />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export const SearchFilters = () => {
  return (
    <>
      <Box
        display={{ base: "none", md: "unset" }}
        pos="sticky"
        top={rem(-24)}
        bgColor="white"
      >
        <DesktopSearchFilters />
      </Box>
      <Box display={{ md: "none" }} pos="sticky" top={rem(-18)} mt="lg">
        <MobileSearchFilters />
      </Box>
    </>
  );
};
