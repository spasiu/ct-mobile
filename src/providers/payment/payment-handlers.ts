import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { CardInput, Card } from '../../common/payment';
import { t } from '../../i18n/i18n';

export const createCardHandler = async (
  cardDetails: CardInput,
): Promise<Card | undefined> => {
  try {
    const response = await axios.post(
      'http://localhost:3000/cards',
      cardDetails,
    );
    const card = response.data as Card;
    return card;
  } catch (error) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
    return undefined;
  }
};

export const getCardsHandler = async (
  profileId: string,
): Promise<Card[] | false> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/${profileId}/cards`,
    );
    return response.data.cards as Card[];
  } catch (error) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
    return false;
  }
};

export const deleteCardHandler = async (
  profileId: string,
  cardId: string,
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/${profileId}/cards/${cardId}`,
    );
    console.log(response);
    return true;
  } catch (error) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
    return false;
  }
};

export const getDefaultPaymentMethodHandler = async (
  user: FirebaseAuthTypes.User,
): Promise<string> => {
  try {
    const userDocument = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();

    if (userDocument.exists) {
      const paymentData = userDocument.data() as { defaultPaymentId: string };
      return paymentData.defaultPaymentId || '';
    }

    return '';
  } catch (e) {
    return '';
  }
};

export const saveDefaultPaymentMethodHandler = async (
  user: FirebaseAuthTypes.User,
  cardId: string,
): Promise<boolean> => {
  try {
    await firestore().collection('Users').doc(user.uid).set(
      {
        defaultPaymentId: cardId,
      },
      { merge: true },
    );
    return true;
  } catch (e) {
    showMessage({
      message: t('errors.generic'),
      type: 'danger',
    });
    return false;
  }
};

export const saveAndSetAsDefaultHandler = async (
  user: FirebaseAuthTypes.User,
  paymentId: string,
  setDefault: (id: string) => void,
): Promise<boolean> => {
  const saved = await saveDefaultPaymentMethodHandler(user, paymentId);
  if (saved) {
    setDefault(paymentId);
  }
  return saved;
};
