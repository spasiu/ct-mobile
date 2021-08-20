import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

import { ROUTES_IDS, UserProfileStackParamList } from '../../navigators';

type EditBreakPreferencesScreenNavigationProps = NativeStackNavigationProp<
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
