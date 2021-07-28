import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { Container, ContainerTypes, NavigationBar } from '../../components';
import { t } from '../../i18n/i18n';

import { AddAddressListScreenProps } from './add-address-screen.props';
import { AddAddress } from './add-address';

export const AddAddressScreen = ({
  navigation,
  route,
}: AddAddressListScreenProps): JSX.Element => {
  const { shouldBeDefault } = route.params;

  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('addresses.deliveryAddress')}
      />
      <AddAddress
        shouldBeDefault={shouldBeDefault}
        onAddressAdded={() => navigation.goBack()}
      />
    </Container>
  );
};
