import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { PublicStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

import { SIGN_UP_FORM_FIELDS } from './sign-up-screen.presets';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  typeof ROUTES_IDS.SIGN_UP_SCREEN
>;

export type SignUpFormFieldsType = typeof SIGN_UP_FORM_FIELDS[keyof typeof SIGN_UP_FORM_FIELDS];
export interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}
