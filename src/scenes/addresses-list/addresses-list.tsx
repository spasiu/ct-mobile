import React, { useContext, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import Emoji from 'node-emoji';
import { showMessage } from 'react-native-flash-message';
import { find, propEq } from 'ramda';

import {
  addressLineOneSelector,
  addressLineTwoSelector,
  addressCityAndStateOneLine,
  addressPostalCodeAndCountryOneLine,
  addressRecipientSelector,
  addressIsDefaultSelector,
} from '../../common/address/address-selectors';
import {
  SelectableRow,
  SelectableRowTypes,
  ActionFooter,
  ActionButton,
  ActionButtonTypes,
  Loading,
} from '../../components';
import { t } from '../../i18n/i18n';
import {
  Addresses,
  useUserAddressesQuery,
  useUpdateUserAddressMutation,
} from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { AddressesListProps } from './addresses-list-screen.props';
import { userAddressesSelector, userSelector } from '../../common/user-profile';

export const AddressesList = ({
  onEditAddress,
  onAddAddress,
}: AddressesListProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [selectedAddress, setSelectedAddress] = useState('');

  const { data } = useUserAddressesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const [updateUserAddressMutation, { loading }] = useUpdateUserAddressMutation(
    {
      onError: () =>
        showMessage({
          message: t('errors.generic'),
          type: 'danger',
        }),
    },
  );

  const user = userSelector(data);
  const addresses = userAddressesSelector(user);
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
                {t('payment.noShippingAddressSavedTitle')}
              </Text>
              <Text style={[s.ff_alt_r, s.f5, s.tc]}>
                {t('payment.noShippingAddressSavedDescription')}
              </Text>
            </View>
          )}
          data={addresses}
          contentContainerStyle={[s.ph3]}
          renderItem={({ item }) => {
            const address = item as Addresses;
            const isSelected = selectedAddress
              ? selectedAddress === address.id
              : addressIsDefaultSelector(address);
            const secondAddressLine = addressLineTwoSelector(address);
            return (
              <SelectableRow
                onPress={() => setSelectedAddress(address.id)}
                key={address.id}
                rowStyle={[s.mb3]}
                rowStatus={
                  isSelected
                    ? SelectableRowTypes.selected
                    : SelectableRowTypes.default
                }
                onActionPressed={() => onEditAddress({ address, addresses })}
                actionText={t('buttons.edit')}>
                <View style={[s.flx_i]}>
                  <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                    {addressRecipientSelector(address)}
                  </Text>
                  <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                    {addressLineOneSelector(address)}
                  </Text>
                  {secondAddressLine ? (
                    <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                      {addressLineTwoSelector(address)}
                    </Text>
                  ) : null}
                  <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                    {addressCityAndStateOneLine(address)}
                  </Text>
                  <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                    {addressPostalCodeAndCountryOneLine(address)}
                  </Text>
                </View>
              </SelectableRow>
            );
          }}
        />
      )}

      <View style={[s.mh3]}>
        <ActionFooter
          isLoading={loading}
          buttonText={t('buttons.save')}
          onPress={() => {
            const previousDefault = find(propEq('is_default', true))(
              addresses,
            ) as Addresses;

            updateUserAddressMutation({
              variables: {
                address: {
                  is_default: true,
                },
                addressId: {
                  id: selectedAddress,
                },
              },
            });

            updateUserAddressMutation({
              variables: {
                address: {
                  is_default: false,
                },
                addressId: {
                  id: previousDefault.id,
                },
              },
            });
          }}
          topElement={
            <ActionButton
              onPress={() =>
                onAddAddress({ shouldBeDefault: addresses.length === 0 })
              }
              buttonType={ActionButtonTypes.tertiary}
              text={t('buttons.addDeliveryAddress')}
              style={[s.mb3]}
            />
          }
        />
      </View>
    </>
  );
};
