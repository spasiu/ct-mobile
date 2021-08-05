import { OverScreenModalProps } from '../../components';

import { Addresses, Breaks, Users } from '../../services/api/requests';

export type CheckoutCartData = {
  id: string;
  line_items: {
    physical_items: CartProduct[];
  };
};

export type CheckoutData = {
  cart: CheckoutCartData;
  tax_total: string;
  subtotal_ex_tax: string;
  shipping_cost_total_inc_tax: string;
  grand_total: string;
};

export type CheckoutResponse = {
  data: {
    data: CheckoutData;
  };
};

export type UpdateCheckoutResponse = {
  data: {
    data: CheckoutCartData;
  };
};

export type CheckoutCart = {
  cartItems: CartProduct[];
  cartId: string;
  tax: string;
  subtotal: string;
  shipping: string;
  total: string;
};

export type CheckoutParams = {
  products: CartProduct[];
  first_name: string;
  last_name: string;
  address?: Addresses;
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
  userData: Users;
  checkoutCart: CheckoutCart;
  setCheckoutCart: (cart: CheckoutCart) => void;
  setLoading: (loading: boolean) => void;
  setVisibleRoute: (route: ModalRoute) => void;
  isBreakSoldOut: boolean;
}
