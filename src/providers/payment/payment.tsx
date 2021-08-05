import React, { createContext, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { append, reject, head } from 'ramda';

import { Card, CardInput } from '../../common/payment';

import { PaymentProviderProps } from './payment-types';
import {
  createCardHandler,
  getCardsHandler,
  deleteCardHandler,
  getDefaultPaymentMethodHandler,
  saveAndSetAsDefaultHandler,
  createUserOnPaymentPlatformHandler,
  removeDefaultPaymentHandler,
  createOrderHandler,
  getDefaultPaymentCard,
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
        getCards: async (user: FirebaseAuthTypes.User) => {
          const userCards = await getCardsHandler();
          if (userCards) {
            setCards(userCards);
          }
          const id = await getDefaultPaymentMethodHandler(user);
          if (id) {
            setDefaultPaymentMethod(id);
          }
        },
        deleteCard: async (user: FirebaseAuthTypes.User, cardId: string) => {
          const deleted = await deleteCardHandler(cardId);
          if (deleted) {
            const newCardsList = reject(card => card.id === cardId, cards);
            setCards(newCardsList);
            const shouldTransferSelection =
              newCardsList.length > 0 && cardId === defaultPaymentMethod;
            const isListEmpty = newCardsList.length === 0;
            if (shouldTransferSelection) {
              const firstCard = head(newCardsList) as Card;
              await saveAndSetAsDefaultHandler(
                user,
                firstCard.id,
                setDefaultPaymentMethod,
              );
            }

            if (isListEmpty) {
              await removeDefaultPaymentHandler(user);
            }
          }
        },
        defaultPaymentMethod,
        setDefaultPaymentMethod,
        getDefaultPaymentCard: () => {
          return getDefaultPaymentCard(defaultPaymentMethod, cards);
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
          return await saveAndSetAsDefaultHandler(
            user,
            paymentId,
            setDefaultPaymentMethod,
          );
        },
        createUserOnPaymentPlatform: createUserOnPaymentPlatformHandler,
        createOrder: async (cartId: string) => {
          const defaultCard = getDefaultPaymentCard(
            defaultPaymentMethod,
            cards,
          );
          return await createOrderHandler(cartId, defaultCard.paymentToken);
        },
      }}>
      {children}
    </PaymentContext.Provider>
  );
};
