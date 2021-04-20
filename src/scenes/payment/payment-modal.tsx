import React from 'react';
import { Text, Image, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { t } from '../../i18n/i18n';
import {
  OverScreenModal,
  PaymentRowLink,
  AddressRowLink,
  CheckBox,
} from '../../components';

import { PaymentModalProps } from './payment-modal.props';

const arrowRight = require('../../assets/arrow-right.png');

export const PaymentModal = ({
  productImage,
  productTitle = '',
  productDescription = '',
  price = '',
  ...modalProps
}: PaymentModalProps) => {
  return (
    <OverScreenModal
      {...modalProps}
      action={t('buttons.purchase')}
      title={t('payment.paymentModalTitle')}>
      <ScrollView style={[s.flx_i, s.mv3]}>
        <Image
          style={[s.h4, s.mt2]}
          source={productImage}
          resizeMode={'contain'}
        />
        <Text style={[s.ff_b, s.f4, s.mh5, s.tc, s.black, s.mt4, s.mb3]}>
          {productTitle}
        </Text>
        <Text
          style={[s.ff_alt_r, s.f6, s.tc, s.black]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {productDescription}
        </Text>
        <PaymentRowLink containerStyle={[s.mt4, s.mb3]} />
        <AddressRowLink containerStyle={[s.mb3]} />
        <View style={[s.flx_i, s.h_custom(1), s.bg_black_10, s.mv1]} />
        <View style={[s.flx_row, s.aic, s.mv3]}>
          <View style={[s.flx_row, s.flx_i, s.jcsb, s.mr2]}>
            <Text style={[s.ff_alt_sb, s.f5]}>{t('payment.paymentTotal')}</Text>
            <Text style={[s.ff_alt_sb, s.f5]}>{`${t(
              'payment.paymentCurrencySign',
            )}${price} ${t('payment.paymentDescription')}`}</Text>
          </View>
          <Image style={[s.icon_s]} source={arrowRight} />
        </View>
        <View style={[s.flx_row, s.mv2]}>
          <CheckBox />
          <Text style={[s.ff_alt_r, s.f7, s.ml3]}>
            {t('payment.paymentDisclaimer')}
          </Text>
        </View>
      </ScrollView>
    </OverScreenModal>
  );
};
