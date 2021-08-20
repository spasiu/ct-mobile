import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';

import { Sports } from '../../common/sports';
import {
  TabNavigatorParamList,
  HitsStackParamList,
  ProtectedStackParamList,
  BreakersStackParamList,
  ROUTES_IDS,
  HomeStackParamList,
} from '../../navigators';
import { Breaks, Users } from '../../services/api/requests';

export enum HomeSection {
  sports = 'sports',
  breaks = 'breaks',
  hits = 'hits',
  breakers = 'breakers',
}

export type HomeSectionData = {
  title: string;
  key: keyof typeof HomeSection;
  destination?: string;
};

export type HomeSportsData = {
  id: string;
  key: typeof Sports[keyof typeof Sports];
};

export type HomeHitsData = {
  id: string;
  image_front: string;
  player: string;
};

export type HomeSectionDataSource = {
  [HomeSection.sports]: HomeSportsData[];
  [HomeSection.breaks]: Breaks[];
  [HomeSection.hits]: HomeHitsData[];
  [HomeSection.breakers]: Users[];
};

type HitsTabNavigationProp = BottomTabNavigationProp<
  TabNavigatorParamList,
  typeof ROUTES_IDS.HITS_TAB
>;

type HitDetailModalProp = NativeStackNavigationProp<
  HitsStackParamList,
  typeof ROUTES_IDS.HITS_SCREEN
>;

type LiveModalProp = NativeStackNavigationProp<
  ProtectedStackParamList,
  typeof ROUTES_IDS.LIVE_MODAL
>;

type SearchModalProp = NativeStackNavigationProp<
  HomeStackParamList,
  typeof ROUTES_IDS.SEARCH_MODAL
>;

type HitsAndLiveNavigationProps = CompositeNavigationProp<
  HitsTabNavigationProp,
  CompositeNavigationProp<HitDetailModalProp, LiveModalProp>
>;

type HomeNavigationProp = CompositeNavigationProp<
  HitsAndLiveNavigationProps,
  SearchModalProp
>;

export type BreakersTabNavigation = NavigatorScreenParams<BreakersStackParamList>;

export interface HomeScreenProps {
  navigation: HomeNavigationProp;
}
