import React, { useState, useRef, useContext } from 'react';
import { View, TextInput } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';
import { findIndex, head, omit, propEq, remove } from 'ramda';

import {
  ADDRESS_FORM_SCHEMA,
  ADDRESS_FORM_FIELDS,
} from '../../common/address/address-form';
import {
  TextLink,
  ActionFooter,
  FormInput,
  WarningModal,
  CountryInput,
  AddressPredictionList,
} from '../../components';
import { t } from '../../i18n/i18n';
import { getFieldStatus } from '../../utils/form-field';
import { getPredictions, PredictionType } from '../../services/places-api';
import { addressIsDefaultSelector } from '../../common/address/address-selectors';
import {
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
  LoggedUserDocument,
  Addresses,
} from '../../services/api/requests';

import { AuthContext, AuthContextType } from '../../providers/auth';

import { EditAddressProp } from './edit-address-screen.props';

export const EditAddress = ({
  address,
  addresses,
  onAddressEdited,
}: EditAddressProp): JSX.Element => {
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
          message: t('errors.generic'),
          type: 'danger',
        }),
      onCompleted: onAddressEdited,
      refetchQueries: [
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

  const [
    deleteUserAddressMutation,
    { loading: deleting },
  ] = useDeleteUserAddressMutation({
    variables: {
      addressId: address.id,
    },
    onError: () =>
      showMessage({
        message: t('errors.generic'),
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
        query: LoggedUserDocument,
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
  return (
    <>
      <Formik
        validateOnBlur
        validationSchema={ADDRESS_FORM_SCHEMA}
        initialValues={{
          ...address,
          [ADDRESS_FORM_FIELDS.SECOND_LINE]:
            address[ADDRESS_FORM_FIELDS.SECOND_LINE] || '',
        }}
        onSubmit={values =>
          updateUserAddressMutation({
            variables: {
              address: omit(['__typename'], values),
              addressId: {
                id: address.id,
              },
            },
          })
        }>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <KeyboardAwareScrollView contentContainerStyle={[s.ph3]}>
              <FormInput
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.FIRST_NAME)}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.FIRST_NAME,
                  activeField,
                  errors,
                  touched,
                )}
                onChangeText={handleChange(ADDRESS_FORM_FIELDS.FIRST_NAME)}
                onBlur={event => {
                  handleBlur(ADDRESS_FORM_FIELDS.FIRST_NAME)(event);
                  setActiveField('');
                }}
                value={values[ADDRESS_FORM_FIELDS.FIRST_NAME]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.FIRST_NAME]}
                placeholder={t('forms.firstNameLabel')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (lastName.current) {
                    lastName.current.focus();
                  }
                }}
              />
              <FormInput
                ref={lastName}
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.LAST_NAME)}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.LAST_NAME,
                  activeField,
                  errors,
                  touched,
                )}
                onChangeText={handleChange(ADDRESS_FORM_FIELDS.LAST_NAME)}
                onBlur={event => {
                  handleBlur(ADDRESS_FORM_FIELDS.LAST_NAME)(event);
                  setActiveField('');
                }}
                value={values[ADDRESS_FORM_FIELDS.LAST_NAME]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.LAST_NAME]}
                placeholder={t('forms.lastNameLabel')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (firstAddressLine.current) {
                    firstAddressLine.current.focus();
                  }
                }}
              />
              <CountryInput
                value={values[ADDRESS_FORM_FIELDS.COUNTRY]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.COUNTRY]}
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.COUNTRY)}
                onBlur={() => {
                  setActiveField('');
                }}
                onSelected={countryCode => {
                  handleChange(ADDRESS_FORM_FIELDS.COUNTRY)(countryCode);
                }}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.COUNTRY,
                  activeField,
                  errors,
                  touched,
                )}
              />
              <FormInput
                ref={firstAddressLine}
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.FIRST_LINE)}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.FIRST_LINE,
                  activeField,
                  errors,
                  touched,
                )}
                onChangeText={async text => {
                  handleChange(ADDRESS_FORM_FIELDS.FIRST_LINE)(text);
                  const predictions = await getPredictions(
                    text,
                    values[ADDRESS_FORM_FIELDS.COUNTRY],
                  );
                  setAddressPredictions(predictions);
                }}
                onBlur={event => {
                  handleBlur(ADDRESS_FORM_FIELDS.FIRST_LINE)(event);
                  setActiveField('');
                }}
                value={values[ADDRESS_FORM_FIELDS.FIRST_LINE]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.FIRST_LINE]}
                placeholder={t('forms.addressLine1Label')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (secondAddressLine.current) {
                    secondAddressLine.current.focus();
                  }
                }}
              />
              {addressPredictions.length !== 0 && (
                <AddressPredictionList
                  addressPredictions={addressPredictions}
                  onItemPressed={suggestion => {
                    const addressFirstLine =
                      suggestion[ADDRESS_FORM_FIELDS.FIRST_LINE];
                    handleChange(ADDRESS_FORM_FIELDS.FIRST_LINE)(
                      addressFirstLine,
                    );

                    const addressCity = suggestion[ADDRESS_FORM_FIELDS.CITY];
                    handleChange(ADDRESS_FORM_FIELDS.CITY)(addressCity);

                    const addressState =
                      suggestion[ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION];
                    handleChange(ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION)(
                      addressState,
                    );

                    setAddressPredictions([]);
                  }}
                />
              )}
              <FormInput
                ref={secondAddressLine}
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.SECOND_LINE)}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.SECOND_LINE,
                  activeField,
                  errors,
                  touched,
                )}
                onChangeText={handleChange(ADDRESS_FORM_FIELDS.SECOND_LINE)}
                onBlur={event => {
                  handleBlur(ADDRESS_FORM_FIELDS.SECOND_LINE)(event);
                  setActiveField('');
                }}
                value={values[ADDRESS_FORM_FIELDS.SECOND_LINE]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.SECOND_LINE]}
                placeholder={t('forms.addressLine2Label')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (city.current) {
                    city.current.focus();
                  }
                }}
              />
              <FormInput
                ref={postalCode}
                containerStyle={[s.mr2]}
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.POSTAL_CODE)}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.POSTAL_CODE,
                  activeField,
                  errors,
                  touched,
                )}
                onChangeText={text =>
                  handleChange(ADDRESS_FORM_FIELDS.POSTAL_CODE)(
                    text.replace(/[^a-z0-9]/gi, '').toUpperCase(),
                  )
                }
                onBlur={event => {
                  handleBlur(ADDRESS_FORM_FIELDS.POSTAL_CODE)(event);
                  setActiveField('');
                }}
                value={values[ADDRESS_FORM_FIELDS.POSTAL_CODE]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.POSTAL_CODE]}
                placeholder={t('forms.postalCodeLabel')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (city.current) {
                    city.current.focus();
                  }
                }}
              />
              <View style={[s.flx_row]}>
                <FormInput
                  ref={city}
                  containerStyle={[s.mr2, s.flx_i]}
                  onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.CITY)}
                  status={getFieldStatus(
                    ADDRESS_FORM_FIELDS.CITY,
                    activeField,
                    errors,
                    touched,
                  )}
                  onChangeText={handleChange(ADDRESS_FORM_FIELDS.CITY)}
                  onBlur={event => {
                    handleBlur(ADDRESS_FORM_FIELDS.CITY)(event);
                    setActiveField('');
                  }}
                  value={values[ADDRESS_FORM_FIELDS.CITY]}
                  errorMessage={errors[ADDRESS_FORM_FIELDS.CITY]}
                  placeholder={t('forms.cityLabel')}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (state.current) {
                      state.current.focus();
                    }
                  }}
                />
                <FormInput
                  ref={state}
                  containerStyle={[s.ml2, s.flx_i]}
                  onFocus={() =>
                    setActiveField(ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION)
                  }
                  status={getFieldStatus(
                    ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION,
                    activeField,
                    errors,
                    touched,
                  )}
                  onChangeText={text =>
                    handleChange(ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION)(
                      text.toUpperCase(),
                    )
                  }
                  onBlur={event => {
                    handleBlur(ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION)(
                      event,
                    );
                    setActiveField('');
                  }}
                  value={values[ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION]}
                  errorMessage={
                    errors[ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION]
                  }
                  placeholder={t('forms.stateLabel')}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (postalCode.current) {
                      postalCode.current.focus();
                    }
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
            <View style={[s.mh3]}>
              <ActionFooter
                buttonText={t('buttons.saveAddress')}
                isLoading={loading}
                onPress={handleSubmit}>
                <TextLink
                  style={[s.mb3]}
                  text={t('buttons.deleteAddress')}
                  onPress={() => setDeleteAddress(true)}
                />
              </ActionFooter>
            </View>
          </>
        )}
      </Formik>
      <WarningModal
        title={t('warningModal.title')}
        description={t('addresses.deleteAddressInstruction')}
        visible={Boolean(deleteAddress)}
        primaryActionText={t('buttons.deleteAddress')}
        onPrimaryActionPressed={() => deleteUserAddressMutation()}
        secondaryActionText={t('buttons.cancel')}
        onSecondaryActionPressed={() => setDeleteAddress(false)}
        loadingPrimaryAction={deleting}
      />
    </>
  );
};
