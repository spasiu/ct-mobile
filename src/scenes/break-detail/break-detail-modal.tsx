import React from 'react';
import { Text, Image, View } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { t } from '../../i18n/i18n';
import {
  OverScreenModal,
  PaymentRowLink,
  AddressRowLink,
  RowLink,
  ArrowDirection,
  PaymentMethods,
  ReadMore,
  TextLink,
  FormInput,
} from '../../components';

import { BreakDetailModalProps } from './break-detail-modal.props';
import { ICON_SIZE } from '../../theme/sizes';
import { COLORS } from '../../theme/colors';

export const BreakDetailModal = ({
  productImages,
  productTitle,
  productDescription,
  price,
  ...modalProps
}: BreakDetailModalProps): JSX.Element => {
  return (
    <OverScreenModal
      {...modalProps}
      action={`${t('buttons.purchase')} $130.00`}
      title={t('payment.paymentModalTitle')}
      actionStyle={[s.ph3, s.pb3]}
      bottomComponent={
        <Text style={[s.ff_alt_r, s.f7, s.ml3]}>
          {t('payment.paymentDisclaimer')}
        </Text>
      }>
      <KeyboardAwareScrollView style={[s.flx_i, s.mv3, s.ph3]}>
        <View style={[s.aic]}>
          <View style={[{ height: sizes.h4 + sizes.h2 }, s.w4, s.aic]}>
            <SwiperFlatList
              showPagination
              data={productImages}
              paginationStyleItem={{
                width: ICON_SIZE.MICRO,
                height: ICON_SIZE.MICRO,
                borderRadius: ICON_SIZE.MICRO / 2,
                marginTop: sizes.mt2,
                marginHorizontal: sizes.mh1,
              }}
              paginationStyleItemActive={{ backgroundColor: COLORS.black }}
              paginationStyleItemInactive={{ backgroundColor: COLORS.black_40 }}
              renderItem={({ item }) => {
                return (
                  <Image
                    style={[
                      {
                        height: sizes.h3 + sizes.h3,
                      },
                      s.w4,
                    ]}
                    source={item}
                    resizeMode={'contain'}
                  />
                );
              }}
            />
          </View>
        </View>
        <Text
          style={[
            s.ff_b,
            s.f4,
            s.tc,
            s.black,
            s.mt2,
            s.mb3,
            { marginHorizontal: sizes.mh4 + sizes.mh1 },
          ]}>
          {productTitle}
        </Text>
        <ReadMore mainTextStyle={[s.f6, s.lh_sub, s.ph2]}>
          {productDescription}
        </ReadMore>
        <RowLink
          text={t('payment.numberOfSpots')}
          containerStyle={[s.mt3, s.mb3]}
          arrowDirection={ArrowDirection.down}
        />
        <View style={[s.flx_row, s.h3, s.mb3]}>
          <View style={[s.flx_ratio(0.7)]}>
            <PaymentRowLink paymentMethod={PaymentMethods.card} />
          </View>
          <View style={[s.flx_ratio(0.3), s.bg_white, s.br4, s.ml3]}>
            <FormInput
              showTooltip
              tooltipText={t('payment.cvvInstructions')}
              keyboardType={'number-pad'}
              inputStyle={[s.b__white]}
              style={[s.ff_alt_sb]}
              placeholder={t('forms.cvvField')}
              placeholderTextColor={COLORS.negative}
            />
          </View>
        </View>
        <AddressRowLink containerStyle={[s.mb3]} />
        <View style={[s.flx_i, s.h_custom(1), s.bg_black_20, s.mv1]} />
        <View style={[s.flx_row, s.flx_i, s.jcsb, s.mr2]}>
          <TextLink textStyle={[s.f6]} text={t('payment.addCoupon')} />
          <Text style={[s.ff_alt_r, s.f6, s.black_80]}>{'- $0'}</Text>
        </View>
        <View style={[s.flx_i, s.h_custom(1), s.bg_black_20, s.mv1]} />
        <View style={[s.flx_row, s.flx_i, s.jcsb, s.mr2, s.mb1]}>
          <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
            {t('payment.subtotal')}
          </Text>
          <Text style={[s.ff_alt_r, s.f6, s.black_80]}>{`$${price}`}</Text>
        </View>
        <View style={[s.flx_row, s.flx_i, s.jcsb, s.mr2, s.mb1]}>
          <Text style={[s.ff_alt_r, s.f6, s.black_80]}>{t('payment.tax')}</Text>
          <Text style={[s.ff_alt_r, s.f6, s.black_80]}>{'$10.00'}</Text>
        </View>
        <View style={[s.flx_row, s.flx_i, s.jcsb, s.mr2]}>
          <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
            {t('payment.shipping')}
          </Text>
          <Text style={[s.ff_alt_r, s.f6, s.black_80]}>{'$10.00'}</Text>
        </View>
      </KeyboardAwareScrollView>
    </OverScreenModal>
  );
};
