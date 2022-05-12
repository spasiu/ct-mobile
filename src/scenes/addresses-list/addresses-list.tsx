import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
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
import { Addresses } from '../../services/api/requests';
import { AddressesListProps } from './addresses-list-screen.props';
import { useAddressListHook } from './addresses-list.logic';

export const AddressesList = ({
  onEditAddress,
  onAddAddress,
  onSave,
}: AddressesListProps): JSX.Element => {
  const {
    firstLoading,
    addresses,
    selectedAddress,
    setSelectedAddress,
    loading,
    updateAddress,
  } = useAddressListHook();
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
          onPress={() => updateAddress(onSave)}
          topElement={
            <ActionButton
              onPress={() => onAddAddress({ setId: setSelectedAddress })}
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
