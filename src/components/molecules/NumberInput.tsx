import { formInputStyle } from "@/constants";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface NumberInputProps extends NumberInputFieldProps {
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
  min,
  max,
  ...props
}) => {
  const [text, setText] = useState<number>(1);
  const mainColor = Boolean(error) ? "error" : formInputStyle.mainColor;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value === "number") {
      setText(event.target.value);
      onChange && onChange(event);
    }
  };

  useEffect(() => {
    if (value === undefined) return;
    setText(value);
  }, [value]);

  return (
    <FormControl my={formInputStyle.controlMarginY} isInvalid={Boolean(error)}>
      {label && <FormLabel color={mainColor}>{label}</FormLabel>}
      <ChakraNumberInput defaultValue={text} min={min} max={max}>
        <NumberInputField
          {...props}
          borderRadius={formInputStyle.borderRadius}
          borderColor={formInputStyle.mainColor}
          onChange={handleChange}
          value={text}
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
