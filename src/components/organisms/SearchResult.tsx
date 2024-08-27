import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Text, Spinner } from "@chakra-ui/react";

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
    <Box>
      {data.allTrails.length > 0 ? (
        data.allTrails.map((trail: any) => (
          <Box key={trail.id} mb={4} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">{trail.name}</Text>
            <Text>Difficulty: {trail.difficulty}</Text>
            <Text>Groomed: {trail.groomed ? "Yes" : "No"}</Text>
            {trail.accessedByLifts.map((lift: any) => (
              <Box key={lift.id} mt={2}>
                <Text>Lift: {lift.name}</Text>
                <Text>Capacity: {lift.capacity}</Text>
                <Text>Elevation Gain: {lift.elevationGain}</Text>
              </Box>
            ))}
          </Box>
        ))
      ) : (
        <Text>No results found for the selected filters.</Text>
      )}
    </Box>
  );
};
