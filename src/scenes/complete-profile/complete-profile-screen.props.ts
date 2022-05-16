import { MutationFunctionOptions, FetchResult } from '@apollo/client';
import { Maybe } from 'graphql/jsutils/Maybe';
import { AuthUser } from '../../providers/auth';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { TextInput } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import {
  UpdateUserMutation,
  Exact,
  Users_Set_Input,
} from '../../services/api/requests';
import { OnboardingStackParamList } from '../../navigators';

export type CompleteProfileScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'screen.completeProfile'
>;

export interface CompleteProfileScreenProps {
  navigation: CompleteProfileScreenNavigationProp;
}

export type useCompleteProfileScreenHookType = {
  user: AuthUser;
  updateUserMutation: (
    options?:
      | MutationFunctionOptions<
          UpdateUserMutation,
          Exact<{
            userInput?: Maybe<Users_Set_Input> | undefined;
            userId?: Maybe<string> | undefined;
          }>
        >
      | undefined,
  ) => Promise<
    FetchResult<UpdateUserMutation, Record<string, any>, Record<string, any>>
  >;
  uploadPhoto: (photo: ImagePickerResponse) => Promise<string>;
  uploadingPhoto: boolean;
  setUploadingPhoto: Dispatch<SetStateAction<boolean>>;
  activeField: string;
  setActiveField: Dispatch<SetStateAction<string>>;
  firstNameField: RefObject<TextInput>;
  lastNameField: RefObject<TextInput>;
  loading: boolean;
  processing: boolean;
  logout: () => Promise<void>;
};
