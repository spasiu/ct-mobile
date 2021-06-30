import React, { createContext, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { append, reject, head, find, propEq } from 'ramda';

import { Card, CardInput } from '../../common/payment';

import { PaymentProviderProps } from './payment-types';
import {
  createCardHandler,
  getCardsHandler,
  deleteCardHandler,
  getDefaultPaymentMethodHandler,
  saveAndSetAsDefaultHandler,
} from './payment-handlers';

export const PaymentContext = createContext({});

export const PaymentProvider = ({
  children,
}: PaymentProviderProps): JSX.Element => {
  const [cards, setCards] = useState<Card[]>([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<string>('');
  return (
    <PaymentContext.Provider
      value={{
        cards,
        setCards,
        createCard: async (
          user: FirebaseAuthTypes.User,
          cardInput: CardInput,
        ) => {
          const card = await createCardHandler(cardInput);
          const firstCard = cards.length === 0;
          if (card) {
            setCards(append(card, cards));
            if (firstCard) {
              await saveAndSetAsDefaultHandler(
                user,
                card.id,
                setDefaultPaymentMethod,
              );
            }
          }
          return card;
        },
        getCards: async (user: FirebaseAuthTypes.User, profileId: string) => {
          const userCards = await getCardsHandler(profileId);
          if (userCards) {
            setCards(userCards);
          }
          const id = await getDefaultPaymentMethodHandler(user);
          if (id) {
            setDefaultPaymentMethod(id);
          }
        },
        deleteCard: async (
          user: FirebaseAuthTypes.User,
          profileId: string,
          cardId: string,
        ) => {
          const deleted = await deleteCardHandler(profileId, cardId);
          if (deleted) {
            const newCardsList = reject(card => card.id === cardId, cards);
            setCards(newCardsList);
            const shouldTransferSelection =
              newCardsList.length > 0 && cardId === defaultPaymentMethod;
            if (shouldTransferSelection) {
              const firstCard = head(newCardsList) as Card;
              await saveAndSetAsDefaultHandler(
                user,
                firstCard.id,
                setDefaultPaymentMethod,
              );
            }
          }
        },
        defaultPaymentMethod,
        setDefaultPaymentMethod,
        getDefaultPaymentCard: () => {
          return find(propEq('id', defaultPaymentMethod), cards);
        },
        getDefaultPaymentMethod: async (user: FirebaseAuthTypes.User) => {
          const id = await getDefaultPaymentMethodHandler(user);
          setDefaultPaymentMethod(id);
          return id;
        },
        saveDefaultPaymentMethod: async (
          user: FirebaseAuthTypes.User,
          paymentId: string,
        ) => {
          const saved = await saveAndSetAsDefaultHandler(
            user,
            paymentId,
            setDefaultPaymentMethod,
          );
          return saved;
        },
      }}>
      {children}
    </PaymentContext.Provider>
  );
};
