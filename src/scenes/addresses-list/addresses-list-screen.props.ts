import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { UserProfileStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators';

type EditAddressType = typeof ROUTES_IDS.EDIT_ADDRESS_SCREEN;
type AddAddressType = typeof ROUTES_IDS.ADD_ADDRESS_SCREEN;
type ListAddressesType = typeof ROUTES_IDS.ADDRESSES_LIST_SCREEN;

type AddressesListScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  ListAddressesType
>;

type AddressesListScreenRouteProp = RouteProp<
  UserProfileStackParamList,
  ListAddressesType
>;

type EditParams = UserProfileStackParamList[EditAddressType];
type AddParams = UserProfileStackParamList[AddAddressType];

export interface AddressesListScreenProps {
  navigation: AddressesListScreenNavigationProp;
  route: AddressesListScreenRouteProp;
}

export interface AddressesListProps {
  onEditAddress: (params: EditParams) => void;
  onAddAddress: (params: AddParams) => void;
}
