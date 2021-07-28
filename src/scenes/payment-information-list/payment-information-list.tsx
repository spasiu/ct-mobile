import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Emoji from 'node-emoji';

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
      getCards(
        user as FirebaseAuthTypes.User,
        'b8c07a16-7e98-4d9f-a45d-b4254b590cf7',
      );
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
            <View style={[s.jcc, s.aic, s.ma3]}>
              <Text style={[s.f4]}>{Emoji.get('cry')}</Text>
              <Text style={[s.ff_b, s.f4, s.mv2]}>
                {t('payment.noPaymentSavedTitle')}
              </Text>
              <Text style={[s.ff_alt_r, s.f5, s.tc]}>
                {t('payment.noPaymentSavedDescription')}
              </Text>
            </View>
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
          deleteCard(
            user as FirebaseAuthTypes.User,
            'b8c07a16-7e98-4d9f-a45d-b4254b590cf7',
            cardToDelete,
          ).then(() => {
            setLoading(false);
          });
        }}
        secondaryActionText={t('buttons.cancel')}
        onSecondaryActionPressed={() => setCardToDelete('')}
      />
    </>
  );
};
