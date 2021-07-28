import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { UserProfileStackParamList } from '../../navigators';
import { Addresses } from '../../services/api/requests';

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
