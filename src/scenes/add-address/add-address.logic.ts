import { useState, useRef, useContext } from 'react';
import { TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { t } from '../../i18n/i18n';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  useInsertUserAddressMutation,
  UserAddressesDocument,
  LoggedUserDocument,
  InsertUserAddressMutation,
} from '../../services/api/requests';
import { PredictionType } from '../../services/places-api';
import {
  AddAddressProps,
  submitType,
  useAddAddressHookType,
} from './add-address-screen.props';

export const useAddAddressHook = ({
  onAddressAdded,
  setId,
}: AddAddressProps): useAddAddressHookType => {
  const [activeField, setActiveField] = useState('');
  const [addressPredictions, setAddressPredictions] = useState<
    PredictionType[]
  >([]);

  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [insertUserAddressMutation, { loading }] = useInsertUserAddressMutation(
    {
      onError: () =>
        showMessage({
          message: t('errors.could_not_add_address'),
          type: 'danger',
        }),
      onCompleted: (address: InsertUserAddressMutation) => {
        setId(address?.insert_Addresses_one?.id);
        return onAddressAdded();
      },
      refetchQueries: [
        {
          query: UserAddressesDocument,
          variables: {
            id: authUser?.uid,
          },
        },
        {
          query: LoggedUserDocument,
          variables: {
            id: authUser?.uid,
          },
        },
      ],
      awaitRefetchQueries: true,
    },
  );

  const lastName = useRef<TextInput>(null);
  const firstAddressLine = useRef<TextInput>(null);
  const secondAddressLine = useRef<TextInput>(null);
  const city = useRef<TextInput>(null);
  const state = useRef<TextInput>(null);
  const postalCode = useRef<TextInput>(null);
  const submit = (values: submitType) => {
    values.country === 'CA' || values.country === 'US'
      ? insertUserAddressMutation({
          variables: {
            address: {
              ...values,
              is_default: false,
              user_id: authUser?.uid,
            },
          },
        })
      : showMessage({
          message: t('errors.only_us_or_ca_address'),
          type: 'danger',
        });
  };
  return {
    submit,
    activeField,
    setActiveField,
    lastName,
    firstAddressLine,
    secondAddressLine,
    addressPredictions,
    setAddressPredictions,
    state,
    postalCode,
    city,
    loading,
  };
};
