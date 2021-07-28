import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList, ROUTES_IDS } from '../../navigators';

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  typeof ROUTES_IDS.RESET_PASSWORD_SCREEN
>;

export interface ResetPasswordScreenProps {
  navigation: ResetPasswordScreenNavigationProp;
}
