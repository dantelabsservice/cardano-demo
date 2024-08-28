import { FORM_INPUT_STYLE } from "@/constants";
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
  suggestions?: string[];
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  value,
  clearable = "true",
  suggestions,
  onChange,
  ...props
}) => {
  const [text, setText] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const mainColor = Boolean(error) ? "error" : FORM_INPUT_STYLE.mainColor;
  const hasValue = Boolean(text);

  const handleFilterSuggestions = (value: string) => {
    setFilteredSuggestions(
      !!value.length
        ? suggestions?.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
          ) ?? []
        : []
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
    handleFilterSuggestions(value);
    onChange && onChange(event);
  };

  const onClear = () => {
    setText("");
  };

  const handleClickSuggestions = (suggestion: string) => {
    const mockEvent = { target: { value: suggestion, name: props.name } };

    handleChange(mockEvent as React.ChangeEvent<HTMLInputElement>);
    setFilteredSuggestions([]);
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
      <Box position="relative">
        <Flex
          alignItems="center"
          border={FORM_INPUT_STYLE.border}
          borderColor={FORM_INPUT_STYLE.mainColor}
          borderRadius={FORM_INPUT_STYLE.borderRadius}
          px={FORM_INPUT_STYLE.px}
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
            autoComplete={!!suggestions?.length ? "off" : "on"}
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
        {!!filteredSuggestions.length && (
          <Box
            as="ul"
            position="absolute"
            top="100%"
            left={0}
            right={0}
            zIndex={10}
            border={FORM_INPUT_STYLE.border}
            borderColor={FORM_INPUT_STYLE.mainColor}
            borderRadius={FORM_INPUT_STYLE.borderRadius}
            bg="white"
            boxShadow="md"
          >
            {filteredSuggestions.map((suggestion) => (
              <Box
                as="option"
                key={suggestion}
                p={FORM_INPUT_STYLE.py}
                px={FORM_INPUT_STYLE.px}
                _hover={{ bg: "primary" }}
                _active={{ bg: "primary" }}
                onClick={() => handleClickSuggestions(suggestion)}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {error && <FormErrorMessage id="error-message">{error}</FormErrorMessage>}
    </FormControl>
  );
};
