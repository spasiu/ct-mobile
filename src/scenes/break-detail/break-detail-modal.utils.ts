import {
  pathOr,
  map,
  set,
  lensProp,
  whereEq,
  find,
  length,
  isEmpty,
} from 'ramda';
import functions from '@react-native-firebase/functions';

import { t } from '../../i18n/i18n';
import {
  breakProductExternalProductId,
  breakProductExternalVariantId,
} from '../../common/break-products';
import {
  userDefaultAddressCleanSelector,
  userFirstNameSelector,
  userLastNameSelector,
} from '../../common/user-profile';
import { BreakProductItems, Users } from '../../services/api/requests';

import {
  CheckoutCart,
  CheckoutData,
  CheckoutResponse,
  CheckoutParams,
  CartProduct,
  CheckoutCartData,
  UpdateCheckoutResponse,
  ModalRoute,
} from './break-detail-modal.props';
import { ROUTES_IDS } from '../../navigators';

export const createCheckout = functions().httpsCallable('createCheckout');
export const addItemToCart = functions().httpsCallable('addItem');
export const removeItemFromCart = functions().httpsCallable('removeItem');
export const getCheckout = functions().httpsCallable('getCheckout');
export const addAddress = functions().httpsCallable('addAddress');

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
  user: Users,
  breakProducts: BreakProductItems[],
  products: CartProduct[] = [],
): CheckoutParams => {
  const address = userDefaultAddressCleanSelector(user);
  return {
    products: isEmpty(products)
      ? map(product => transformProductToCheckout(product), breakProducts)
      : products,
    first_name: userFirstNameSelector(user),
    last_name: userLastNameSelector(user),
    ...((address.line1 && { address }) || {}),
  };
};

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
    shipping: paymentData.shipping_cost_total_inc_tax,
    total: paymentData.grand_total,
  };
};

export const updateCheckoutCart = (
  updatedCartResponse: UpdateCheckoutResponse,
  checkoutCart: CheckoutCart,
): CheckoutCart => {
  const updatedCart = pathOr(
    {},
    ['data', 'data'],
    updatedCartResponse,
  ) as CheckoutCartData;
  const cartItems = pathOr([], ['line_items', 'physical_items'], updatedCart);
  return set(lensProp('cartItems'), cartItems, checkoutCart);
};

export const findBreakProductItem = (
  productId: string,
  variantId: string,
  breakProductItems: BreakProductItems[],
): BreakProductItems | undefined =>
  find(
    whereEq({
      bc_product_id: productId,
      bc_variant_id: variantId,
    }),
    breakProductItems,
  );

export const getProductsPreview = (
  checkoutCart: CheckoutCart,
  breakProducts: BreakProductItems[],
): string => {
  const cartItemTitles = map(cartItem => {
    const breakProductItem = findBreakProductItem(
      cartItem.product_id,
      cartItem.variant_id,
      breakProducts,
    );
    return breakProductItem ? breakProductItem.title : '';
  }, checkoutCart.cartItems);
  return cartItemTitles.join(', ');
};

export const findCartItem = (
  breakProduct: BreakProductItems,
  checkoutCart: CheckoutCart,
): CartProduct | undefined =>
  find(
    whereEq({
      product_id: breakProduct.bc_product_id,
      variant_id: breakProduct.bc_variant_id,
      quantity: 1,
    }),
    checkoutCart.cartItems || [],
  );

export const cartHasOnlyOneItem = (checkoutCart: CheckoutCart): boolean =>
  length(checkoutCart.cartItems) === 1;

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
  checkoutCart: CheckoutCart | undefined,
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

  const paymentAction = checkoutCart
    ? `${t('buttons.purchase')} $${checkoutCart.total}`
    : t('buttons.purchase');

  return {
    action: isBreakSoldOut || loading ? '' : paymentAction,
    title: t('break.detailModalTitle'),
  };
};

export const updateCartAddress = async (
  user: Users,
  checkoutCart: CheckoutCart,
  setCheckoutCart: (cart: CheckoutCart) => void,
  setRefetching: (refetching: boolean) => void,
  setVisibleRoute: (route: ModalRoute) => void,
): Promise<void> => {
  const address = userDefaultAddressCleanSelector(user);

  let cart;
  if (isEmpty(address)) {
    const checkoutParams = getCheckoutParams(user, [], checkoutCart.cartItems);
    cart = await createCheckout(checkoutParams);
  } else {
    cart = await addAddress({
      cartId: checkoutCart.cartId,
      address: userDefaultAddressCleanSelector(user),
    });
  }

  const checkoutData = getCheckoutCartInfo(cart);
  setRefetching(false);
  setCheckoutCart(checkoutData);
  setVisibleRoute({
    route: ROUTES_IDS.BREAK_DETAIL_MODAL,
  });
};
