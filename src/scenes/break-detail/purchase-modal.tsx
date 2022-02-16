import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { t } from '../../i18n/i18n';
import { WarningModal } from '../../components';

import { addressIcon, paymentIcon } from './break-detail-modal.presets';
import {
  checkoutCartShippingSelector,
  checkoutCartSubtotalSelector,
  checkoutCartTaxSelector,
  checkoutCartDiscountSelector,
  createCheckout,
  getCheckoutCartInfo,
  getCheckoutParams,
  getWarningModalProps,
} from './break-detail-modal.utils';
import {
  CheckoutCart,
  CheckoutResponse,
  PurchaseModalProps,
} from './break-detail-modal.props';
import { addressSingleLineSelector } from '../../common/address/address-selectors';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { Card } from '../../common/payment';
import { OrderState } from '../../providers/payment/payment-types';

export const PurchaseModal = ({
  visible,
  userAddress,
  userPaymentData,
  cartItems,
  coupon,
  error,
  setError,
  onSuccess,
  onCancel,
  onError,
  ...modalProps
}: PurchaseModalProps): JSX.Element => {
  const { createOrder } = useContext(PaymentContext) as PaymentContextType;

  const [checkoutCart, setCheckoutCart] = useState<CheckoutCart>();
  const [orderCreated, setOrderCreated] = useState<OrderState>();
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (visible) {
      const checkoutParams = getCheckoutParams(userAddress, cartItems, coupon);
      createCheckout(checkoutParams)
        .then((response: CheckoutResponse) => {
          const cart = getCheckoutCartInfo(response);
          setCheckoutCart(cart);
          setLoading(false);
        })
        .catch(e => {
          setError(e.details?.ct_error_code || "generic");
          setLoading(false);
          onCancel();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const warningModalProps = getWarningModalProps(
    orderCreated,
    checkoutCart as CheckoutCart,
    userPaymentData as Card,
    createOrder,
    setOrderCreated,
    onSuccess,
    onCancel,
    setPurchasing,
    onError,
  );

  return (
    <WarningModal
      {...modalProps}
      {...warningModalProps}
      loading={loading}
      loadingPrimaryAction={purchasing}
      visible={visible}
      titleStyle={[s.f4, s.mt3, s.mb4, s.tc, s.mh3]}>
      {orderCreated === undefined ? (
        <View style={[s.w_100, s.pb3, s.ph3]}>
          <View style={[s.flx_row, s.jcfs, s.aic, s.mb2, s.mr4]}>
            <Image
              source={addressIcon}
              style={[s.icon_xs, s.mr2]}
              resizeMode={'contain'}
            />
            <Text
              style={[s.ff_alt_sb, s.f5]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {addressSingleLineSelector(userAddress)}
            </Text>
          </View>
          <View style={[s.flx_row, s.jcfs, s.aic, s.mb3, s.mr4]}>
            <Image source={paymentIcon} style={[s.icon_xs, s.mr2]} />
            <Text style={[s.ff_alt_sb, s.f5]}>{`${t('payment.cardEnding')} ${
              userPaymentData && userPaymentData.lastDigits
            }`}</Text>
          </View>
          <View style={[s.flx_row, s.jcsb, s.mb2]}>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              {t('payment.subtotal')}
            </Text>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              {checkoutCartSubtotalSelector(checkoutCart)}
            </Text>
          </View>
          <View style={[s.flx_row, s.jcsb, s.mb2]}>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              {t('payment.shipping')}
            </Text>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              {checkoutCartShippingSelector(checkoutCart)}
            </Text>
          </View>
          <View style={[s.flx_row, s.jcsb, s.mb2]}>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              {t('payment.discounts')}
            </Text>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              -{checkoutCartDiscountSelector(checkoutCart)}
            </Text>
          </View>
          <View style={[s.flx_row, s.jcsb, s.mb2]}>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              {t('payment.tax')}
            </Text>
            <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
              {checkoutCartTaxSelector(checkoutCart)}
            </Text>
          </View>
        </View>
      ) : null}
    </WarningModal>
  );
};
