import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from "@apollo/client/link/context";
import Config from 'react-native-config';
import { AuthUser } from '../../providers/auth';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { firebase } from '@react-native-firebase/auth';

let authUser:AuthUser = null;

const getHttpLink = () =>
  new HttpLink({
    uri: Config.API_URL
  });

const getHeaders = async () => {
  const jwt = await authUser?.getIdToken();
  return {headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}}
}

let wsClient: SubscriptionClient;

const getWsLink = () => {
  wsClient = new SubscriptionClient(Config.API_URL, {
    reconnect: true,
    connectionParams: () => {
      return getHeaders()
    }
  })
  return new WebSocketLink(wsClient);
}

// on token update, close existing websocket client to force renewal with new token
firebase.auth().onIdTokenChanged(() => {
  console.log("Received a new JWT; restarting websocket for Apollo")
  wsClient?.close();
})

const authLink = setContext(() => {
  return getHeaders()
})


const getLink = (authUser?: AuthUser) => {
  return ApolloLink.from([
    authLink,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      getWsLink(),
      getHttpLink(),
    )
  ]);
}

export const getClient = (
  user: AuthUser
): ApolloClient<NormalizedCacheObject> => {
  authUser = user;
  return new ApolloClient({
    link: getLink(authUser),
    cache: new InMemoryCache(
      {
      typePolicies: {
        Events: {
          fields: {
            Saves: {
              merge: false
            }
          }
        },
        Breaks: {
          fields: {
            Saves:{
              merge: false
            }
          }
        },
        Query: {
          fields:{
            Hits: {
              read(existing=[]) {
                return existing
              },
              merge(existing=[], incoming, { readField, args }) {
                if(args?.where._or[0].player._ilike.length > 2) return incoming
                const hits:any = {};
                existing.forEach((hitRef:any) => {
                  const hit = readField("id", hitRef) as string;
                  if(hit) hits[hit] = hitRef;
                });
                incoming.forEach((hitRef:any) => {
                  const hit = readField("id", hitRef) as string;
                  if(hit) hits[hit] = hitRef;
                });
                return Object.keys(hits).map(hit=>hits[hit])
              }
            }
          }
          }
        }
    }
    ),
  });
};