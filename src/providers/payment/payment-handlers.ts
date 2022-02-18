import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import { find, propEq } from 'ramda';
import { handleError, CtError, getFirebaseErrorCode } from '../../common/error';
import { CardInput, Card } from '../../common/payment';
import { OrderState } from './payment-types';
import appsFlyer from 'react-native-appsflyer';

export const createBigCommerceUser = functions().httpsCallable(
  'createBigCommerceUser',
);
export const getCards = functions().httpsCallable('getCards');
export const addCard = functions().httpsCallable('addCard');
export const removeCard = functions().httpsCallable('removeCard');
export const createOrder = functions().httpsCallable('createOrder');

export const createCardHandler = async (
  cardDetails: CardInput,
): Promise<Card | undefined> => {
  try {
    const response = await addCard(cardDetails);
    return response.data as Card;
  } catch (error) {
    handleError(new CtError((error as any)?.details?.ct_error_code || "generic", 'danger', error));
  }

  return undefined;
};

export const getCardsHandler = async (): Promise<Card[] | false> => {
  try {
    const response = await getCards();
    return response.data.cards as Card[];
  } catch (error) {
    handleError(new CtError((error as any)?.details?.ct_error_code || "generic", 'danger', error));
    return false;
  }
};

export const deleteCardHandler = async (cardId: string): Promise<boolean> => {
  try {
    await removeCard({ cardId });
    return true;
  } catch (error) {
    handleError(new CtError((error as any)?.details?.ct_error_code || "generic", 'danger', error));
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
  } catch (error) {
    handleError(
      new CtError('could_not_get_default_payment_method', 'warning', error)
    );
  }
  return '';
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
  } catch (error) {
    handleError(
      new CtError('could_not_set_default_payment_method','warning', error)
    );
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

export const createUserOnPaymentPlatformHandler = async (
  firstName: string,
  lastName: string,
): Promise<boolean> => {
  try {
    await createBigCommerceUser({
      first_name: firstName,
      last_name: lastName,
    });
    return true;
  } catch (error) {
    handleError(
      new CtError('big_commerce_creation_error', 'danger', error)
    );
    return false;
  }
};

export const removeDefaultPaymentHandler = async (
  user: FirebaseAuthTypes.User,
): Promise<boolean> => {
  try {
    await firestore().collection('Users').doc(user.uid).set(
      {
        defaultPaymentId: '',
      },
      { merge: true },
    );
    return true;
  } catch (error) {
    handleError(
      new CtError('could_not_unset_default_payment_method','warning', error)
    );
    return false;
  }
};

export const createOrderHandler = async (
  cartId: string,
  paymentToken: string,
): Promise<OrderState> => {
  try {
    const order = await createOrder({ cartId, paymentToken });
    appsFlyer.logEvent("af_purchase", order.data);
    return { created: true, message: 'success' };
  } catch (error) {
    const errorMessage = handleError(
      new CtError(getFirebaseErrorCode(error),'none', error)
    );
    return { created: false, message: errorMessage };
  }
};

export const getDefaultPaymentCard = (cardId: string, cards: Card[]): Card =>
  find(propEq('id', cardId), cards) as Card;
