import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import {
  TabNavigatorParamList,
  BreakersStackParamList,
  ROUTES_IDS,
} from '../../navigators';
import { Dispatch, SetStateAction } from 'react';
import {
  BreakersQuery,
  Exact,
  Maybe,
  Users,
  Users_Bool_Exp,
} from '../../services/api/requests';
import { ApolloQueryResult, NetworkStatus } from '@apollo/client';

type BreakersScreenNavigationProp = NativeStackNavigationProp<
  TabNavigatorParamList,
  typeof ROUTES_IDS.BREAKERS_TAB
>;

type BreakerDetailModalProp = NativeStackNavigationProp<
  BreakersStackParamList,
  typeof ROUTES_IDS.BREAKERS_SCREEN
>;

type BreakersNavigationProp = CompositeNavigationProp<
  BreakersScreenNavigationProp,
  BreakerDetailModalProp
>;

export interface BreakersScreenProps {
  navigation: BreakersNavigationProp;
}

export type useBreakersScreenHookType = {
  userBreakersFilterActive: boolean;
  setUserBreakersFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
  user: Users;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  loading: boolean;
  data: BreakersQuery | undefined;
  refetch:
    | ((
        variables?:
          | Partial<
              Exact<{
                userId?: Maybe<string> | undefined;
                breakerFilter?: Maybe<Users_Bool_Exp> | undefined;
              }>
            >
          | undefined,
      ) => Promise<ApolloQueryResult<BreakersQuery>>)
    | undefined;
  networkStatus: NetworkStatus;
  breakers: Users[];
};
