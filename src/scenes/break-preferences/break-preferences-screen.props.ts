import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

import { ROUTES_IDS, UserProfileStackParamList } from '../../navigators';

type BreakPreferencesScreenNavigationProps = NativeStackNavigationProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.BREAK_PREFERENCES_SCREEN
>;

type BreakPreferencesScreenRouteProps = RouteProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.BREAK_PREFERENCES_SCREEN
>;

export interface BreakPreferencesScreenProps {
  navigation: BreakPreferencesScreenNavigationProps;
  route: BreakPreferencesScreenRouteProps;
}
