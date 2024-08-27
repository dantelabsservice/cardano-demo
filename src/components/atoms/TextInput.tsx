import { formInputStyle } from "@/constants";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { rem } from "polished";
import React, { useEffect, useState } from "react";

interface TextInputProps extends InputProps {
  label?: string;
  error?: string;
  clearable?: boolean;
  value?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  value,
  clearable = "true",
  onChange,
  ...props
}) => {
  const [text, setText] = useState<string>("");
  const mainColor = Boolean(error) ? "error" : formInputStyle.mainColor;
  const hasValue = Boolean(text);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onChange && onChange(event);
  };

  const onClear = () => {
    setText("");
  };

  useEffect(() => {
    if (value === undefined) return;
    setText(value);
  }, [value]);

  return (
    <FormControl my={formInputStyle.controlMarginY}>
      {label && <FormLabel color={mainColor}>{label}</FormLabel>}
      <Box>
        <Flex
          alignItems="center"
          border={formInputStyle.border}
          borderColor={mainColor}
          borderRadius={formInputStyle.borderRadius}
          px={formInputStyle.px}
        >
          <Input
            {...props}
            type="text"
            border="none"
            shadow="none"
            value={text}
            onChange={handleChange}
            p={0}
            _focus={{ boxShadow: "none" }}
            aria-label={label}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "error-message" : undefined}
          />
          {clearable && hasValue && (
            <CloseIcon
              onClick={onClear}
              color="black"
              boxSize={rem(12)}
              aria-label="Clear input"
            />
          )}
        </Flex>
      </Box>
      {error && <FormErrorMessage id="error-message">{error}</FormErrorMessage>}
    </FormControl>
  );
};
