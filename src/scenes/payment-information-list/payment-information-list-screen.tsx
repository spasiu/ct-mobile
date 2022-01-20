import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { Container, ContainerTypes, NavigationBar } from '../../components';
import { t } from '../../i18n/i18n';

import { PaymentInformationListScreenProps } from './payment-information-list-screen.props';
import { PaymentInformationList } from './payment-information-list';
import { ROUTES_IDS } from '../../navigators';

export const PaymentInformationListScreen = ({
  navigation,
}: PaymentInformationListScreenProps): JSX.Element => {
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('payment.paymentInformation')}
      />
      <PaymentInformationList
        goBack={navigation.goBack}
        onAddPayment={() =>
          navigation.navigate(ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN)
        }
      />
    </Container>
  );
};
