import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ImagePickerResponse } from 'react-native-image-picker';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import {
  Users,
  Exact,
  LoggedUserQuery,
  Maybe,
  UpdateUserMutation,
  Users_Set_Input,
  FollowBreakMutation,
  SaveBreak_Insert_Input,
  Breaks,
  UnfollowBreakMutation,
  Events,
  FollowEventMutation,
  SaveEvent_Insert_Input,
  UnfollowEventMutation,
  Hits,
} from '../../services/api/requests';
import { Card } from '../../common/payment/card';
import { UserProfileStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import {
  ApolloQueryResult,
  FetchResult,
  MutationFunctionOptions,
  NetworkStatus,
} from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import { SearchType } from '../../common/search';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';

export type UserProfileScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.USER_PROFILE_SCREEN
>;

export interface UserProfileScreenProps {
  navigation: UserProfileScreenNavigationProp;
}

export type userProfileScreenHookType = {
  logout: () => void;
  uploadPhoto: (photo: ImagePickerResponse) => Promise<string>;
  userId: string | undefined;
  cards: Card[];
  getCards: (user: FirebaseAuthTypes.User) => Promise<void>;
  getDefaultPaymentCard: () => Card | undefined;
  cleanPaymentInfo: () => void;
  cleanFilters: () => void;
  cleanNotificationData: () => void;
  uploadingPhoto: boolean;
  setUploadingPhoto: Dispatch<SetStateAction<boolean>>;
  confirmDelete: boolean;
  setConfirmDelete: Dispatch<SetStateAction<boolean>>;
  data: LoggedUserQuery | undefined;
  loading: boolean;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            id?: Maybe<string> | undefined;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<LoggedUserQuery>>;
  networkStatus: NetworkStatus;
  updateUserMutation: (
    options?:
      | MutationFunctionOptions<
          UpdateUserMutation,
          Exact<{
            userInput?: Maybe<Users_Set_Input> | undefined;
            userId?: Maybe<string> | undefined;
          }>
        >
      | undefined,
  ) => Promise<
    FetchResult<UpdateUserMutation, Record<string, any>, Record<string, any>>
  >;
  isRefetching: boolean;
  user: Users;
};

export type userSavesHookType = {
  searchFilter: SearchType;
  setSearchFilter: Dispatch<SetStateAction<SearchType>>;
};

export type useUserUpcomingBreaksHookType = {
  userId: string | undefined;
  breakId: string | undefined;
  setBreakId: Dispatch<SetStateAction<string | undefined>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  followBreak: (
    options?:
      | MutationFunctionOptions<
          FollowBreakMutation,
          Exact<{
            follow: SaveBreak_Insert_Input;
          }>
        >
      | undefined,
  ) => Promise<
    FetchResult<FollowBreakMutation, Record<string, any>, Record<string, any>>
  >;
  unfollowBreak: (
    options?:
      | MutationFunctionOptions<
          UnfollowBreakMutation,
          Exact<{ user_id?: Maybe<string> | undefined; break_id: any }>
        >
      | undefined,
  ) => Promise<
    FetchResult<UnfollowBreakMutation, Record<string, any>, Record<string, any>>
  >;
  breaks: Breaks[];
};

export type useUserUpcomingEventsHookType = {
  userId: string | undefined;
  event: Partial<EventDetailModalProps>;
  setEvent: Dispatch<Partial<EventDetailModalProps>>;
  followEvent: (
    options?:
      | MutationFunctionOptions<
          FollowEventMutation,
          Exact<{
            follow: SaveEvent_Insert_Input;
          }>
        >
      | undefined,
  ) => Promise<
    FetchResult<FollowEventMutation, Record<string, any>, Record<string, any>>
  >;
  unfollowEvent: (
    options?:
      | MutationFunctionOptions<
          UnfollowEventMutation,
          Exact<{ user_id?: Maybe<string> | undefined; event_id: any }>
        >
      | undefined,
  ) => Promise<
    FetchResult<UnfollowEventMutation, Record<string, any>, Record<string, any>>
  >;
  events: Events[];
  loading: boolean;
};

export type useUserUpcomingHitsHookType = {
  hitDetail: Partial<Hits>;
  setHitDetail: Dispatch<Partial<Hits>>;
  hits: Hits[];
};
