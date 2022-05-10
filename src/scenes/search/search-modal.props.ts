import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { SearchType } from '../../common/search';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import {
  BreakersStackParamList,
  HomeStackParamList,
  ROUTES_IDS,
  TabNavigatorParamList,
} from '../../navigators';
import { Breaks, Events, Hits, Users } from '../../services/api/requests';
import { PickBreakCard } from '../../common/break';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { EventCardProps } from '../../components';

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

export type useSearchModalHookType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  searchFilter: SearchType;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchType>>;
  hits: Hits[];
  eventBreakers: Users[];
  breaks: Breaks[];
  breakers: Users[];
};

export type useSearchBreaksHookType = {
  breakId: string | undefined;
  setBreakId: React.Dispatch<React.SetStateAction<string | undefined>>;
  onPressFollow: (eventBreak: Breaks, breakSchedule: PickBreakCard) => void;
};

export type useSearchEventsHookType = {
  event: Partial<EventDetailModalProps>;
  setEvent: React.Dispatch<
    React.SetStateAction<Partial<EventDetailModalProps>>
  >;
  onPressFollow: (item: Events, eventData: EventCardProps) => void;
  hasNoEvents: boolean;
};
