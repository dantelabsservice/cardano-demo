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
    if (!numberOfPeople) return false;

    return accessibleLifts.some((lift) => lift.capacity >= numberOfPeople);
  };

  const filterDifficulty = (trailDifficulty: TrailType["difficulty"]) => {
    if (!difficulty) return false;

    return trailDifficulty === difficulty.toLowerCase();
  };

  const filterGroomed = (trailGroomed: TrailType["groomed"]) => {
    if (groomed == "True") {
      if (!trailGroomed) {
        return false;
      }
    }
  };

  const filterMaxElevationGain = (
    trailElevationGain: TrailType["accessedByLifts"]
  ) => {
    if (!maxElevationGain) return false;

    return trailElevationGain.some(
      (lift) => lift.elevationGain <= maxElevationGain
    );
  };

  const filteredTrails =
    data?.allTrails.filter((trail) => {
      const hasCapacity = filterLiftCapacity(trail.accessedByLifts);
      const hasDificultyLevel = filterDifficulty(trail.difficulty);
      const hasMaxElevation = filterMaxElevationGain(trail.accessedByLifts);
      const isGroomed = filterGroomed(trail.groomed);

      if (
        !hasCapacity ||
        !hasDificultyLevel ||
        !hasMaxElevation ||
        isGroomed === false
      ) {
        return false;
      }

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
