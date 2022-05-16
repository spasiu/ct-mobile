import React from 'react';
import { View, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  ActionFooter,
  ActionButton,
  ActionButtonTypes,
  SelectableRow,
  SelectableRowTypes,
  Loading,
  WarningModal,
  PaymentRowLink,
  PaymentMethods,
  EmptyState,
} from '../../components';
import { t } from '../../i18n/i18n';
import { Card } from '../../common/payment';
import { PaymentInformationListProps } from './payment-information-list-screen.props';
import { usePaymentInformationListHook } from './payment-information-list.logic';

export const PaymentInformationList = ({
  onAddPayment,
  goBack,
}: PaymentInformationListProps): JSX.Element => {
  const {
    status,
    setStatus,
    cards,
    selectedCard,
    defaultPaymentMethod,
    saveDefaultPaymentMethod,
    handleSelectCard,
    cardToDelete,
    handleDeleteCard,
    setCardToDelete,
    user,
  } = usePaymentInformationListHook();

  return (
    <>
      {status === 'loading' ? (
        <Loading />
      ) : (
        <FlatList
          ListEmptyComponent={() => (
            <EmptyState
              title={t('payment.noPaymentSavedTitle')}
              description={t('payment.noPaymentSavedDescription')}
            />
          )}
          data={cards}
          contentContainerStyle={[s.ph3]}
          renderItem={({ item }) => {
            const cardInfo = item as Card;
            const isSelected = selectedCard
              ? cardInfo.id === selectedCard
              : cardInfo.id === defaultPaymentMethod;
            return (
              <SelectableRow
                rowStyle={[s.aic, s.pv0, s.mb3]}
                rowStatus={
                  isSelected
                    ? SelectableRowTypes.selected
                    : SelectableRowTypes.default
                }
                onPress={() => handleSelectCard(cardInfo.id)}
                onActionPressed={() => {
                  setCardToDelete(cardInfo.id);
                }}
                actionText={t('buttons.remove')}>
                <PaymentRowLink
                  cardInfo={cardInfo}
                  paymentMethod={PaymentMethods.card}
                  enabled={false}
                />
              </SelectableRow>
            );
          }}
        />
      )}
      <View style={[s.mh3]}>
        <ActionFooter
          isLoading={status === 'saving'}
          onPress={async () => {
            setStatus('saving');
            await saveDefaultPaymentMethod(
              user as FirebaseAuthTypes.User,
              selectedCard,
            );
            setStatus('idle');
            goBack();
          }}
          buttonType={
            cards.length === 0 || status !== 'modified'
              ? ActionButtonTypes.disabled
              : ActionButtonTypes.primary
          }
          buttonText={t('buttons.save')}
          topElement={
            <ActionButton
              onPress={onAddPayment}
              buttonType={ActionButtonTypes.tertiary}
              text={t('buttons.addPaymentMethod')}
              style={[s.mb3]}
            />
          }
        />
      </View>
      <WarningModal
        title={t('warningModal.title')}
        description={t('payment.deleteCardInstructions')}
        visible={Boolean(cardToDelete)}
        primaryActionText={t('buttons.remove')}
        onPrimaryActionPressed={handleDeleteCard}
        secondaryActionText={t('buttons.cancel')}
        onSecondaryActionPressed={() => setCardToDelete('')}
      />
    </>
  );
};
