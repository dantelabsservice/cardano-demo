import { Grid, Text } from "@chakra-ui/react";
import { ListResultItem, ListResultItemProps } from "./ListResultItem";

export interface ListResultProps {
  list: ListResultItemProps[],
  emptyMessage?: string;
  onClick?: (value: string) => void;
}

export const ListResult: React.FC<ListResultProps> = ({ list, emptyMessage, onClick }) => {
  if (!list.length)
    return <Text>{emptyMessage || "No results found."}</Text>;

  return (
    <Grid
      as="section"
      templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}}
      gap="md"
      mt="2xl"
      role="list"
    >
      {list.map((item) => (
        <ListResultItem key={item.id} onClick={onClick} {...item} />
      ))}
    </Grid>
  );
};
