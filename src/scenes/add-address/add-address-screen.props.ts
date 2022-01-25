import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

import { UserProfileStackParamList } from '../../navigators';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

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
  setId: (id:string) => void;
}
