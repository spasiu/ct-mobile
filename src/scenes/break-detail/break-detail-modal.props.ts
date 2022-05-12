import { ApolloQueryResult } from '@apollo/client';
import { OrderState } from '../../providers/payment';
import { ImageSourcePropType } from 'react-native';
import { Card } from '../../common/payment';
import { OverScreenModalProps, WarningModalProps } from '../../components';

import {
  Addresses,
  BreakDetailQuery,
  BreakProductItems,
  Breaks,
  Exact,
  Maybe,
} from '../../services/api/requests';

export type CheckoutCartData = {
  id: string;
  line_items: {
    physical_items: CartProduct[];
  };
  coupons: CouponData[];
};

type CouponData = {
  code: string;
  id: number;
  discounted_amount: number;
  coupon_type: string;
};

export type CheckoutData = {
  cart: CheckoutCartData;
  tax_total: string;
  subtotal_ex_tax: string;
  shipping_cost_total_ex_tax: string;
  grand_total: string;
};

export type CheckoutResponse = {
  data: {
    data: CheckoutData;
  };
};

export type CheckoutCart = {
  cartItems: CartProduct[];
  cartId: string;
  tax: string;
  subtotal: string;
  shipping: string;
  total: string;
  discount?: number;
};

export type CheckoutParams = {
  products: CartProduct[];
  first_name: string;
  last_name: string;
  address?: Addresses;
  coupon?: string;
};

export type CartProduct = {
  id?: string;
  product_id: string;
  variant_id: string;
  quantity: number;
};

export type ModalRoute = {
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
};

export interface BreakDetailModalProps extends OverScreenModalProps {
  breakId: string;
}

export interface BreakDetailProps {
  breakData: Breaks;
  selectedItems: BreakProductItems[];
  setSelectedItems: (items: BreakProductItems[]) => void;
  setVisibleRoute: (route: ModalRoute) => void;
  isBreakSoldOut: boolean;
  isBreakCompleted: boolean;
  paymentData: Card | undefined;
  userAddress: Addresses | undefined;
  coupon: string;
  setCoupon: (coupon: string) => void;
  error: string;
  setError: (error: string) => void;
}

export interface PurchaseModalProps extends WarningModalProps {
  coupon: string;
  userAddress: Addresses;
  userPaymentData: Card | undefined;
  cartItems: BreakProductItems[];
  onSuccess: () => void;
  onCancel: () => void;
  onError: () => void;
  setError: (error: string) => void;
}

export type useBreakDetailModalHookType = {
  loading: boolean;
  visibleRoute: ModalRoute;
  isBreakSoldOut: boolean;
  cleanModalOnClose: (success?: boolean | undefined) => void;
  setVisibleRoute: React.Dispatch<React.SetStateAction<ModalRoute>>;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            breakId?: any;
            userId?: Maybe<string> | undefined;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<BreakDetailQuery>>;
  setShowPurchaseModal: React.Dispatch<React.SetStateAction<boolean>>;
  breakData: Breaks;
  shouldAllowToContinueToCheckout: boolean;
  selectedItems: BreakProductItems[];
  setSelectedItems: React.Dispatch<React.SetStateAction<BreakProductItems[]>>;
  isBreakCompleted: boolean;
  userAddress: Addresses;
  userPaymentData: Card | undefined;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  showPurchaseModal: boolean;
  requestNotificationPermission: () => void;
};

export type useBreakDetailHookType = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateItem: (
    item: BreakProductItems,
    itemIndex: number,
    selectedItems: BreakProductItems[],
    selected: boolean,
  ) => BreakProductItems[];
};

export type usePurchaseModalHookType = {
  warningModalProps: {
    title: string;
    primaryActionText: string;
    secondaryActionText?: string | undefined;
    onPrimaryActionPressed: () => void | Promise<void>;
    onSecondaryActionPressed?: (() => void) | undefined;
    imageSrc?: ImageSourcePropType | undefined;
  };
  loading: boolean;
  purchasing: boolean;
  orderCreated: OrderState | undefined;
  checkoutCart: CheckoutCart | undefined;
};
