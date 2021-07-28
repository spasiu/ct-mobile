import React, { useContext, useState, useEffect } from 'react';
import { Text, Image, View, FlatList } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Modal from 'react-native-modal';
import { showMessage } from 'react-native-flash-message';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { BorderlessButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { t } from '../../i18n/i18n';
import {
  PaymentRowLink,
  AddressRowLink,
  RowLink,
  ArrowDirection,
  PaymentMethods,
  ReadMore,
  TextLink,
  Loading,
} from '../../components';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';

import { ICON_SIZE } from '../../theme/sizes';
import { COLORS } from '../../theme/colors';
import { userDefaultAddressSingleLineSelector } from '../../common/user-profile';
import {
  breakDescriptionSelector,
  breakImageSelector,
  breakTitleSelector,
} from '../../common/break';
import { breakProductsItemsSelector } from '../../common/break-products';

import {
  getCheckoutCartInfo,
  getProductsPreview,
  transformProductToCheckout,
  addItemToCart,
  removeItemFromCart,
  updateCheckoutCart,
  findCartItem,
  cartHasOnlyOneItem,
  getCheckout,
} from './break-detail-modal.utils';
import {
  CheckoutCart,
  UpdateCheckoutResponse,
  BreakDetailProps,
} from './break-detail-modal.props';
import { ROUTES_IDS } from '../../navigators';

const checkIcon = require('../../assets/check-icon.png');

export const BreakDetail = ({
  breakData,
  userData,
  checkoutCart,
  setCheckoutCart,
  setLoading,
  setVisibleRoute,
}: BreakDetailProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const { getCards, getDefaultPaymentCard } = useContext(
    PaymentContext,
  ) as PaymentContextType;

  const [openModal, setOpenModal] = useState(false);
  const [cartProcessingIndex, setCartProcessingIndex] = useState<number>();

  useEffect(() => {
    getCards(
      authUser as FirebaseAuthTypes.User,
      'b8c07a16-7e98-4d9f-a45d-b4254b590cf7',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={[s.aic]}>
        <View style={[{ height: sizes.h4 + sizes.h2 }, s.w4, s.aic]}>
          <SwiperFlatList
            showPagination
            data={[breakImageSelector(breakData)]}
            paginationStyleItem={{
              width: ICON_SIZE.MICRO,
              height: ICON_SIZE.MICRO,
              borderRadius: ICON_SIZE.MICRO / 2,
              marginTop: sizes.mt2,
              marginHorizontal: sizes.mh1,
            }}
            paginationStyleItemActive={{ backgroundColor: COLORS.black }}
            paginationStyleItemInactive={{
              backgroundColor: COLORS.black_40,
            }}
            renderItem={({ item }: { item: string }) => {
              return (
                <Image
                  style={[
                    {
                      height: sizes.h3 + sizes.h3,
                    },
                    s.w4,
                  ]}
                  source={{ uri: item }}
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
        {breakTitleSelector(breakData)}
      </Text>
      <ReadMore mainTextStyle={[s.f6, s.lh_sub, s.ph2]}>
        {breakDescriptionSelector(breakData)}
      </ReadMore>
      <RowLink
        text={getProductsPreview(
          checkoutCart,
          breakProductsItemsSelector(breakData),
        )}
        containerStyle={[s.mt3, s.mb3]}
        arrowDirection={ArrowDirection.down}
        onPress={() => setOpenModal(true)}
      />
      <PaymentRowLink
        containerStyle={[s.mb3]}
        paymentMethod={PaymentMethods.card}
        cardInfo={getDefaultPaymentCard()}
        onPress={() =>
          setVisibleRoute({ route: ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN })
        }
      />
      <AddressRowLink
        address={userDefaultAddressSingleLineSelector(userData)}
        containerStyle={[s.mb3]}
        onPress={() =>
          setVisibleRoute({ route: ROUTES_IDS.ADDRESSES_LIST_SCREEN })
        }
      />
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
        <Text
          style={[
            s.ff_alt_r,
            s.f6,
            s.black_80,
          ]}>{`$${checkoutCart.subtotal}`}</Text>
      </View>
      <View style={[s.flx_row, s.flx_i, s.jcsb, s.mr2, s.mb1]}>
        <Text style={[s.ff_alt_r, s.f6, s.black_80]}>{t('payment.tax')}</Text>
        <Text
          style={[s.ff_alt_r, s.f6, s.black_80]}>{`$${checkoutCart.tax}`}</Text>
      </View>
      <View style={[s.flx_row, s.flx_i, s.jcsb, s.mr2]}>
        <Text style={[s.ff_alt_r, s.f6, s.black_80]}>
          {t('payment.shipping')}
        </Text>
        <Text
          style={[
            s.ff_alt_r,
            s.f6,
            s.black_80,
          ]}>{`$${checkoutCart.shipping}`}</Text>
      </View>
      <Modal
        style={[s.ma0, s.jcfe]}
        isVisible={openModal}
        onBackdropPress={() => {
          setLoading(true);
          setOpenModal(false);
          getCheckout({ cartId: checkoutCart?.cartId }).then(response => {
            setCheckoutCart(getCheckoutCartInfo(response));
            setLoading(false);
          });
        }}>
        <View
          style={[
            s.w_100,
            s.h6,
            s.br4,
            s.no_overflow,
            s.ph3,
            s.pt3,
            s.bg_black_5,
          ]}>
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={[s.h_custom(1), s.bg_black_10]} />
            )}
            style={[s.mb4]}
            data={breakProductsItemsSelector(breakData)}
            renderItem={({ item, index }) => {
              const cartItem = findCartItem(item, checkoutCart as CheckoutCart);
              const selected = Boolean(cartItem);
              const isLoading = cartProcessingIndex === index;
              return (
                <BorderlessButton
                  style={[s.flx_row, s.jcsb, s.mv3]}
                  onPress={async () => {
                    try {
                      if (selected) {
                        if (cartHasOnlyOneItem(checkoutCart as CheckoutCart)) {
                          return;
                        } else {
                          setCartProcessingIndex(index);
                          const updatedCart: UpdateCheckoutResponse = await removeItemFromCart(
                            {
                              cartId: checkoutCart?.cartId,
                              itemId: cartItem?.id,
                            },
                          );
                          setCheckoutCart(
                            updateCheckoutCart(
                              updatedCart,
                              checkoutCart as CheckoutCart,
                            ),
                          );
                          setCartProcessingIndex(undefined);
                        }
                      } else {
                        setCartProcessingIndex(index);
                        const updatedCart: UpdateCheckoutResponse = await addItemToCart(
                          {
                            cartId: checkoutCart?.cartId,
                            products: [transformProductToCheckout(item)],
                          },
                        );
                        setCheckoutCart(
                          updateCheckoutCart(
                            updatedCart,
                            checkoutCart as CheckoutCart,
                          ),
                        );
                        setCartProcessingIndex(undefined);
                      }
                    } catch (e) {
                      setCartProcessingIndex(undefined);
                      showMessage({
                        message: t('errors.generic'),
                        type: 'danger',
                      });
                    }
                  }}>
                  <Text>{`${item.title} • $${item.price}`}</Text>
                  {isLoading ? (
                    <Loading containerStyle={[s.mt0, s.aife, s.icon_xxs]} />
                  ) : null}
                  {selected && !isLoading ? (
                    <Image
                      style={[s.icon_xxs, s.tint_black]}
                      source={checkIcon}
                      resizeMode={'contain'}
                    />
                  ) : null}
                </BorderlessButton>
              );
            }}
          />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};
