import { Card } from '../../common/payment';
import { OverScreenModalProps, WarningModalProps } from '../../components';

import {
  Addresses,
  BreakProductItems,
  Breaks,
} from '../../services/api/requests';

export type CheckoutCartData = {
  id: string;
  line_items: {
    physical_items: CartProduct[];
  };
  coupons: CouponData;
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
  discount?: string;
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
  changeCoupon: (coupon: string) => void;
}

export interface PurchaseModalProps extends WarningModalProps {
  coupon: string;
  userAddress: Addresses;
  userPaymentData: Card | undefined;
  cartItems: BreakProductItems[];
  onSuccess: () => void;
  onCancel: () => void;
  onError: () => void;
}
