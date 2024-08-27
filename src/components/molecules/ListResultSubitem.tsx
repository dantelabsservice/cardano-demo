import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { LiftType } from "../types/api";
import { ResultItemInfo } from "../atoms";
import { rem } from "polished";

interface ListResultSubitemProps {
  accessedByLifts: LiftType[];
}

export const ListResultSubitem: React.FC<ListResultSubitemProps> = ({
  accessedByLifts,
}) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" w="100%" gap={4}>
      {accessedByLifts.map((lift: any) => (
        <GridItem key={lift.id} mt={2}>
          <Flex flexDir="column" gap={rem(1)}>
            <ResultItemInfo
              label="Lift"
              value={lift.name}
            />
            <ResultItemInfo
              label="Capacity"
              value={lift.capacity.toString()}
            />
            <ResultItemInfo
              label="Elevation Gain"
              value={lift.elevationGain.toString()}
            />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};
