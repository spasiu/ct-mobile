import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PaymentStackParamList } from '../../navigators';

type PaymentInformationListScreenNavigationProp = NativeStackNavigationProp<
  PaymentStackParamList,
  'screen.paymentInformationList'
>;

export interface PaymentInformationListScreenProps {
  navigation: PaymentInformationListScreenNavigationProp;
}
