import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { SocialIconTypes } from '../../components';
import {
  BreakersStackParamList,
  ROUTES_IDS,
  TabNavigatorParamList,
} from '../../navigators';

export type SimpleBreaker = {
  id: string;
  image: string;
  name?: string;
};

export interface BreakerProfileComponentProps {
  id: string;
  name: string;
  image: string;
  video: string;
  description: string;
  social: { name: keyof typeof SocialIconTypes; url: string }[];
  userFollows: boolean;
}

type HitScreenNavigationProp = NativeStackNavigationProp<
  TabNavigatorParamList,
  typeof ROUTES_IDS.HITS_TAB
>;

type BreakerDetailNavigationProp = NativeStackNavigationProp<
  BreakersStackParamList,
  typeof ROUTES_IDS.BREAKER_DETAIL_SCREEN
>;

type BreakerDetailScreenNavigationProp = CompositeNavigationProp<
  HitScreenNavigationProp,
  BreakerDetailNavigationProp
>;

type BreakerDetailScreenRouteProp = RouteProp<
  BreakersStackParamList,
  typeof ROUTES_IDS.BREAKER_DETAIL_SCREEN
>;

export interface BreakerDetailScreenProps {
  navigation: BreakerDetailScreenNavigationProp;
  route: BreakerDetailScreenRouteProp;
}
