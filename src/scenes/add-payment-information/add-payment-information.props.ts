import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PaymentStackParamList } from '../../navigators';

type AddPaymentInformationScreenNavigationProp = NativeStackNavigationProp<
  PaymentStackParamList,
  'screen.addPaymentInformation'
>;

export interface AddPaymentInformationScreenProps {
  navigation: AddPaymentInformationScreenNavigationProp;
}
