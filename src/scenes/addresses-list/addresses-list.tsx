import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
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
  EmptyState,
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
  onSave,
}: AddressesListProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [selectedAddress, setSelectedAddress] = useState('');

  const { data, loading: firstLoading } = useUserAddressesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const [updateUserAddressMutation, { loading }] = useUpdateUserAddressMutation(
    {
      onError: () =>
        showMessage({
          message: t('errors.could_not_set_default_address'),
          type: 'danger',
        }),
    },
  );

  const user = userSelector(data);
  const addresses = userAddressesSelector(user);

  useEffect(() => {
    const defaultAddress = addresses.find(a => a.is_default)
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id)
    }
  }, []);

  // when a user deletes an address, we can't be sure if what is on selectedAddress is correct
  // because user might have deleted the previous default address
  useEffect(() => {
    if (selectedAddress) {
      const selectedAddressExists = find(propEq('id', selectedAddress))(
        addresses,
      );

      if (!selectedAddressExists) {
        setSelectedAddress('');
      }
    }
  }, [selectedAddress, addresses]);
  return (
    <>
      {firstLoading ? (
        <Loading />
      ) : (
        <FlatList
          ListEmptyComponent={() => (
            <EmptyState
              title={t('payment.noShippingAddressSavedTitle')}
              description={t('payment.noShippingAddressSavedDescription')}
            />
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
          buttonType={
            !addresses.find(a => a.id === selectedAddress && a.is_default)
              ? ActionButtonTypes.primary
              : ActionButtonTypes.disabled
          }
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

            if (previousDefault) {
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
            }
            onSave();
          }}
          topElement={
            <ActionButton
              onPress={() => onAddAddress({ setId: setSelectedAddress })
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
