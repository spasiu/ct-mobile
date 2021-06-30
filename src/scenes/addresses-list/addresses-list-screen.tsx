import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  addressLineOneSelector,
  addressLineTwoSelector,
  addressCityAndStateOneLine,
  addressPostalCodeAndCountryOneLine,
} from '../../common/address/address-selectors';
import {
  Container,
  ContainerTypes,
  NavigationBar,
  SelectableRow,
  SelectableRowTypes,
  ActionFooter,
  ActionButton,
  ActionButtonTypes,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { Addresses } from '../../services/api/requests';
import { indexedMap } from '../../utils/ramda';

import { AddressesListScreenProps } from './addresses-list-screen.props';

export const AddressesListScreen = ({
  navigation,
  route,
}: AddressesListScreenProps): JSX.Element => {
  const { addresses, recipient } = route.params;
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('addresses.deliveryAddress')}
      />
      <ScrollView contentContainerStyle={[s.ph3]}>
        {indexedMap(userAddress => {
          const address = userAddress as Addresses;
          return (
            <SelectableRow
              key={address.id}
              containerStyle={[s.mb3]}
              rowStatus={SelectableRowTypes.default}
              onActionPressed={() =>
                navigation.navigate(ROUTES_IDS.EDIT_ADDRESS_SCREEN, {
                  address: {
                    ...address,
                    recipient,
                  },
                })
              }
              actionText={t('buttons.edit')}>
              <View style={[s.flx_i]}>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>{recipient}</Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                  {addressLineOneSelector(address)}
                </Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                  {addressLineTwoSelector(address)}
                </Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                  {addressCityAndStateOneLine(address)}
                </Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                  {addressPostalCodeAndCountryOneLine(address)}
                </Text>
              </View>
            </SelectableRow>
          );
        }, addresses)}
      </ScrollView>
      <View style={[s.mh3]}>
        <ActionFooter
          buttonText={t('buttons.save')}
          topElement={
            <ActionButton
              buttonType={ActionButtonTypes.tertiary}
              text={t('buttons.addDeliveryAddress')}
              style={[s.mb3]}
            />
          }
        />
      </View>
    </Container>
  );
};
