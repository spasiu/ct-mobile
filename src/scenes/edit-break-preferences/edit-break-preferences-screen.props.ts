import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

import { ROUTES_IDS, UserProfileStackParamList } from '../../navigators';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import {
  UpdateUserPreferencesMutation,
  Exact,
  Maybe,
  UserPreferences_Set_Input,
} from '../../services/api/requests';

export type EditBreakPreferencesScreenNavigationProps =
  NativeStackNavigationProp<
    UserProfileStackParamList,
    typeof ROUTES_IDS.EDIT_BREAK_PREFERENCES_SCREEN
  >;

type EditBreakPreferencesScreenRouteProps = RouteProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.EDIT_BREAK_PREFERENCES_SCREEN
>;

export interface EditBreakPreferencesScreenProps {
  navigation: EditBreakPreferencesScreenNavigationProps;
  route: EditBreakPreferencesScreenRouteProps;
}

export type useEditBreakPreferencesScreenHookType = {
  userId: string | undefined;
  updateUserPreferences: (
    options?:
      | MutationFunctionOptions<
          UpdateUserPreferencesMutation,
          Exact<{
            userId?: Maybe<string> | undefined;
            input?: Maybe<UserPreferences_Set_Input> | undefined;
          }>
        >
      | undefined,
  ) => Promise<
    FetchResult<
      UpdateUserPreferencesMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;
  loading: boolean;
};
