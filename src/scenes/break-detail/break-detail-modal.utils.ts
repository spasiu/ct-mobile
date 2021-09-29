import { pathOr, path, map, pluck, findIndex, propEq } from 'ramda';
import functions from '@react-native-firebase/functions';

import { t } from '../../i18n/i18n';
import {
  breakProductExternalProductId,
  breakProductExternalVariantId,
} from '../../common/break-products';
import { Addresses, BreakProductItems } from '../../services/api/requests';

import {
  CheckoutCart,
  CheckoutData,
  CheckoutResponse,
  CheckoutParams,
  CartProduct,
  ModalRoute,
} from './break-detail-modal.props';
import { ROUTES_IDS } from '../../navigators';
import {
  addressRecipientFirstNameSelector,
  addressRecipientLastNameSelector,
  addressWithoutRecipientSelector,
} from '../../common/address/address-selectors';
import { Card } from '../../common/payment';
import { failedImage, successImage } from './break-detail-modal.presets';
import { ImageSourcePropType } from 'react-native';

export const createCheckout = functions().httpsCallable('createCheckout');

export const transformProductToCheckout = (
  product: BreakProductItems,
): CartProduct => {
  return {
    product_id: breakProductExternalProductId(product),
    variant_id: breakProductExternalVariantId(product),
    quantity: 1,
  };
};

export const getCheckoutParams = (
  userAddress: Addresses,
  breakProducts: BreakProductItems[],
): CheckoutParams => ({
  first_name: addressRecipientFirstNameSelector(userAddress),
  last_name: addressRecipientLastNameSelector(userAddress),
  address: addressWithoutRecipientSelector(userAddress),
  products: map(product => transformProductToCheckout(product), breakProducts),
});

export const getCheckoutCartInfo = (
  response: CheckoutResponse,
): CheckoutCart => {
  const paymentData = pathOr({}, ['data', 'data'], response) as CheckoutData;
  const cartItems = pathOr(
    [],
    ['cart', 'line_items', 'physical_items'],
    paymentData,
  );
  const cartId = pathOr('', ['cart', 'id'], paymentData);
  return {
    cartItems,
    cartId,
    tax: paymentData.tax_total,
    subtotal: paymentData.subtotal_ex_tax,
    shipping: paymentData.shipping_cost_total_ex_tax,
    total: paymentData.grand_total,
  };
};

export const getProductsPreview = (
  selectedItems: BreakProductItems[],
): string => {
  const cartItemTitles = pluck('title', selectedItems);
  return cartItemTitles.join(', ');
};

export const findSelectedItem = (
  breakProduct: BreakProductItems,
  selectedItems: BreakProductItems[] = [],
): number => findIndex(propEq('id', breakProduct.id), selectedItems);

export const isBreakDetailView = (visibleRoute: ModalRoute): boolean =>
  visibleRoute.route === ROUTES_IDS.BREAK_DETAIL_MODAL;

export const isAddressList = (visibleRoute: ModalRoute): boolean =>
  visibleRoute.route === ROUTES_IDS.ADDRESSES_LIST_SCREEN;

export const isAddAddress = (visibleRoute: ModalRoute): boolean =>
  visibleRoute.route === ROUTES_IDS.ADD_ADDRESS_SCREEN;

export const isEditAddress = (visibleRoute: ModalRoute): boolean =>
  visibleRoute.route === ROUTES_IDS.EDIT_ADDRESS_SCREEN;

export const isPaymentList = (visibleRoute: ModalRoute): boolean =>
  visibleRoute.route === ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN;

export const isAddPayment = (visibleRoute: ModalRoute): boolean =>
  visibleRoute.route === ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN;

export const getRootModalProps = (
  loading: boolean,
  visibleRoute: ModalRoute,
  isBreakSoldOut: boolean,
): {
  action?: string | undefined;
  title: string | undefined;
  showBack?: boolean;
} => {
  if (
    isAddressList(visibleRoute) ||
    isAddAddress(visibleRoute) ||
    isEditAddress(visibleRoute)
  ) {
    return {
      title: t('addresses.deliveryAddress'),
      showBack: true,
    };
  }

  if (isPaymentList(visibleRoute) || isAddPayment(visibleRoute)) {
    return {
      title: t('payment.paymentInformation'),
      showBack: true,
    };
  }

  return {
    action: isBreakSoldOut || loading ? '' : t('buttons.continueToCheckout'),
    title: t('break.detailModalTitle'),
  };
};

export const checkoutCartSubtotalSelector = (
  checkoutCart: CheckoutCart | undefined,
): string => {
  const subtotal = path(['subtotal'], checkoutCart);
  // since 0 evaluates to false in js
  // we need to explicitly check for undefined
  return subtotal !== undefined
    ? `${t('payment.paymentCurrencySign')}${subtotal}`
    : '';
};

export const checkoutCartTaxSelector = (
  checkoutCart: CheckoutCart | undefined,
): string => {
  const tax = path(['tax'], checkoutCart);
  // since 0 evaluates to false in js
  // we need to explicitly check for undefined
  return tax !== undefined ? `${t('payment.paymentCurrencySign')}${tax}` : '';
};

export const checkoutCartShippingSelector = (
  checkoutCart: CheckoutCart | undefined,
): string => {
  const shipping = path(['shipping'], checkoutCart);
  // since 0 evaluates to false in js
  // we need to explicitly check for undefined
  return shipping !== undefined
    ? `${t('payment.paymentCurrencySign')}${shipping}`
    : '';
};

export const checkoutCartTotalSelector = (
  checkoutCart: CheckoutCart | undefined,
): string => {
  const total = path(['total'], checkoutCart);
  // since 0 evaluates to false in js
  // we need to explicitly check for undefined
  return total !== undefined
    ? `${t('payment.paymentCurrencySign')}${total}`
    : '';
};

export const processPayment = async (
  checkoutCart: CheckoutCart,
  userPaymentData: Card,
  createOrder: (cardId: string, paymentToken: string) => Promise<boolean>,
  setOrderCreated: (status: boolean) => void,
  setPurchasing: (purchasing: boolean) => void,
): Promise<void> => {
  if (checkoutCart && userPaymentData) {
    setPurchasing(true);
    const created = await createOrder(
      checkoutCart.cartId,
      userPaymentData.paymentToken,
    );

    if (created) {
      setOrderCreated(true);
    } else {
      setOrderCreated(false);
    }

    setPurchasing(false);
  }
};

export const getWarningModalProps = (
  orderCreated: boolean | undefined,
  checkoutCart: CheckoutCart,
  userPaymentData: Card,
  createOrder: (cardId: string, paymentToken: string) => Promise<boolean>,
  setOrderCreated: (status: boolean) => void,
  onSuccess: () => void,
  onCancel: () => void,
  setPurchasing: (purchasing: boolean) => void,
  onError: () => void,
): {
  title: string;
  primaryActionText: string;
  secondaryActionText?: string;
  onPrimaryActionPressed: () => void | Promise<void>;
  onSecondaryActionPressed?: () => void;
  imageSrc?: ImageSourcePropType;
} => {
  if (orderCreated === undefined) {
    return {
      title: t('payment.purchaseModalTitle'),
      primaryActionText: `${t('buttons.purchase')} ${checkoutCartTotalSelector(
        checkoutCart,
      )}`,
      secondaryActionText: t('buttons.cancel'),
      onPrimaryActionPressed: async () =>
        await processPayment(
          checkoutCart as CheckoutCart,
          userPaymentData,
          createOrder,
          setOrderCreated,
          setPurchasing,
        ),
      onSecondaryActionPressed: onCancel,
    };
  }

  if (orderCreated) {
    return {
      imageSrc: successImage,
      title: t('payment.purchaseSuccessfullMessage'),
      primaryActionText: t('buttons.letsGo'),
      onPrimaryActionPressed: onSuccess,
    };
  } else {
    return {
      imageSrc: failedImage,
      title: t('payment.purchaseFailedMessage'),
      primaryActionText: t('buttons.backToPaymentDetails'),
      onPrimaryActionPressed: onError,
    };
  }
};