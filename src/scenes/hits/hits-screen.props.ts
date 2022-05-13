import { Dispatch, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { Users, Hits } from '../../services/api/requests';

import { HitsStackParamList, ROUTES_IDS } from '../../navigators';

type HitsScreenNavigationProp = NativeStackNavigationProp<
  HitsStackParamList,
  typeof ROUTES_IDS.HITS_SCREEN
>;

export interface HitsScreenProps {
  navigation: HitsScreenNavigationProp;
}

export type useHitsScreenHookType = {
  userHitsFilterActive: boolean;
  setUserHitsFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
  user: Users;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setOffset: Dispatch<SetStateAction<number>>;
  hits: Hits[];
  loadMore: () => void;
  loading: boolean;
};
