/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

let apolloClient;

// Create link for SSR or from client to api
function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const schema = require('./schema').default;
    return new SchemaLink({ schema });
  }
  const { HttpLink } = require('@apollo/client/link/http');
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
}

// Create client with SSR or on client with appropriate link
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If you fetch data on the client hydrate inital state
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // If on server (using ssg or ssr) create a new client
  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  // If on client only create a client once
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }
  return _apolloClient;
}

// Make a aclient and cache depending on client or server
export function useApollo(initialState) {
  const store = useMemo(() => (
    initializeApollo(initialState)
  ), [initialState]);
  return store;
}
