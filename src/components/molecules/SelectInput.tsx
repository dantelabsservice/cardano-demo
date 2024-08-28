import { FORM_INPUT_STYLE } from "@/constants";
import { textToSlug } from "@/utils";
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  SelectProps,
} from "@chakra-ui/react";
import React from "react";

interface SelectInputProps extends SelectProps {
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
  const mainColor = Boolean(error) ? "error" : FORM_INPUT_STYLE.mainColor;

  return (
    <FormControl my={FORM_INPUT_STYLE.controlMarginY} isInvalid={Boolean(error)}>
      {label && <FormLabel color={mainColor}>{label}</FormLabel>}
      <Select
        {...props}
        borderRadius={FORM_INPUT_STYLE.borderRadius}
        borderColor={FORM_INPUT_STYLE.mainColor}
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
