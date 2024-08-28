import { FORM_INPUT_STYLE } from "@/constants";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface NumberInputProps extends ChakraNumberInputProps {
  label?: string;
  error?: string;
  value?: number;
  min?: number;
  max?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  error,
  value,
  onChange,
  ...props
}) => {
  const [text, setText] = useState<number>(1);
  const mainColor = Boolean(error) ? "error" : FORM_INPUT_STYLE.mainColor;

  const handleChange = (value: string, valueAsNumber: number) => {
    setText(Number(valueAsNumber));
    onChange && onChange(value, Number(value));
  };

  useEffect(() => {
    if (value === undefined) return;
    setText(value);
  }, [value]);

  return (
    <FormControl
      my={FORM_INPUT_STYLE.controlMarginY}
      isInvalid={Boolean(error)}
    >
      {label && <FormLabel color={mainColor}>{label}</FormLabel>}
      <ChakraNumberInput
        defaultValue={text}
        value={text}
        onChange={handleChange}
        {...props}
      >
        <NumberInputField
          borderRadius={FORM_INPUT_STYLE.borderRadius}
          borderColor={FORM_INPUT_STYLE.mainColor}
          _hover={{ borderColor: mainColor }}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
      {error && <FormErrorMessage id="error-message">{error}</FormErrorMessage>}
    </FormControl>
  );
};
