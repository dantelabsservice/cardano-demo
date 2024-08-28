import { gql } from "@apollo/client";

export const GET_TRAILS = gql`
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