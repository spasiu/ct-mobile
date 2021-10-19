import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  NormalizedCacheObject,
  HttpOptions,
  ApolloLink,
  fromPromise,
} from '@apollo/client';
import { getMainDefinition, Observable } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import Config from 'react-native-config';
import { AuthUser } from '../../providers/auth';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { useNavigation } from '@react-navigation/native';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

//const navigation = useNavigation();

let jwt:string = '';

const getHttpLink = () =>
  new HttpLink({
    uri: Config.API_URL
  });

const getHeaders = () : HttpOptions['headers'] => {
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

const authLink = setContext(() => {
  return getHeaders()
})

const getErrorLink = (authUser?: AuthUser): ApolloLink => {

  let isRefreshing = false;
  let pendingRequests: Array<() => void> = [];

  const resolvePendingRequests = () => {
    pendingRequests.map(callback => callback());
    pendingRequests = [];
  };

  return onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          console.log(`CODE: ${err.extensions?.code}`)
          switch (err.extensions?.code) {
            case 'invalid-jwt':
              let forward$: Observable<string | void>;

              if (authUser === null || authUser === undefined) {
                console.log("[Authentication error]: no user auth token");
               // navigation.navigate(ROUTES_IDS.LOGIN_SCREEN)
              } else {
                if (!isRefreshing) {
                  isRefreshing = true;
                  forward$ = fromPromise(
                    authUser.getIdToken(true)
                      .then((accessToken) => {
                        resolvePendingRequests();
                        jwt = accessToken;
                        wsClient.close(true); // will lose all subscriptions 
                        return accessToken;
                      })
                      .catch(error => {
                        console.log(`[Authentication error]: ${error}`)
                        pendingRequests = [];
                        return '';
                      })
                      .finally(() => {
                        isRefreshing = false;
                      })
                  ).filter(value => Boolean(value));
                } else {
                  forward$ = fromPromise(
                    new Promise<void>(resolve => {
                      pendingRequests.push(() => resolve());
                    })
                  );
                }
                return forward$.flatMap(() => forward(operation));
              }
            default:
              console.log(
                `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
              );
          }
          if (networkError) {
            console.log(`[Network error]: ${networkError}`);
          //  navigation.navigate(ROUTES_IDS.LOGIN_SCREEN)
          }
        }
      }
    }
  )
}


// splits operations to use websocket or http
const getLink = (authUser?: AuthUser) => {
  return ApolloLink.from([
    getErrorLink(authUser),
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
  token: string,
  authUser?: AuthUser
): ApolloClient<NormalizedCacheObject> => {
  jwt = token;
  return new ApolloClient({
    link: getLink(authUser),
    cache: new InMemoryCache(),
  });
};