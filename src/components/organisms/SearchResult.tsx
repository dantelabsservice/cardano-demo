import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Text, Spinner, Grid, GridItem, Flex } from "@chakra-ui/react";
import { ListResultItem } from "../molecules";
import { SearchFilters } from "./SearchFilters";

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

const Loading = () => (
  <Flex justify="center" align="center" h="30%" w="100%">
    <Spinner size="xl" />
  </Flex>
);

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

  return (
    <>
      <SearchFilters />

      {loading && <Loading />}
      {Boolean(error) && <Text>Error: {error?.message}</Text>}

      {data?.allTrails?.length > 0 ? (
        <Grid
          as="section"
          templateColumns="repeat(2, 1fr)"
          gap={4}
          mt="2xl"
          role="list"
        >
          {data.allTrails.map((trail: any) => (
            <ListResultItem key={trail.id} {...trail} />
          ))}
        </Grid>
      ) : (
        !loading && <Text>No results found for the selected filters.</Text>
      )}
    </>
  );
};
