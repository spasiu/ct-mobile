import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList, ROUTES_IDS } from '../../navigators';

import { LOGIN_FORM_FIELDS } from './login-screen.presets';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  typeof ROUTES_IDS.LOGIN_SCREEN
>;

export type LoginFormFieldsType = typeof LOGIN_FORM_FIELDS[keyof typeof LOGIN_FORM_FIELDS];
export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
