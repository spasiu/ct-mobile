import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { Container, ContainerTypes, NavigationBar } from '../../components';
import { t } from '../../i18n/i18n';

import { EditAddressScreenProps } from './edit-address-screen.props';
import { EditAddress } from './edit-address';

export const EditAddressScreen = ({
  navigation,
  route,
}: EditAddressScreenProps): JSX.Element => {
  const { address, addresses } = route.params;

  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('addresses.deliveryAddress')}
      />
      <EditAddress
        address={address}
        addresses={addresses}
        onAddressEdited={() => navigation.goBack()}
      />
    </Container>
  );
};
