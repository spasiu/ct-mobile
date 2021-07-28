import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { Container, ContainerTypes, NavigationBar } from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';

import { AddressesListScreenProps } from './addresses-list-screen.props';
import { AddressesList } from './addresses-list';

export const AddressesListScreen = ({
  navigation,
}: AddressesListScreenProps): JSX.Element => {
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('addresses.deliveryAddress')}
      />
      <AddressesList
        onAddAddress={params =>
          navigation.navigate(ROUTES_IDS.ADD_ADDRESS_SCREEN, params)
        }
        onEditAddress={params =>
          navigation.navigate(ROUTES_IDS.EDIT_ADDRESS_SCREEN, params)
        }
      />
    </Container>
  );
};
