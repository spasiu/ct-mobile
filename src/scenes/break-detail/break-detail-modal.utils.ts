import { pathOr, path, map, pluck, findIndex, propEq } from 'ramda';
import functions from '@react-native-firebase/functions';
import { OrderState } from '../../providers/payment/payment-types';

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
  coupon: string,
): CheckoutParams => ({
  first_name: addressRecipientFirstNameSelector(userAddress),
  last_name: addressRecipientLastNameSelector(userAddress),
  address: addressWithoutRecipientSelector(userAddress),
  products: map(product => transformProductToCheckout(product), breakProducts),
  coupon: coupon,
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
  const discount = paymentData.cart.coupons[0]?.discounted_amount || '';
  return {
    cartItems,
    cartId,
    tax: paymentData.tax_total,
    subtotal: paymentData.subtotal_ex_tax,
    shipping: paymentData.shipping_cost_total_ex_tax,
    discount,
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

export const checkoutCartDiscountSelector = (
  checkoutCart: CheckoutCart | undefined,
): string => {
  const discount = path(['discount'], checkoutCart) as number;
  // since 0 evaluates to false in js
  // we need to explicitly check for undefined
  return discount !== undefined
    ? `${t('payment.paymentCurrencySign')}${(
        Math.round(discount * 100) / 100
      ).toFixed(2)}`
    : '';
};

export const checkoutCartTaxSelector = (
  checkoutCart: CheckoutCart | undefined,
): string => {
  const tax = path(['tax'], checkoutCart) as number;
  // since 0 evaluates to false in js
  // we need to explicitly check for undefined
  return tax !== undefined ? `${t('payment.paymentCurrencySign')}${(Math.round(tax * 100) / 100).toFixed(2)}` : '';
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
  const total = path(['total'], checkoutCart) as number;
  // since 0 evaluates to false in js
  // we need to explicitly check for undefined
  return total !== undefined
    ? `${t('payment.paymentCurrencySign')}${(Math.round(total * 100) / 100).toFixed(2)}`
    : '';
};

export const processPayment = async (
  checkoutCart: CheckoutCart,
  userPaymentData: Card,
  createOrder: (cardId: string, paymentToken: string) => Promise<OrderState>,
  setOrderCreated: (state: OrderState) => void,
  setPurchasing: (purchasing: boolean) => void,
): Promise<void> => {
  if (checkoutCart && userPaymentData) {
    setPurchasing(true);
    const orderState = await createOrder(
      checkoutCart.cartId,
      userPaymentData.paymentToken,
    );

    setOrderCreated(orderState);

    setPurchasing(false);
  }
};
 
export const getWarningModalProps = (
  orderState: OrderState | undefined,
  checkoutCart: CheckoutCart,
  userPaymentData: Card,
  createOrder: (cardId: string, paymentToken: string) => Promise<OrderState>,
  setOrderCreated: (state: OrderState) => void,
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
  if (orderState === undefined) {
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

  if (orderState.created) {
    return {
      imageSrc: successImage,
      title: t('payment.purchaseSuccessfullMessage'),
      primaryActionText: t('buttons.letsGo'),
      onPrimaryActionPressed: onSuccess,
    };
  } else {
    return {
      imageSrc: failedImage,
      title: orderState.message,
      primaryActionText: t('buttons.backToPaymentDetails'),
      onPrimaryActionPressed: onError,
    };
  }
};
