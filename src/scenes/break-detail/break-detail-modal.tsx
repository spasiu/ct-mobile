import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { showMessage } from 'react-native-flash-message';
import { NetworkStatus } from '@apollo/client';

import { t } from '../../i18n/i18n';
import { OverScreenModal, Loading, WarningModal } from '../../components';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  BreakDetailQuery,
  BreakProductItems,
  useBreakDetailQuery,
} from '../../services/api/requests';
import { userSelector } from '../../common/user-profile';
import { breakSelector } from '../../common/break';
import { breakProductsFirstItemSelector } from '../../common/break-products';
import { breakSoldOutSelector } from '../../common/break';
import { ROUTES_IDS } from '../../navigators';
import { PaymentContext, PaymentContextType } from '../../providers/payment';

import { AddPaymentInformation } from '../add-payment-information/add-payment-information';
import { AddressesList } from '../addresses-list/addresses-list';
import { AddAddress } from '../add-address/add-address';
import { EditAddress } from '../edit-address/edit-address';
import { PaymentInformationList } from '../payment-information-list/payment-information-list';

import { BreakDetail } from './break-detail';
import {
  getCheckoutCartInfo,
  getCheckoutParams,
  createCheckout,
  isBreakDetailView,
  isAddressList,
  getRootModalProps,
  isAddAddress,
  isEditAddress,
  isPaymentList,
  isAddPayment,
  updateCartAddress,
} from './break-detail-modal.utils';
import {
  BreakDetailModalProps,
  CheckoutResponse,
  CheckoutCart,
  ModalRoute,
} from './break-detail-modal.props';

const successImage = require('../../assets/check-with-border.png');
const failedImage = require('../../assets/failed-emoji.png');

export const BreakDetailModal = ({
  breakId,
  isVisible,
  onPressClose = () => undefined,
  ...modalProps
}: BreakDetailModalProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const { createOrder, getDefaultPaymentCard } = useContext(
    PaymentContext,
  ) as PaymentContextType;

  const [loading, setLoading] = useState(true);
  const [checkoutCart, setCheckoutCart] = useState<CheckoutCart>();
  const [visibleRoute, setVisibleRoute] = useState<ModalRoute>({
    route: ROUTES_IDS.BREAK_DETAIL_MODAL,
  });

  const [purchasing, setPurchasing] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const {
    data,
    loading: firstLoading,
    refetch,
    networkStatus,
  } = useBreakDetailQuery({
    fetchPolicy: 'network-only',
    variables: {
      breakId,
      userId: authUser?.uid,
    },
    onCompleted: (queryData: BreakDetailQuery) => {
      const eventBreak = breakSelector(queryData);
      const firstBreakProduct = breakProductsFirstItemSelector(
        eventBreak,
      ) as BreakProductItems;

      if (firstBreakProduct) {
        const user = userSelector(queryData);
        const checkoutParams = getCheckoutParams(user, [firstBreakProduct]);
        createCheckout(checkoutParams)
          .then((response: CheckoutResponse) => {
            const cart = getCheckoutCartInfo(response);
            setCheckoutCart(cart);
            setLoading(false);
          })
          .catch(() => {
            showMessage({
              message: t('errors.generic'),
              type: 'danger',
            });
          });
      }
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

  const breakData = breakSelector(data);
  const userData = userSelector(data);

  const isBreakSoldOut = breakSoldOutSelector(breakData);
  const showLoading = !checkoutCart || loading || firstLoading || refetching;

  if (refetching && networkStatus !== NetworkStatus.refetch) {
    updateCartAddress(
      userData,
      checkoutCart as CheckoutCart,
      setCheckoutCart,
      setRefetching,
      setVisibleRoute,
    );
  }

  return (
    <OverScreenModal
      {...modalProps}
      {...getRootModalProps(
        loading,
        checkoutCart,
        visibleRoute,
        isBreakSoldOut,
      )}
      onPressClose={onPressClose}
      onPressBack={() => {
        if (isAddAddress(visibleRoute) || isEditAddress(visibleRoute)) {
          setVisibleRoute({ route: ROUTES_IDS.ADDRESSES_LIST_SCREEN });
        } else if (isAddressList(visibleRoute)) {
          setRefetching(true);
          refetch();
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
      actionLoading={purchasing}
      onPressAction={async () => {
        setPurchasing(true);
        const card = getDefaultPaymentCard();
        if (card && checkoutCart) {
          const created = await createOrder(
            checkoutCart.cartId,
            card.paymentToken,
          );

          setPurchasing(false);
          if (created) {
            setShowSuccessModal(true);
          } else {
            setShowFailedModal(true);
          }
        } else {
          setPurchasing(false);
          setShowFailedModal(true);
        }
      }}
      isVisible={isVisible}
      actionStyle={[s.ph3, s.pb3]}
      bottomComponent={
        isBreakDetailView(visibleRoute) ? (
          <Text style={[s.ff_alt_r, s.f7, s.ml3]}>
            {t('payment.paymentDisclaimer')}
          </Text>
        ) : null
      }>
      {showLoading ? (
        <Loading containerStyle={[s.jcc, s.aic]} />
      ) : (
        <View style={[s.flx_i, s.mv4, s.ph3]}>
          {isBreakDetailView(visibleRoute) ? (
            <BreakDetail
              breakData={breakData}
              userData={userData}
              checkoutCart={checkoutCart as CheckoutCart}
              setCheckoutCart={setCheckoutCart}
              setLoading={setLoading}
              setVisibleRoute={setVisibleRoute}
              isBreakSoldOut={isBreakSoldOut}
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
      <WarningModal
        imageSrc={successImage}
        visible={showSuccessModal}
        title={t('payment.purchaseSuccessfullMessage')}
        primaryActionText={t('buttons.letsGo')}
        titleStyle={[s.f4, s.mt3, s.mb4, s.tc, s.mh3]}
        onPrimaryActionPressed={() => onPressClose()}
      />
      <WarningModal
        imageSrc={failedImage}
        visible={showFailedModal}
        title={t('payment.purchaseFailedMessage')}
        primaryActionText={t('buttons.backToPaymentDetails')}
        titleStyle={[s.f4, s.mt3, s.mb4, s.tc, s.mh3]}
        onPrimaryActionPressed={() => setShowFailedModal(false)}
      />
    </OverScreenModal>
  );
};
