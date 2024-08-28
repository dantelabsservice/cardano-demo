import React from "react";
import { useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import { SearchFilters } from "./SearchFilters";
import { AllTrailsQueryResultType, TrailType } from "../types/api";
import useFilterStore from "@/zustand/filter";
import { ListResult } from "../molecules/ListResult";
import { Loading } from "../atoms";
import { GET_TRAILS } from "@/apollo/getTrailsQuery";
import useGroupsStore from "@/zustand/groups";
import { ListResultItemProps } from "../molecules";
import { PageRoutes, TRAIL_PROPS_LABELS } from "@/constants";
import { useRouter } from "next/router";
import * as PageData from "@/data/results.json";

export const SearchResult: React.FC = () => {
  const router = useRouter();
  const { difficulty, groomed, maxElevationGain, numberOfPeople } =
    useFilterStore();
  const { groups, setGroups } = useGroupsStore();

  const { loading, error, data } =
    useQuery<AllTrailsQueryResultType>(GET_TRAILS);
  const activeGroup = groups[0];

  const handleOnClick = (id: string) => {
    setGroups([{ ...activeGroup, trailId: id }, ...groups.slice(1)]);

    router.push(PageRoutes.Groups);
  };

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

  const mappedTrails: ListResultItemProps[] = filteredTrails.map((trail) => {
    const { id, name, accessedByLifts, groomed, difficulty } = trail;

    return {
      id,
      name,
      itemProps: {
        [TRAIL_PROPS_LABELS.difficulty]: difficulty,
        [TRAIL_PROPS_LABELS.groomed]: groomed ? "Yes" : "No",
        lift: accessedByLifts.length.toString(),
      },
      subList: accessedByLifts.map((lift) => ({
        id: lift.id,
        lift: lift.name,
        capacity: lift.capacity.toString(),
        elevation: lift.elevationGain.toString(),
      })),
    };
  });

  return (
    <>
      {activeGroup?.name && (
        <Flex w="100%" justifyContent="center" bgColor="white">
          <Text as="h3" fontSize="lg" color="primary">
            {"Group: "}
            <Text as="span" fontWeight="bold">
              {activeGroup.name.toUpperCase()}
            </Text>
          </Text>
        </Flex>
      )}

      <SearchFilters />

      <Loading isLoading={loading} />
      {Boolean(error) && <Text>Error: {error?.message}</Text>}

      {data && (
        <ListResult
          list={mappedTrails}
          onClick={handleOnClick}
          emptyMessage={PageData.noResultsMessage}
        />
      )}
    </>
  );
};
