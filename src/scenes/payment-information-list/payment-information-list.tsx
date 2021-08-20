import React, { useContext, useState, useEffect } from 'react';
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
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { Card } from '../../common/payment';

import { PaymentInformationListProps } from './payment-information-list-screen.props';

export const PaymentInformationList = ({
  onAddPayment,
}: PaymentInformationListProps): JSX.Element => {
  const {
    cards,
    getCards,
    deleteCard,
    defaultPaymentMethod,
    saveDefaultPaymentMethod,
  } = useContext(PaymentContext) as PaymentContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardToDelete, setCardToDelete] = useState('');

  useEffect(() => {
    if (cards.length === 0) {
      setLoading(true);
      getCards(user as FirebaseAuthTypes.User);
      setSelectedCard(defaultPaymentMethod);
      setLoading(false);
    } else {
      setSelectedCard(defaultPaymentMethod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
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
            const isSelected = cardInfo.id === selectedCard;
            return (
              <SelectableRow
                rowStyle={[s.aic, s.pv0, s.mb3]}
                rowStatus={
                  isSelected
                    ? SelectableRowTypes.selected
                    : SelectableRowTypes.default
                }
                onPress={() => setSelectedCard(cardInfo.id)}
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
          isLoading={saving}
          onPress={async () => {
            setSaving(true);
            await saveDefaultPaymentMethod(
              user as FirebaseAuthTypes.User,
              selectedCard,
            );
            setSaving(false);
          }}
          buttonType={
            cards.length === 0
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
        onPrimaryActionPressed={() => {
          setCardToDelete('');
          setLoading(true);
          deleteCard(user as FirebaseAuthTypes.User, cardToDelete).then(() => {
            setLoading(false);
          });
        }}
        secondaryActionText={t('buttons.cancel')}
        onSecondaryActionPressed={() => setCardToDelete('')}
      />
    </>
  );
};
