import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { UserProfileStackParamList } from '../../navigators';

type AddressesListScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  'screen.addressesList'
>;

type AddressesListScreenRouteProp = RouteProp<
  UserProfileStackParamList,
  'screen.addressesList'
>;

export interface AddressesListScreenProps {
  navigation: AddressesListScreenNavigationProp;
  route: AddressesListScreenRouteProp;
}
