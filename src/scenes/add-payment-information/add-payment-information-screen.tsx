import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { Container, ContainerTypes, NavigationBar } from '../../components';
import { t } from '../../i18n/i18n';

import { AddPaymentInformationScreenProps } from './add-payment-information.props';
import { AddPaymentInformation } from './add-payment-information';

export const AddPaymentInformationScreen = ({
  navigation,
}: AddPaymentInformationScreenProps): JSX.Element => {
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('payment.paymentInformation')}
      />
      <AddPaymentInformation onPaymentAdded={() => navigation.goBack()} />
    </Container>
  );
};
