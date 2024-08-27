import { formInputStyle } from "@/constants";
import { textToSlug } from "@/utils";
import {
  FormControl,
  FormLabel,
  SelectFieldProps,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";

interface SelectInputProps extends SelectFieldProps {
  label?: string;
  options: string[];
  error?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  error,
  ...props
}) => {
  const mainColor = Boolean(error) ? "error" : formInputStyle.mainColor;

  return (
    <FormControl my={formInputStyle.controlMarginY}>
      {label && <FormLabel color={mainColor}>{label}</FormLabel>}
      <Select
        placeholder="Select option"
        {...props}
        borderRadius={formInputStyle.borderRadius}
        borderColor={mainColor}
        _hover={{ borderColor: mainColor }}
      >
        {options.map((option) => (
          <option key={textToSlug(option)} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage id="error-message">{error}</FormErrorMessage>}
    </FormControl>
  );
};
