import { addressIsDefaultSelector } from '../../common/address/address-selectors';
import { t } from 'i18n-js';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { findIndex, propEq, head, remove } from 'ramda';
import { useContext, useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
  useUpdateUserAddressMutation,
  UserAddressesDocument,
  useDeleteUserAddressMutation,
  Addresses,
} from '../../services/api/requests';
import { PredictionType } from '../../services/places-api';
import {
  EditAddressProp,
  useEditAddressHookType,
} from './edit-address-screen.props';

export const useEditAddressHook = ({
  address,
  addresses,
  onAddressEdited,
}: EditAddressProp): useEditAddressHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [activeField, setActiveField] = useState('');
  const [addressPredictions, setAddressPredictions] = useState<
    PredictionType[]
  >([]);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [updateUserAddressMutation, { loading }] = useUpdateUserAddressMutation(
    {
      onError: () =>
        showMessage({
          message: t('errors.could_not_update_address'),
          type: 'danger',
        }),
      onCompleted: () => onAddressEdited(),
      refetchQueries: [
        {
          query: UserAddressesDocument,
          variables: {
            id: authUser?.uid,
          },
        },
      ],
      awaitRefetchQueries: true,
    },
  );
  const [deleteUserAddressMutation, { loading: deleting }] =
    useDeleteUserAddressMutation({
      variables: {
        addressId: address.id,
      },
      onError: () =>
        showMessage({
          message: t('errors.could_not_delete_address'),
          type: 'danger',
        }),
      onCompleted: () => {
        if (addresses.length > 1 && addressIsDefaultSelector(address)) {
          const addressIndex = findIndex(propEq('id', address.id), addresses);
          const newDefaultAddress = head(
            remove(addressIndex, 1, addresses),
          ) as Addresses;
          updateUserAddressMutation({
            variables: {
              address: {
                is_default: true,
              },
              addressId: {
                id: newDefaultAddress.id,
              },
            },
          });
        } else {
          onAddressEdited();
        }
      },
      refetchQueries: [
        {
          query: UserAddressesDocument,
          variables: {
            id: authUser?.uid,
          },
        },
      ],
      awaitRefetchQueries: true,
    });
  const lastName = useRef<TextInput>(null);
  const firstAddressLine = useRef<TextInput>(null);
  const secondAddressLine = useRef<TextInput>(null);
  const city = useRef<TextInput>(null);
  const state = useRef<TextInput>(null);
  const postalCode = useRef<TextInput>(null);

  return {
    updateUserAddressMutation,
    activeField,
    setActiveField,
    firstAddressLine,
    secondAddressLine,
    addressPredictions,
    setAddressPredictions,
    lastName,
    city,
    postalCode,
    state,
    deleteAddress,
    setDeleteAddress,
    deleteUserAddressMutation,
    deleting,
    loading,
  };
};
