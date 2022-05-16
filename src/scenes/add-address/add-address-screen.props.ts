import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Dispatch, SetStateAction, RefObject } from 'react';
import { UserProfileStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { TextInput } from 'react-native';
import { PredictionType } from '../../services/places-api';

type AddAddressScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.ADD_ADDRESS_SCREEN
>;

type AddAddressScreenRouteProp = RouteProp<
  UserProfileStackParamList,
  typeof ROUTES_IDS.ADD_ADDRESS_SCREEN
>;

export interface AddAddressListScreenProps {
  navigation: AddAddressScreenNavigationProp;
  route: AddAddressScreenRouteProp;
}

export interface AddAddressProps {
  onAddressAdded: () => void;
  setId: (id: string) => void;
}

export type useAddAddressHookType = {
  submit: (values: submitType) => void;
  activeField: string;
  setActiveField: Dispatch<SetStateAction<string>>;
  lastName: RefObject<TextInput>;
  firstAddressLine: RefObject<TextInput>;
  secondAddressLine: RefObject<TextInput>;
  addressPredictions: PredictionType[];
  setAddressPredictions: Dispatch<SetStateAction<PredictionType[]>>
  city: RefObject<TextInput>;
  postalCode: RefObject<TextInput>;
  state: RefObject<TextInput>;
  loading: boolean;
};

export type submitType = {
  first_name: string;
  last_name: string;
  line1: string;
  line2: string;
  city: string;
  state_province_region: string;
  postal_zip_code: string;
  country: string;
};
