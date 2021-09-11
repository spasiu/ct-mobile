import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { UserProfileStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

export type UserProfileScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.USER_PROFILE_SCREEN
>;

export interface UserProfileScreenProps {
  navigation: UserProfileScreenNavigationProp;
}
