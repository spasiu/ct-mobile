import React, { useState } from 'react';
import { Text, Image, View, FlatList } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import Modal from 'react-native-modal';
import { BorderlessButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { append, remove } from 'ramda';

import { t } from '../../i18n/i18n';
import {
  PaymentRowLink,
  AddressRowLink,
  ArrowDirection,
  PaymentMethods,
  ReadMore,
  TextLink,
  ImageGallery,
  ActionButton,
  ProductRowLink,
} from '../../components';
import {
  breakDescriptionSelector,
  breakImageSelector,
  breakTitleSelector,
} from '../../common/break';
import { breakProductItemsWithQuantitySelector } from '../../common/break-products';
import { ROUTES_IDS } from '../../navigators';

import { findSelectedItem } from './break-detail-modal.utils';
import { BreakDetailProps } from './break-detail-modal.props';
import { checkIcon } from './break-detail-modal.presets';
import { addressSingleLineSelector } from '../../common/address/address-selectors';
import {
  BreakProductItems,
  useBreakItemUpdateMutation,
} from '../../services/api/requests';
import { ApolloError } from '@apollo/client';



export const BreakDetail = ({
  breakData,
  setVisibleRoute,
  isBreakSoldOut,
  isBreakCompleted,
  selectedItems,
  setSelectedItems,
  paymentData,
  userAddress,
}: BreakDetailProps): JSX.Element => {

  const [updateBreakItem] = useBreakItemUpdateMutation({
    onError: (error:ApolloError) => console.error('SQL ERROR',error)
  });

  const updateItem = (
    item: BreakProductItems,
    itemIndex: number,
    selectedItems: BreakProductItems[],
    selected: boolean
  ): BreakProductItems[] => {
    const [newSelectedItems, quantity] = selected
      ? [remove(itemIndex, 1, selectedItems), 1]
      : [append(item, selectedItems), -1];

    updateBreakItem({variables:{itemId: item.id, quantity: quantity}});
    return newSelectedItems;
  };

  const [openModal, setOpenModal] = useState(false);



  return (
    <KeyboardAwareScrollView>
      <View style={[s.aic]}>
        <ImageGallery images={[breakImageSelector(breakData)]} />
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
      {isBreakSoldOut || isBreakCompleted ? null : (
        <>
          <ProductRowLink
            productItems={selectedItems}
            containerStyle={[s.mt3, s.mb3]}
            arrowDirection={ArrowDirection.down}
            onPress={() => setOpenModal(true)}
          />
          <PaymentRowLink
            containerStyle={[s.mb3]}
            paymentMethod={PaymentMethods.card}
            cardInfo={paymentData}
            onPress={() =>
              setVisibleRoute({
                route: ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN,
              })
            }
          />
          <AddressRowLink
            address={addressSingleLineSelector(userAddress)}
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
          <Modal
            style={[s.ma0, s.jcfe]}
            isVisible={openModal}
            onBackdropPress={() => setOpenModal(false)}>
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
                data={
                  breakProductItemsWithQuantitySelector(breakData, selectedItems)
                    .sort((a, b) => a.bc_variant_id! - b.bc_variant_id!)
                }
                renderItem={({ item }) => {
                  const itemIndex = findSelectedItem(item, selectedItems);
                  const selected = itemIndex !== -1;
                  return (
                    <BorderlessButton
                      style={[s.flx_row, s.jcsb, s.pv3]}
                      onPress={() => {
                        const items = updateItem(item, itemIndex, selectedItems, selected);
                        setSelectedItems(items);
                      }}>
                      <Text>{`${item.title} • $${item.price}`}</Text>
                      {selected ? (
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
              <ActionButton
                style={[s.mb4]}
                text={t('buttons.done')}
                onPress={() => setOpenModal(false)}
              />
            </View>
          </Modal>
        </>
      )}
      
    </KeyboardAwareScrollView>
  );
};
