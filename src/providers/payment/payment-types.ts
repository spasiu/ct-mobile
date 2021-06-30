import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Card, CardInput } from '../../common/payment';
export interface PaymentProviderProps {
  children: React.ReactNode;
}

export type PaymentContextType = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  createCard: (
    user: FirebaseAuthTypes.User,
    cardInput: CardInput,
  ) => Promise<boolean>;
  getCards: (user: FirebaseAuthTypes.User, profileId: string) => Promise<void>;
  deleteCard: (
    user: FirebaseAuthTypes.User,
    profileId: string,
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
};
