import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import {
  TabNavigatorParamList,
  BreakersStackParamList,
  ROUTES_IDS,
} from '../../navigators';

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
