import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { NumberInput, SelectInput } from "../molecules";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { DIFFICULTY_OPTIONS, SearchFilters } from "@/constants";
import useFilterStore from "@/zustand/filter";

type FormikValues = {
  [SearchFilters.NumberOfPeople]: number;
  [SearchFilters.Difficulty]: string;
};

const validationSchema = Yup.object({
  [SearchFilters.NumberOfPeople]: Yup.number().required(
    "Number of people is required"
  ),
  [SearchFilters.Difficulty]: Yup.string().required("Skill level is required"),
});

const HomeForm = () => {
  const router = useRouter();
  const { setDifficulty, setNumberOfPeople } = useFilterStore();

  const {
    handleChange,
    values,
    handleSubmit,
    isValidating,
    errors,
    isSubmitting,
  } = useFormik<FormikValues>({
    initialValues: {
      [SearchFilters.NumberOfPeople]: 1,
      [SearchFilters.Difficulty]: "",
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setNumberOfPeople(values.numberOfPeople);
      setDifficulty(values.difficulty);
      router.push("/results");
    },
  });

  const handleChangeNumberOfPeople = (_: string, valueAsNumber: number) => {
    handleChange({
      target: { name: SearchFilters.NumberOfPeople, value: valueAsNumber },
    });
  }

  return (
    <>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "none", md: "lg" }}
      >
        <NumberInput
          name={SearchFilters.NumberOfPeople}
          value={values.numberOfPeople}
          onChange={handleChangeNumberOfPeople}
          label="Number of people"
          error={errors.numberOfPeople}
          min={1}
        />
        <SelectInput
          name={SearchFilters.Difficulty}
          value={values.difficulty}
          onChange={handleChange}
          label="Skill level"
          options={DIFFICULTY_OPTIONS}
          error={errors.difficulty}
          placeholder="Select skill level"
        />
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
