import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList } from '../../navigators';

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  'screen.resetPassword'
>;

export interface ResetPasswordScreenProps {
  navigation: ResetPasswordScreenNavigationProp;
}
