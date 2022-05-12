import { useContext, useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import { find, propEq } from 'ramda';

import { t } from '../../i18n/i18n';
import {
  useUserAddressesQuery,
  useUpdateUserAddressMutation,
  Addresses,
} from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { useAddressListHookType } from './addresses-list-screen.props';
import { userAddressesSelector, userSelector } from '../../common/user-profile';

export const useAddressListHook = (): useAddressListHookType => {
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
    const defaultAddress = addresses.find(a => a.is_default);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const updateAddress = (onSave: () => void) => {
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
  };

  return {
    firstLoading,
    addresses,
    selectedAddress,
    setSelectedAddress,
    loading,
    updateAddress,
  };
};
