import React, { createContext, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { append, head } from 'ramda';

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

  const createCard = async (
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
  };

  const getCards = async (user: FirebaseAuthTypes.User) => {
    const userCards = await getCardsHandler();
    if (userCards) setCards(userCards);

    const id = await getDefaultPaymentMethodHandler(user);
    if (id) setDefaultPaymentMethod(id);
  };

  const deleteCard = async (user: FirebaseAuthTypes.User, cardId: string) => {
    const deleted = await deleteCardHandler(cardId);
    if (deleted) {
      const newCardsList = cards.filter(card => card.id !== cardId);
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

      if (newCardsList.length === 0) {
        await removeDefaultPaymentHandler(user);
      }
    }
  };

  const getDefaultPaymentMethod = async (user: FirebaseAuthTypes.User) => {
    const id = await getDefaultPaymentMethodHandler(user);
    setDefaultPaymentMethod(id);
    return id;
  };

  const saveDefaultPaymentMethod = async (
    user: FirebaseAuthTypes.User,
    paymentId: string,
  ) => {
    return await saveAndSetAsDefaultHandler(
      user,
      paymentId,
      setDefaultPaymentMethod,
    );
  };

  const createOrder = async (cartId: string) => {
    const defaultCard = getDefaultPaymentCard(defaultPaymentMethod, cards);
    return await createOrderHandler(cartId, defaultCard.paymentToken);
  };

  const cleanPaymentInfo = () => {
    setCards([]);
    setDefaultPaymentMethod('');
  };

  return (
    <PaymentContext.Provider
      value={{
        cards,
        setCards,
        createCard,
        getCards,
        deleteCard,
        defaultPaymentMethod,
        setDefaultPaymentMethod,
        getDefaultPaymentCard: () =>
          getDefaultPaymentCard(defaultPaymentMethod, cards),
        getDefaultPaymentMethod,
        saveDefaultPaymentMethod,
        createUserOnPaymentPlatform: createUserOnPaymentPlatformHandler,
        createOrder,
        cleanPaymentInfo,
      }}>
      {children}
    </PaymentContext.Provider>
  );
};
