import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { UserProfileStackParamList } from '../../navigators';

type AddAddressScreenNavigationProp = NativeStackNavigationProp<
  UserProfileStackParamList,
  'screen.addAddress'
>;

export interface AddAddressListScreenProps {
  navigation: AddAddressScreenNavigationProp;
}
