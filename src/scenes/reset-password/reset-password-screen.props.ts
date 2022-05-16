import { Dispatch, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PublicStackParamList, ROUTES_IDS } from '../../navigators';

export type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  PublicStackParamList,
  typeof ROUTES_IDS.RESET_PASSWORD_SCREEN
>;

export interface ResetPasswordScreenProps {
  navigation: ResetPasswordScreenNavigationProp;
}

export type useResetPasswordScreenHookType = {
  submit: (values: { email: string }) => Promise<void>;
  activeField: string;
  setActiveField: Dispatch<SetStateAction<string>>;
  processing: boolean;
};
