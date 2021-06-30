import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  ActionFooter,
  ActionButton,
  ActionButtonTypes,
  SelectableRow,
  SelectableRowTypes,
  Loading,
  WarningModal,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { Card } from '../../common/payment';

import { PaymentInformationListScreenProps } from './payment-information-list-screen.props';

const masterIcon = require('../../assets/mastercard-icon.png');

export const PaymentInformationListScreen = ({
  navigation,
}: PaymentInformationListScreenProps): JSX.Element => {
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
  const [selectedCard, setSelectedCard] = useState(defaultPaymentMethod);
  const [cardToDelete, setCardToDelete] = useState('');

  useEffect(() => {
    if (cards.length === 0) {
      setLoading(true);
      getCards(
        user as FirebaseAuthTypes.User,
        'b8c07a16-7e98-4d9f-a45d-b4254b590cf7',
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (defaultPaymentMethod !== selectedCard) {
        setSelectedCard(defaultPaymentMethod);
      }
    }, [defaultPaymentMethod, selectedCard]),
  );

  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('payment.paymentInformation')}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          ListEmptyComponent={() => (
            <View style={[s.jcc, s.aic, s.ma3]}>
              <Text style={[s.f4]}>😢</Text>
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
                rowStatus={
                  isSelected
                    ? SelectableRowTypes.selected
                    : SelectableRowTypes.default
                }
                onPress={() => setSelectedCard(cardInfo.id)}
                containerStyle={[s.mb3]}
                onActionPressed={() => {
                  setCardToDelete(cardInfo.id);
                }}
                actionText={t('buttons.remove')}>
                <View style={[s.flx_row, s.flx_i, s.aic]}>
                  <Image source={masterIcon} />
                  <Text style={[s.ff_alt_sb, s.f5, s.ml2]}>
                    {cardInfo.lastDigits}
                  </Text>
                </View>
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
              onPress={() =>
                navigation.navigate(ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN)
              }
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
    </Container>
  );
};
