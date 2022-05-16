import { Card } from '../../common/payment';
import { Dispatch, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { PaymentStackParamList, ROUTES_IDS } from '../../navigators';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthUser } from 'providers/auth';
type PaymentInformationListScreenNavigationProp = NativeStackNavigationProp<
  PaymentStackParamList,
  typeof ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN
>;

export interface PaymentInformationListScreenProps {
  navigation: PaymentInformationListScreenNavigationProp;
}

export interface PaymentInformationListProps {
  onAddPayment: () => void;
  goBack: () => void;
}

export type usePaymentInformationListHookType = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  cards: Card[];
  selectedCard: string;
  defaultPaymentMethod: string;
  saveDefaultPaymentMethod: (
    user: FirebaseAuthTypes.User,
    paymentId: string,
  ) => Promise<boolean>;
  handleSelectCard: (cardInfoId: string) => Promise<void>;
  cardToDelete: string;
  setCardToDelete: Dispatch<SetStateAction<string>>;
  handleDeleteCard: () => void;
  user: AuthUser;
};
