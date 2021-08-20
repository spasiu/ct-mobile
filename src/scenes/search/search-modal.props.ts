import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import {
  BreakersStackParamList,
  HomeStackParamList,
  ROUTES_IDS,
  TabNavigatorParamList,
} from '../../navigators';
import { Breaks, Users } from '../../services/api/requests';

export interface SearchEventsViewProps {
  breakers: Users[];
}

export interface SearchBreaksViewProps {
  breaks: Breaks[];
}

export interface SearchBreakersViewProps {
  breakers: Users[];
  onPressBreaker: (breaker: Users) => void;
}

type BreakersTabNavigationProp = BottomTabNavigationProp<
  TabNavigatorParamList,
  typeof ROUTES_IDS.BREAKERS_TAB
>;

type BreakerDetailNavigationProp = NativeStackNavigationProp<
  BreakersStackParamList,
  typeof ROUTES_IDS.BREAKER_DETAIL_SCREEN
>;

type BreakersStackNavigationProp = CompositeNavigationProp<
  BreakersTabNavigationProp,
  BreakerDetailNavigationProp
>;

type SearchModalNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  typeof ROUTES_IDS.SEARCH_MODAL
>;

type SearchNavigationProp = CompositeNavigationProp<
  BreakersStackNavigationProp,
  SearchModalNavigationProp
>;

export interface SearchModalProps {
  navigation: SearchNavigationProp;
}
