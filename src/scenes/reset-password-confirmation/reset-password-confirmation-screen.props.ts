import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList } from '../../navigators';

type ResetPasswordConfirmationScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  'screen.resetPasswordConfirmation'
>;

type ResetPasswordConfirmationScreenRouteProp = RouteProp<
  PublicStackParamList,
  'screen.resetPasswordConfirmation'
>;

export interface ResetPasswordConfirmationScreenProps {
  navigation: ResetPasswordConfirmationScreenNavigationProp;
  route: ResetPasswordConfirmationScreenRouteProp;
}
