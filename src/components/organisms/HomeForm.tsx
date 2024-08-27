import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { NumberInput, SelectInput } from "../molecules";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export enum FormFields {
  NumberOfPeople = "numberOfPeople",
  SkillLevel = "skillLevel",
}

type FormikValues = {
  [FormFields.NumberOfPeople]: number;
  [FormFields.SkillLevel]: string;
};

const validationSchema = Yup.object({
  [FormFields.NumberOfPeople]: Yup.number().required(
    "Number of people is required"
  ),
  [FormFields.SkillLevel]: Yup.string().required("Skill level is required"),
});

const HomeForm = () => {
  const router = useRouter();

  const {
    handleChange,
    values,
    handleSubmit,
    isValidating,
    errors,
    isSubmitting,
  } = useFormik<FormikValues>({
    initialValues: {
      [FormFields.NumberOfPeople]: 1,
      [FormFields.SkillLevel]: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      router.push("/results");
    },
  });

  return (
    <>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "none", md: "lg" }}
      >
        <NumberInput
          name={FormFields.NumberOfPeople}
          value={values.numberOfPeople}
          onChange={handleChange}
          label="Number of people"
          error={errors.numberOfPeople}
          min={1}
        />
        <SelectInput
          name={FormFields.SkillLevel}
          value={values.skillLevel}
          onChange={handleChange}
          label="Skill level"
          options={["Beginner", "Intermediate", "Advanced"]}
          error={errors.skillLevel}
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
