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
  id: number;
  name: string;
};

export type HomeSectionDataSource = {
  [HomeSection.sports]: HomeSportsData[];
  [HomeSection.breaks]: Breaks[];
  [HomeSection.hits]: HomeHitsData[];
  [HomeSection.breakers]: Users[];
};

type HitsTabNavigationProp = BottomTabNavigationProp<
  TabNavigatorParamList,
  'tab.hits'
>;

type HitDetailModalProp = NativeStackNavigationProp<
  HitsStackParamList,
  'screen.hits'
>;

type LiveModalProp = NativeStackNavigationProp<
  ProtectedStackParamList,
  'modal.live'
>;

type HomeNavigationProp = CompositeNavigationProp<
  HitsTabNavigationProp,
  CompositeNavigationProp<HitDetailModalProp, LiveModalProp>
>;

export type BreakersTabNavigation = NavigatorScreenParams<BreakersStackParamList>;

export interface HomeScreenProps {
  navigation: HomeNavigationProp;
}
