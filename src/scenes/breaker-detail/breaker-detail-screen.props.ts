import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { Dispatch, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import {
  Breaks,
  Events,
  Hits,
  NewBreakerBreaksSubscription,
  NewBreakerEventsSubscription,
} from '../../services/api/requests';
import {
  BreakCardProps,
  EventCardProps,
  SocialIconTypes,
} from '../../components';
import {
  BreakersStackParamList,
  ROUTES_IDS,
  TabNavigatorParamList,
} from '../../navigators';
import { EventDetailModalProps } from 'scenes/event-detail/event-detail-modal.props';

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

export type BreakerDetailScreenRouteProp = RouteProp<
  BreakersStackParamList,
  typeof ROUTES_IDS.BREAKER_DETAIL_SCREEN
>;

export interface BreakerDetailScreenProps {
  navigation: BreakerDetailScreenNavigationProp;
  route: BreakerDetailScreenRouteProp;
}

export type useBreakerDetailScreenHookType = {
  video: string;
  image: string;
  name: string;
  id: string;
  social: {
    name: 'twitter' | 'facebook' | 'instagram' | 'tiktok';
    url: string;
  }[];
  description: string;
  hitDetail: Partial<Hits>;
  setHitDetail: Dispatch<SetStateAction<Partial<Hits>>>;
  hits: Hits[];
  eventsView: boolean;
  setEventsView: Dispatch<SetStateAction<boolean>>;
};

export type useBreaksViewHookType = {
  breakId: string | undefined;
  setBreakId: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  data: NewBreakerBreaksSubscription | undefined;
  breaks: Breaks[];
  onPressFollow: (
    breakItem: Breaks,
    breakerBreakDetail: BreakCardProps,
  ) => void;
};

export type useEventsViewHookType = {
  loading: boolean;
  data: NewBreakerEventsSubscription | undefined;
  events: Events[];
  event: Partial<EventDetailModalProps>;
  setEvent: Dispatch<Partial<EventDetailModalProps>>;
  onPressFollow: (item: Events, eventData: EventCardProps) => void;
};
