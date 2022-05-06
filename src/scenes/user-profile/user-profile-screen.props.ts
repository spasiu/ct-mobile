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
