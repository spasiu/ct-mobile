import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

import { UserProfileStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

export type NotificationPreferencesScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.NOTIFICATION_PREFERENCES_SCREEN
>;

type NotificationPreferencesRouteProp = RouteProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.NOTIFICATION_PREFERENCES_SCREEN
>;

export interface NotificationPreferencesScreenProps {
  route: NotificationPreferencesRouteProp;
  navigation: NotificationPreferencesScreenNavigationProp;
}
