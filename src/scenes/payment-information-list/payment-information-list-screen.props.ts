import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PaymentStackParamList, ROUTES_IDS } from '../../navigators';

type PaymentInformationListScreenNavigationProp = NativeStackNavigationProp<
  PaymentStackParamList,
  typeof ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN
>;

export interface PaymentInformationListScreenProps {
  navigation: PaymentInformationListScreenNavigationProp;
}

export interface PaymentInformationListProps {
  onAddPayment: () => void;
}
