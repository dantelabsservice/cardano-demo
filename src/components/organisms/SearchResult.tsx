import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Text, Spinner, Grid, GridItem } from "@chakra-ui/react";
import { ListResultItem } from "../molecules";

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

interface SearchResultProps {
  difficulty: string;
  isGroomed: boolean;
  elevationGain: number;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  difficulty,
  isGroomed,
  elevationGain,
}) => {
  const { loading, error, data } = useQuery(GET_TRAILS, {
    variables: {
      difficulty: difficulty || undefined,
      groomed: isGroomed || undefined,
      minElevationGain: elevationGain > 0 ? elevationGain : undefined,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gap={4} mt="2xl" role="list">
      {data.allTrails.length > 0 ? (
        data.allTrails.map((trail: any) => (
          <ListResultItem key={trail.id} {...trail} />
        ))
      ) : (
        <Text>No results found for the selected filters.</Text>
      )}
    </Grid>
  );
};
