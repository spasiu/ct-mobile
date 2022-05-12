import React from 'react';
import { Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { t } from '../../i18n/i18n';
import { OverScreenModal, Loading } from '../../components';
import { ROUTES_IDS } from '../../navigators';
import { AddPaymentInformation } from '../add-payment-information/add-payment-information';
import { AddressesList } from '../addresses-list/addresses-list';
import { AddAddress } from '../add-address/add-address';
import { EditAddress } from '../edit-address/edit-address';
import { PaymentInformationList } from '../payment-information-list/payment-information-list';
import { BreakDetail } from './break-detail';
import {
  isBreakDetailView,
  isAddressList,
  getRootModalProps,
  isAddAddress,
  isEditAddress,
  isPaymentList,
  isAddPayment,
  useBreakDetailModalHook,
} from './break-detail-modal.logic';
import { BreakDetailModalProps } from './break-detail-modal.props';
import { PurchaseModal } from './purchase-modal';
import { addressCleanSelector } from '../../common/address/address-selectors';

export const BreakDetailModal = ({
  breakId,
  isVisible,
  onPressClose = () => undefined,
  ...modalProps
}: BreakDetailModalProps): JSX.Element => {
  const {
    loading,
    visibleRoute,
    isBreakSoldOut,
    cleanModalOnClose,
    setVisibleRoute,
    refetch,
    setShowPurchaseModal,
    breakData,
    shouldAllowToContinueToCheckout,
    selectedItems,
    setSelectedItems,
    isBreakCompleted,
    userAddress,
    userPaymentData,
    couponCode,
    setCouponCode,
    error,
    setError,
    showPurchaseModal,
    requestNotificationPermission,
  } = useBreakDetailModalHook(breakId, isVisible);

  return (
    <OverScreenModal
      {...modalProps}
      {...getRootModalProps(loading, visibleRoute, isBreakSoldOut)}
      onPressClose={() => {
        cleanModalOnClose(false);
        onPressClose();
      }}
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
      showClose={!(isPaymentList(visibleRoute) || isAddPayment(visibleRoute))}
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
              coupon={couponCode}
              setCoupon={setCouponCode}
              error={error}
              setError={setError}
            />
          ) : null}
          {isAddressList(visibleRoute) ? (
            <AddressesList
              onSave={() =>
                setVisibleRoute({ route: ROUTES_IDS.BREAK_DETAIL_MODAL })
              }
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
              goBack={() =>
                setVisibleRoute({
                  route: ROUTES_IDS.BREAK_DETAIL_MODAL,
                })
              }
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
        coupon={couponCode}
        setError={setError}
        onSuccess={() => {
          cleanModalOnClose();
          onPressClose();
          requestNotificationPermission();
        }}
        onCancel={() => setShowPurchaseModal(false)}
        onError={() => {
          cleanModalOnClose();
          refetch();
        }}
      />
    </OverScreenModal>
  );
};
