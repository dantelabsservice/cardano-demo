import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface AlertButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
}

interface AlertProps {
  title?: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  rightButton?: AlertButtonProps;
  leftButton?: AlertButtonProps;
}

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  onClose,
  leftButton,
  message,
  rightButton,
  title,
}) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter>
          {leftButton && (
            <Button
              colorScheme={leftButton.color}
              onClick={leftButton.onClick}
              ml={3}
            >
              {leftButton.label}
            </Button>
          )}
          {rightButton && (
            <Button
              colorScheme={rightButton.color}
              onClick={rightButton.onClick}
              ml={3}
            >
              {rightButton.label}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
