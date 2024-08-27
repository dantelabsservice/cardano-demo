import { Flex, Spinner } from "@chakra-ui/react";

export const Loading = ({ isLoading = false }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <Flex justify="center" align="center" h="30%" w="100%">
      <Spinner size="lg" color="primary" />
    </Flex>
  );
};
