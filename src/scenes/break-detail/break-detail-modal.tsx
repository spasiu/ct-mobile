import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { showMessage } from 'react-native-flash-message';
import { NetworkStatus } from '@apollo/client';

import { t } from '../../i18n/i18n';
import { OverScreenModal, Loading } from '../../components';
import { AuthContext, AuthContextType } from '../../providers/auth';

import {
  BreakDetailQuery,
  BreakProductItems,
  useBreakDetailQuery,
} from '../../services/api/requests';
import { userSelector } from '../../common/user-profile';
import { breakSelector } from '../../common/break';
import { breakProductsFirstItemSelector } from '../../common/break-products';
import { ROUTES_IDS } from '../../navigators';

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
} from './break-detail-modal.utils';
import {
  BreakDetailModalProps,
  CheckoutResponse,
  CheckoutCart,
  ModalRoute,
} from './break-detail-modal.props';
import { AddPaymentInformation } from '../add-payment-information/add-payment-information';

export const BreakDetailModal = ({
  breakId,
  isVisible,
  ...modalProps
}: BreakDetailModalProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [loading, setLoading] = useState(true);
  const [checkoutCart, setCheckoutCart] = useState<CheckoutCart>();
  const [visibleRoute, setVisibleRoute] = useState<ModalRoute>({
    route: ROUTES_IDS.BREAK_DETAIL_MODAL,
  });

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
          .catch(() =>
            showMessage({
              message: t('errors.generic'),
              type: 'danger',
            }),
          );
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
  const isRefetching = networkStatus === NetworkStatus.refetch;
  return (
    <OverScreenModal
      {...modalProps}
      {...getRootModalProps(loading, checkoutCart, visibleRoute)}
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
      actionStyle={[s.ph3, s.pb3]}
      bottomComponent={
        isBreakDetailView(visibleRoute) ? (
          <Text style={[s.ff_alt_r, s.f7, s.ml3]}>
            {t('payment.paymentDisclaimer')}
          </Text>
        ) : null
      }>
      {!checkoutCart || loading || firstLoading || isRefetching ? (
        <Loading containerStyle={[s.jcc, s.aic]} />
      ) : (
        <View style={[s.flx_i, s.mv4, s.ph3]}>
          {isBreakDetailView(visibleRoute) ? (
            <BreakDetail
              breakData={breakData}
              userData={userData}
              checkoutCart={checkoutCart}
              setCheckoutCart={setCheckoutCart}
              setLoading={setLoading}
              setVisibleRoute={setVisibleRoute}
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
    </OverScreenModal>
  );
};
