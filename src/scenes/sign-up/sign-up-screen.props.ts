import { RefObject, Dispatch, SetStateAction } from 'react';
import { TextInput } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { PublicStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

import { SIGN_UP_FORM_FIELDS } from './sign-up-screen.presets';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  typeof ROUTES_IDS.SIGN_UP_SCREEN
>;

export type SignUpFormFieldsType =
  typeof SIGN_UP_FORM_FIELDS[keyof typeof SIGN_UP_FORM_FIELDS];
export interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

export type useSignUpScreenHookType = {
  signInGoogle: () => Promise<void>;
  signInApple: () => Promise<void>;
  signUpEmail: (email: string, password: string) => void;
  password: RefObject<TextInput>;
  processing: boolean;
  activeField: string;
  setActiveField: Dispatch<SetStateAction<string>>;
};
