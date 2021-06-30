import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { UserProfileStackParamList } from '../../navigators';

type EditAddressScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  'screen.editAddress'
>;

type EditAddressScreenRouteProp = RouteProp<
  UserProfileStackParamList,
  'screen.editAddress'
>;

export interface EditAddressListScreenProps {
  navigation: EditAddressScreenNavigationProp;
  route: EditAddressScreenRouteProp;
}
