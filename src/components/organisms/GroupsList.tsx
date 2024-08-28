import useGroupsStore from "@/zustand/groups";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ListResult } from "../molecules/ListResult";
import {
  DIFFICULTY_OPTIONS,
  DifficultyLevels,
  PageRoutes,
  TRAIL_PROPS_LABELS,
} from "@/constants";
import { useQuery } from "@apollo/client";
import { GET_TRAILS } from "@/apollo/getTrailsQuery";
import { AllTrailsQueryResultType } from "../types/api";
import { Alert, ListResultItemProps } from "../molecules";
import { Loading } from "../atoms";
import { useRouter } from "next/router";
import { useResetFilters } from "@/hooks/useResetFilters";
import useFilterStore from "@/zustand/filter";
import * as PageData from "@/data/groups.json";

export const GroupsList = () => {
  const router = useRouter();
  const { loading, data } = useQuery<AllTrailsQueryResultType>(GET_TRAILS);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
    difficulty: string;
  }>();
  const { groups, setGroups } = useGroupsStore();
  const { resetFilters } = useResetFilters();
  const { setDifficulty } = useFilterStore();

  const mappedGroups: ListResultItemProps[] = groups.map((group) => {
    const trail = data?.allTrails.find((trail) => trail.id === group.trailId);

    return {
      id: group.name.trim(),
      name: group.name,
      itemProps: {
        [TRAIL_PROPS_LABELS.numberOfPeople]: String(group.numberOfPeople),
        [TRAIL_PROPS_LABELS.difficulty]: String(trail?.difficulty),
        trail: String(trail?.name),
      },
      subList: trail?.accessedByLifts.map((lift) => ({
        id: lift.name,
        lift: lift.name,
        capacity: String(lift.capacity),
        [TRAIL_PROPS_LABELS.maxElevationGain]: String(lift.elevationGain),
      })),
    };
  });

  const handleOnClick = (id: string) => {
    const foundGroup = mappedGroups.find((group) => group.id === id);
    if (foundGroup) {
      setSelectedGroup({
        id: foundGroup.id,
        name: foundGroup.name,
        difficulty: foundGroup.itemProps[TRAIL_PROPS_LABELS.difficulty],
      });
    }
  };

  const handleCloseDialog = () => {
    setSelectedGroup(undefined);
  };

  const handleDeleteGroup = () => {
    if (selectedGroup) {
      setGroups(groups.filter((group) => group.name !== selectedGroup.name));
      setSelectedGroup(undefined);
    }
  };

  const handleEditGroup = () => {
    if (!selectedGroup) return;

    const foundGroup = groups.find(
      (group) => group.name === selectedGroup.name
    );

    if (foundGroup) {
      const newGroupList = groups.filter(
        (group) => group.name !== selectedGroup?.name
      );

      const difficultyLevel = DIFFICULTY_OPTIONS.find(
        (d) => d.toLowerCase() === selectedGroup.difficulty.toLowerCase()
      );

      setGroups([{ ...foundGroup }, ...newGroupList]);
      setDifficulty(difficultyLevel as DifficultyLevels);
      resetFilters();

      router.push(PageRoutes.Results);
    }
  };

  if (!groups.length) {
    return (
      <Text as="span" fontSize="large">
        {PageData.noGroupsMessage}
      </Text>
    );
  }

  return (
    <>
      <Loading isLoading={loading} />
      <ListResult
        list={mappedGroups}
        onClick={handleOnClick}
        emptyMessage={PageData.emptyListMessage}
      />
      <Alert
        isOpen={Boolean(selectedGroup)}
        onClose={handleCloseDialog}
        title={selectedGroup?.name}
        message={PageData.alert.message}
        leftButton={{ label: PageData.alert.edit, onClick: handleEditGroup }}
        rightButton={{
          label: PageData.alert.delete,
          onClick: handleDeleteGroup,
          color: "red",
        }}
      />
    </>
  );
};
