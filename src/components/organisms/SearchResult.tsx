import React from "react";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { SearchFilters } from "./SearchFilters";
import { AllTrailsQueryResultType, TrailType } from "../types/api";
import useFilterStore from "@/zustand/filter";
import { ListResult } from "../molecules/ListResult";
import { Loading } from "../atoms/Loading";
import { GET_TRAILS } from "@/apollo/getTrailsQuery";

export const SearchResult: React.FC = () => {
  const { difficulty, groomed, maxElevationGain, numberOfPeople } =
    useFilterStore();
  const { loading, error, data } =
    useQuery<AllTrailsQueryResultType>(GET_TRAILS);

  const filterLiftCapacity = (
    accessibleLifts: TrailType["accessedByLifts"]
  ) => {
    if (!numberOfPeople) {
      const hasCapatity = accessibleLifts.some(
        (lift) => lift.capacity >= numberOfPeople
      );

      if (!hasCapatity) return false;
    }
  };

  const filterDifficulty = (trailDifficulty: TrailType["difficulty"]) => {
    if (difficulty) {
      if (trailDifficulty !== difficulty.toLowerCase()) {
        return false;
      }
    }
  };

  const filterGroomed = (trailGroomed: TrailType["groomed"]) => {
    if (groomed === "True") {
      if (!trailGroomed) {
        return false;
      }
    }
  };

  const filterMaxElevationGain = (
    trailElevationGain: TrailType["accessedByLifts"]
  ) => {
    if (maxElevationGain) {
      const hasValidLift = trailElevationGain.some(
        (lift) => lift.elevationGain <= maxElevationGain
      );
      if (!hasValidLift) {
        return false;
      }
    }
  };

  const filteredTrails =
    data?.allTrails.filter((trail) => {
      filterLiftCapacity(trail.accessedByLifts);
      filterDifficulty(trail.difficulty);
      filterGroomed(trail.groomed);
      filterMaxElevationGain(trail.accessedByLifts);

      return true;
    }) || [];

  return (
    <>
      <SearchFilters />

      <Loading isLoading={loading} />
      {Boolean(error) && <Text>Error: {error?.message}</Text>}

      {data && <ListResult trails={filteredTrails} />}
    </>
  );
};
