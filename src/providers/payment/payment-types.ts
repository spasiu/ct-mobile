import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Card, CardInput } from '../../common/payment';
export interface PaymentProviderProps {
  children: React.ReactNode;
}

export interface OrderState {
  created: boolean;
  message: string;
}

export type PaymentContextType = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  createCard: (
    user: FirebaseAuthTypes.User,
    cardInput: CardInput,
  ) => Promise<boolean>;
  getCards: (user: FirebaseAuthTypes.User) => Promise<void>;
  deleteCard: (
    user: FirebaseAuthTypes.User,
    cardId: string,
  ) => Promise<boolean>;
  defaultPaymentMethod: string;
  setDefaultPaymentMethod: (paymentId: string) => void;
  getDefaultPaymentCard: () => Card | undefined;
  getDefaultPaymentMethod: (user: FirebaseAuthTypes.User) => Promise<string>;
  saveDefaultPaymentMethod: (
    user: FirebaseAuthTypes.User,
    paymentId: string,
  ) => Promise<boolean>;
  createUserOnPaymentPlatform: (
    firstName: string,
    lastName: string,
  ) => Promise<boolean>;
  createOrder: (cartId: string, paymentToken: string) => Promise<OrderState>;
  cleanPaymentInfo: () => void;
};
