import { MutationFunctionOptions } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { FetchResult } from '@apollo/client';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { UserProfileStackParamList } from '../../navigators';
import {
  Addresses,
  Addresses_Pk_Columns_Input,
  Addresses_Set_Input,
  DeleteUserAddressMutation,
  Exact,
  UpdateUserAddressMutation,
} from '../../services/api/requests';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { TextInput } from 'react-native';
import { PredictionType } from 'services/places-api';

type EditAddressScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  'screen.editAddress'
>;

type EditAddressScreenRouteProp = RouteProp<
  UserProfileStackParamList,
  'screen.editAddress'
>;

export interface EditAddressProp {
  address: Addresses;
  addresses: Addresses[];
  onAddressEdited: () => void;
}

export interface EditAddressScreenProps {
  navigation: EditAddressScreenNavigationProp;
  route: EditAddressScreenRouteProp;
}

export type useEditAddressHookType = {
  updateUserAddressMutation: (
    options?:
      | MutationFunctionOptions<
          UpdateUserAddressMutation,
          Exact<{
            address: Addresses_Set_Input;
            addressId: Addresses_Pk_Columns_Input;
          }>
        >
      | undefined,
  ) => Promise<
    FetchResult<
      UpdateUserAddressMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;
  activeField: string;
  setActiveField: Dispatch<SetStateAction<string>>;
  firstAddressLine: RefObject<TextInput>;
  secondAddressLine: RefObject<TextInput>;
  addressPredictions: PredictionType[];
  setAddressPredictions: Dispatch<SetStateAction<PredictionType[]>>;
  lastName: RefObject<TextInput>;
  city: RefObject<TextInput>;
  postalCode: RefObject<TextInput>;
  state: RefObject<TextInput>;
  deleteAddress: boolean;
  setDeleteAddress: Dispatch<SetStateAction<boolean>>;
  deleteUserAddressMutation: (
    options?:
      | MutationFunctionOptions<
          DeleteUserAddressMutation,
          Exact<{
            addressId: any;
          }>
        >
      | undefined,
  ) => Promise<
    FetchResult<
      DeleteUserAddressMutation,
      Record<string, any>,
      Record<string, any>
    >
  >;
  deleting: boolean;
  loading: boolean;
};
