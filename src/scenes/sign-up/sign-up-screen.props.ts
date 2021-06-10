import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList } from '../../navigators';

import { SIGN_UP_FORM_FIELDS } from './sign-up-screen.presets';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  'screen.signUp'
>;

export type SignUpFormFieldsType = typeof SIGN_UP_FORM_FIELDS[keyof typeof SIGN_UP_FORM_FIELDS];
export interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}
