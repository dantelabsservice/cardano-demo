// import { ApolloClient, InMemoryCache } from '@apollo/client';

// export const client = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
//   cache: new InMemoryCache(),
// });

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // your GraphQL endpoint
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
