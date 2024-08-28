import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { NumberInput, SelectInput, TextInput } from "../molecules";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { DIFFICULTY_OPTIONS, SearchFilters } from "@/constants";
import useFilterStore from "@/zustand/filter";
import useGroupsStore from "@/zustand/groups";

type FormikValues = {
  groupName: string;
  [SearchFilters.NumberOfPeople]: number;
  [SearchFilters.Difficulty]: string;
};

const validationSchema = Yup.object({
  groupName: Yup.string().required("Group name is required"),
  [SearchFilters.NumberOfPeople]: Yup.number().required(
    "Number of people is required"
  ),
  [SearchFilters.Difficulty]: Yup.string().required("Skill level is required"),
});

const HomeForm = () => {
  const router = useRouter();
  const { setDifficulty, setNumberOfPeople } = useFilterStore();
  const { groups, setGroups } = useGroupsStore();

  const handleAddGroup = (groupName: string, numberOfPeople: number) => {
    setGroups([
      ...groups,
      { name: groupName, trailId: "", numberOfPeople: numberOfPeople },
    ]);
  };

  const {
    handleChange,
    values,
    handleSubmit,
    isValidating,
    errors,
    isSubmitting,
  } = useFormik<FormikValues>({
    initialValues: {
      groupName: "",
      numberOfPeople: 1,
      difficulty: "",
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setNumberOfPeople(values.numberOfPeople);
      setDifficulty(values.difficulty);
      handleAddGroup(values.groupName, values.numberOfPeople);

      router.push("/results");
    },
  });

  const handleChangeNumberOfPeople = (_: string, valueAsNumber: number) => {
    handleChange({
      target: { name: SearchFilters.NumberOfPeople, value: valueAsNumber },
    });
  };

  return (
    <>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "none", md: "lg" }}
      >
        <Box flex={1}>
          <TextInput
            name="groupName"
            placeholder="Enter group name"
            value={values.groupName}
            onChange={handleChange}
            label="Group name"
            error={errors.groupName}
            suggestions={groups.map((group) => group.name)}
          />
        </Box>
        <Box flex={0.5}>
          <NumberInput
            name={SearchFilters.NumberOfPeople}
            value={values.numberOfPeople}
            onChange={handleChangeNumberOfPeople}
            label="Number of people"
            error={errors.numberOfPeople}
            min={1}
          />
        </Box>
        <Box flex={0.6}>
          <SelectInput
            name={SearchFilters.Difficulty}
            value={values.difficulty}
            onChange={handleChange}
            label="Skill level"
            options={DIFFICULTY_OPTIONS}
            error={errors.difficulty}
            placeholder="Select skill level"
          />
        </Box>
      </Flex>
      <Button
        variant="primary"
        type="submit"
        width="100%"
        onClick={() => handleSubmit()}
        isLoading={isValidating || isSubmitting}
      >
        Find activities
      </Button>
    </>
  );
};

export default HomeForm;
