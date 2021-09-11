import React, { useContext, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { showMessage } from 'react-native-flash-message';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { isEmpty } from 'ramda';

import { t } from '../../i18n/i18n';
import { OverScreenModal, Loading } from '../../components';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  BreakProductItems,
  useBreakDetailQuery,
} from '../../services/api/requests';
import {
  userDefaultAddressSelector,
  userSelector,
} from '../../common/user-profile';
import { breakCompletedSelector, breakSelector } from '../../common/break';
import { breakSoldOutSelector } from '../../common/break';
import { ROUTES_IDS } from '../../navigators';

import { AddPaymentInformation } from '../add-payment-information/add-payment-information';
import { AddressesList } from '../addresses-list/addresses-list';
import { AddAddress } from '../add-address/add-address';
import { EditAddress } from '../edit-address/edit-address';
import { PaymentInformationList } from '../payment-information-list/payment-information-list';
import { PaymentContext, PaymentContextType } from '../../providers/payment';

import { BreakDetail } from './break-detail';
import {
  isBreakDetailView,
  isAddressList,
  getRootModalProps,
  isAddAddress,
  isEditAddress,
  isPaymentList,
  isAddPayment,
} from './break-detail-modal.utils';
import { BreakDetailModalProps, ModalRoute } from './break-detail-modal.props';
import { PurchaseModal } from './purchase-modal';
import { addressCleanSelector } from '../../common/address/address-selectors';

export const BreakDetailModal = ({
  breakId,
  isVisible,
  onPressClose = () => undefined,
  ...modalProps
}: BreakDetailModalProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const { cards, getCards, getDefaultPaymentCard } = useContext(
    PaymentContext,
  ) as PaymentContextType;

  const [visibleRoute, setVisibleRoute] = useState<ModalRoute>({
    route: ROUTES_IDS.BREAK_DETAIL_MODAL,
  });

  const [selectedItems, setSelectedItems] = useState<BreakProductItems[]>([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const { data, loading, refetch } = useBreakDetailQuery({
    fetchPolicy: 'network-only',
    variables: {
      breakId,
      userId: authUser?.uid,
    },
    onError: () => {
      if (isVisible) {
        showMessage({
          message: t('errors.generic'),
          type: 'danger',
        });
      }
    },
  });

  useEffect(() => {
    if (isEmpty(cards)) {
      getCards(authUser as FirebaseAuthTypes.User);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breakData = breakSelector(data);
  const userData = userSelector(data);

  const isBreakSoldOut = breakSoldOutSelector(breakData);
  const isBreakCompleted = breakCompletedSelector(breakData);

  const userAddress = userDefaultAddressSelector(userData);
  const userPaymentData = getDefaultPaymentCard();
  const shouldAllowToContinueToCheckout =
    !isEmpty(selectedItems) && userAddress && Boolean(userPaymentData);
  return (
    <OverScreenModal
      {...modalProps}
      {...getRootModalProps(loading, visibleRoute, isBreakSoldOut)}
      onPressClose={onPressClose}
      onPressBack={() => {
        if (isAddAddress(visibleRoute) || isEditAddress(visibleRoute)) {
          setVisibleRoute({ route: ROUTES_IDS.ADDRESSES_LIST_SCREEN });
        } else if (isAddressList(visibleRoute)) {
          refetch();
          setVisibleRoute({
            route: ROUTES_IDS.BREAK_DETAIL_MODAL,
          });
        } else if (isPaymentList(visibleRoute)) {
          setVisibleRoute({
            route: ROUTES_IDS.BREAK_DETAIL_MODAL,
          });
        } else if (isAddPayment(visibleRoute)) {
          setVisibleRoute({
            route: ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN,
          });
        }
      }}
      onPressAction={() => setShowPurchaseModal(true)}
      isVisible={isVisible}
      actionEnabled={shouldAllowToContinueToCheckout}
      actionStyle={[s.ph3, s.pb3]}
      bottomComponent={
        isBreakDetailView(visibleRoute) ? (
          <Text style={[s.ff_alt_r, s.f7, s.ml3]}>
            {t('payment.paymentDisclaimer')}
          </Text>
        ) : null
      }>
      {loading ? (
        <Loading containerStyle={[s.jcc, s.aic]} />
      ) : (
        <View style={[s.flx_i, s.mv4, s.ph3]}>
          {isBreakDetailView(visibleRoute) ? (
            <BreakDetail
              breakData={breakData}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              setVisibleRoute={setVisibleRoute}
              isBreakSoldOut={isBreakSoldOut}
              isBreakCompleted={isBreakCompleted}
              userAddress={userAddress}
              paymentData={userPaymentData}
            />
          ) : null}
          {isAddressList(visibleRoute) ? (
            <AddressesList
              onAddAddress={params =>
                setVisibleRoute({
                  route: ROUTES_IDS.ADD_ADDRESS_SCREEN,
                  params,
                })
              }
              onEditAddress={params =>
                setVisibleRoute({
                  route: ROUTES_IDS.EDIT_ADDRESS_SCREEN,
                  params,
                })
              }
            />
          ) : null}
          {isAddAddress(visibleRoute) ? (
            <AddAddress
              {...visibleRoute.params}
              onAddressAdded={() =>
                setVisibleRoute({ route: ROUTES_IDS.ADDRESSES_LIST_SCREEN })
              }
            />
          ) : null}
          {isEditAddress(visibleRoute) ? (
            <EditAddress
              {...visibleRoute.params}
              onAddressEdited={() =>
                setVisibleRoute({ route: ROUTES_IDS.ADDRESSES_LIST_SCREEN })
              }
            />
          ) : null}
          {isPaymentList(visibleRoute) ? (
            <PaymentInformationList
              onAddPayment={() =>
                setVisibleRoute({
                  route: ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN,
                })
              }
            />
          ) : null}
          {isAddPayment(visibleRoute) ? (
            <AddPaymentInformation
              onPaymentAdded={() =>
                setVisibleRoute({
                  route: ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN,
                })
              }
            />
          ) : null}
        </View>
      )}
      <PurchaseModal
        visible={showPurchaseModal}
        userAddress={addressCleanSelector(userAddress)}
        userPaymentData={userPaymentData}
        cartItems={selectedItems}
        onSuccess={() => onPressClose()}
        onCancel={() => setShowPurchaseModal(false)}
      />
    </OverScreenModal>
  );
};
