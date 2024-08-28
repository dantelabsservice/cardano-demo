import { Grid, Text } from "@chakra-ui/react";
import { ListResultItem, ListResultItemProps } from "./ListResultItem";

interface ListResultProps {
  list: ListResultItemProps[],
  onClick?: (value: string) => void;
}

export const ListResult: React.FC<ListResultProps> = ({ list }) => {
  if (!list.length)
    return <Text>No results found for the selected filters.</Text>;

  return (
    <Grid
      as="section"
      templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}}
      gap="md"
      mt="2xl"
      role="list"
    >
      {list.map((item) => (
        <ListResultItem key={item.id} onClick={() => {}} {...item} />
      ))}
    </Grid>
  );
};
