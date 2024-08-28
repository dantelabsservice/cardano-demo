import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { ResultItemInfo } from "../atoms";
import { rem } from "polished";
import { mapObjectEntries } from "@/utils/mapObjectEntries";

export interface ListResultSubitemProps {
  [key: string]: string;
}

interface SubitemProps {
  list: ListResultSubitemProps[];
}

export const SubitemList: React.FC<SubitemProps> = ({ list }) => {
  return (
    <Grid templateColumns={{ md: "repeat(2, 1fr)" }} w="100%" gap={4}>
      {list.map((item) => (
        <GridItem key={item.id} mt={2} className="list-result-subitem">
          <Flex flexDir="column" gap={rem(1)}>
            {mapObjectEntries(item).map(({ key, value }) => (
              <ResultItemInfo key={key} label={key} value={String(value)} />
            ))}
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};
