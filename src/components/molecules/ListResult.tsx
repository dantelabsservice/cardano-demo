import { Grid, Text } from "@chakra-ui/react";
import { TrailType } from "../types/api";
import { ListResultItem } from "./ListResultItem";

export const ListResult = ({ trails }: { trails: TrailType[] }) => {
  if (!trails.length)
    return <Text>No results found for the selected filters.</Text>;

  return (
    <Grid
      as="section"
      templateColumns="repeat(2, 1fr)"
      gap="md"
      mt="2xl"
      role="list"
    >
      {trails.map((trail) => (
        <ListResultItem key={trail.id} {...trail} />
      ))}
    </Grid>
  );
};
