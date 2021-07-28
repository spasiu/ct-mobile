import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

type ResetPasswordConfirmationScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  typeof ROUTES_IDS.RESET_PASSWORD_CONFIRMATION_SCREEN
>;

type ResetPasswordConfirmationScreenRouteProp = RouteProp<
  PublicStackParamList,
  typeof ROUTES_IDS.RESET_PASSWORD_CONFIRMATION_SCREEN
>;

export interface ResetPasswordConfirmationScreenProps {
  navigation: ResetPasswordConfirmationScreenNavigationProp;
  route: ResetPasswordConfirmationScreenRouteProp;
}
