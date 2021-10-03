import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  NormalizedCacheObject,
  HttpOptions,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import Config from 'react-native-config';

const getHttpLink = (headers: HttpOptions['headers']) =>
  new HttpLink({
    uri: Config.API_URL,
    headers,
  });

const getWsLink = (headers: HttpOptions['headers']) =>
  new WebSocketLink({
    uri: Config.API_URL,
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  });

// splits operations to use websocket or http
const getSplitLink = (headers: HttpOptions['headers']) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    getWsLink(headers),
    getHttpLink(headers),
  );

export const getClient = (
  token: string,
): ApolloClient<NormalizedCacheObject> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return new ApolloClient({
    link: getSplitLink(headers),
    cache: new InMemoryCache(),
  });
};
