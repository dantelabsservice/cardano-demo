import useGroupsStore from "@/zustand/groups";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const GroupsList = () => {
  const { groups, setGroups } = useGroupsStore();

  if (!groups.length) {
    return <Text as="span" fontSize="large">You still have no group defined.</Text>;
  }

  return (
    <>
      {groups.map((group) => (
        <Box key={group.trailId}>
          {group.name} - {group.trailId}
        </Box>
      ))}
    </>
  );
};
