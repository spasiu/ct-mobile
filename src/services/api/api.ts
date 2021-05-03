import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import Config from 'react-native-config';

const httpLink = new HttpLink({
  uri: Config.API_URL,
});

const wsLink = new WebSocketLink({
  uri: Config.API_URL,
  options: {
    reconnect: true,
  },
});

// splits operations to use websocket or http
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
