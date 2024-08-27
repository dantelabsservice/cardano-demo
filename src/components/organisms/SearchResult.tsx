import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { SearchFilters } from "./SearchFilters";
import { AllTrailsQueryResultType } from "../types/api";
import useFilterStore from "@/zustand/filter";
import { ListResult } from "../molecules/ListResult";
import { Loading } from "../atoms/Loading";

const GET_TRAILS = gql`
  query GetTrails {
    allTrails {
      id
      name
      difficulty
      groomed
      accessedByLifts {
        id
        name
        capacity
        elevationGain
      }
    }
  }
`;

// const GET_TRAILS = gql`
//   query GetTrails(
//     $difficulty: String
//     $groomed: Boolean
//     $minElevationGain: Int
//   ) {
//     allTrails(
//       filter: {
//         difficulty: $difficulty
//         groomed: $groomed
//         accessedByLifts_some: { elevationGain_gte: $minElevationGain }
//       }
//     ) {
//       id
//       name
//       difficulty
//       groomed
//       accessedByLifts {
//         id
//         name
//         capacity
//         elevationGain
//       }
//     }
//   }
// `;

export const SearchResult: React.FC = () => {
  const { difficulty, groomed, maxElevationGain } = useFilterStore();
  const { loading, error, data } = useQuery<AllTrailsQueryResultType>(
    GET_TRAILS,
    {
      variables: {
        difficulty: difficulty || undefined,
        groomed: Boolean(groomed) || undefined,
        maxElevationGain: maxElevationGain > 0 ? maxElevationGain : undefined,
      },
    }
  );

  const filteredTrails =
    data?.allTrails.filter((trail) => {
      if (difficulty) {
        if (trail.difficulty !== difficulty.toLowerCase()) {
          return false;
        }
      }

      if (maxElevationGain) {
        const hasValidLift = trail.accessedByLifts.some(
          (lift) => lift.elevationGain <= maxElevationGain
        );
        if (!hasValidLift) {
          return false;
        }
      }

      if (groomed === "True") {
        if (!trail.groomed) {
          return false;
        }
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
