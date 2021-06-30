import React, { useState, useRef, useContext } from 'react';
import { View, TextInput } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Formik } from 'formik';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  ActionFooter,
  FormInput,
} from '../../components';
import { t } from '../../i18n/i18n';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { getFieldData } from '../../utils/form-field';

import {
  PAYMENT_FORM_FIELDS,
  PAYMENT_FORM_SCHEMA,
  PAYMENT_FORM_INITIAL_VALUES,
} from './add-payment-information.presets';
import { AddPaymentInformationScreenProps } from './add-payment-information.props';
import { AuthContext, AuthContextType } from '../../providers/auth';

export const AddPaymentInformationScreen = ({
  navigation,
}: AddPaymentInformationScreenProps): JSX.Element => {
  const { createCard } = useContext(PaymentContext) as PaymentContextType;
  const { user } = useContext(AuthContext) as AuthContextType;

  const [activeField, setActiveField] = useState('');
  const [processing, setProcessing] = useState(false);

  const expMonth = useRef<TextInput>(null);
  const expYear = useRef<TextInput>(null);
  const nameOnCard = useRef<TextInput>(null);
  const firstAddressLine = useRef<TextInput>(null);
  const secondAddressLine = useRef<TextInput>(null);
  const city = useRef<TextInput>(null);
  const state = useRef<TextInput>(null);
  const postalCode = useRef<TextInput>(null);
  const country = useRef<TextInput>(null);
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('payment.paymentInformation')}
      />
      <Formik
        validateOnBlur
        validationSchema={PAYMENT_FORM_SCHEMA}
        initialValues={PAYMENT_FORM_INITIAL_VALUES}
        onSubmit={async values => {
          setProcessing(true);
          const success = await createCard(user as FirebaseAuthTypes.User, {
            ...values,
            profileId: 'b8c07a16-7e98-4d9f-a45d-b4254b590cf7',
          });
          setProcessing(false);
          if (success) {
            navigation.goBack();
          }
        }}>
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
                {...getFieldData(
                  PAYMENT_FORM_FIELDS.CREDIT_CARD_NUMBER,
                  activeField,
                  errors,
                  touched,
                  values,
                )}
                keyboardType={'numeric'}
                onFocus={() =>
                  setActiveField(PAYMENT_FORM_FIELDS.CREDIT_CARD_NUMBER)
                }
                onChangeText={handleChange(
                  PAYMENT_FORM_FIELDS.CREDIT_CARD_NUMBER,
                )}
                onBlur={event => {
                  handleBlur(PAYMENT_FORM_FIELDS.CREDIT_CARD_NUMBER)(event);
                  setActiveField('');
                }}
                placeholder={t('forms.creditCardNumberLabel')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (expMonth.current) {
                    expMonth.current.focus();
                  }
                }}
              />
              <View style={[s.flx_row]}>
                <FormInput
                  ref={expMonth}
                  {...getFieldData(
                    PAYMENT_FORM_FIELDS.CARD_EXPIRY_MONTH,
                    activeField,
                    errors,
                    touched,
                    values,
                  )}
                  keyboardType={'numeric'}
                  containerStyle={[s.mr2]}
                  onFocus={() =>
                    setActiveField(PAYMENT_FORM_FIELDS.CARD_EXPIRY_MONTH)
                  }
                  onChangeText={handleChange(
                    PAYMENT_FORM_FIELDS.CARD_EXPIRY_MONTH,
                  )}
                  onBlur={event => {
                    handleBlur(PAYMENT_FORM_FIELDS.CARD_EXPIRY_MONTH)(event);
                    setActiveField('');
                  }}
                  placeholder={t('forms.expirationMonth')}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (expYear.current) {
                      expYear.current.focus();
                    }
                  }}
                />
                <FormInput
                  ref={expYear}
                  {...getFieldData(
                    PAYMENT_FORM_FIELDS.CARD_EXPIRY_YEAR,
                    activeField,
                    errors,
                    touched,
                    values,
                  )}
                  keyboardType={'numeric'}
                  containerStyle={[s.ml2]}
                  onFocus={() =>
                    setActiveField(PAYMENT_FORM_FIELDS.CARD_EXPIRY_YEAR)
                  }
                  onChangeText={handleChange(
                    PAYMENT_FORM_FIELDS.CARD_EXPIRY_YEAR,
                  )}
                  onBlur={event => {
                    handleBlur(PAYMENT_FORM_FIELDS.CARD_EXPIRY_YEAR)(event);
                    setActiveField('');
                  }}
                  placeholder={t('forms.expirationYear')}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (nameOnCard.current) {
                      nameOnCard.current.focus();
                    }
                  }}
                />
              </View>
              <FormInput
                ref={nameOnCard}
                {...getFieldData(
                  PAYMENT_FORM_FIELDS.HOLDER_NAME,
                  activeField,
                  errors,
                  touched,
                  values,
                )}
                onFocus={() => setActiveField(PAYMENT_FORM_FIELDS.HOLDER_NAME)}
                onChangeText={handleChange(PAYMENT_FORM_FIELDS.HOLDER_NAME)}
                onBlur={event => {
                  handleBlur(PAYMENT_FORM_FIELDS.HOLDER_NAME)(event);
                  setActiveField('');
                }}
                placeholder={t('forms.nameOnCard')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (firstAddressLine.current) {
                    firstAddressLine.current.focus();
                  }
                }}
              />
              <FormInput
                ref={firstAddressLine}
                {...getFieldData(
                  PAYMENT_FORM_FIELDS.ADDRESS_FIRST_LINE,
                  activeField,
                  errors,
                  touched,
                  values,
                )}
                onFocus={() =>
                  setActiveField(PAYMENT_FORM_FIELDS.ADDRESS_FIRST_LINE)
                }
                onChangeText={handleChange(
                  PAYMENT_FORM_FIELDS.ADDRESS_FIRST_LINE,
                )}
                onBlur={event => {
                  handleBlur(PAYMENT_FORM_FIELDS.ADDRESS_FIRST_LINE)(event);
                  setActiveField('');
                }}
                placeholder={t('forms.addressLine1Label')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (secondAddressLine.current) {
                    secondAddressLine.current.focus();
                  }
                }}
              />
              <FormInput
                ref={secondAddressLine}
                {...getFieldData(
                  PAYMENT_FORM_FIELDS.ADDRESS_SECOND_LINE,
                  activeField,
                  errors,
                  touched,
                  values,
                )}
                onFocus={() =>
                  setActiveField(PAYMENT_FORM_FIELDS.ADDRESS_SECOND_LINE)
                }
                onChangeText={handleChange(
                  PAYMENT_FORM_FIELDS.ADDRESS_SECOND_LINE,
                )}
                onBlur={event => {
                  handleBlur(PAYMENT_FORM_FIELDS.ADDRESS_SECOND_LINE)(event);
                  setActiveField('');
                }}
                placeholder={t('forms.addressLine2Label')}
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
                  {...getFieldData(
                    PAYMENT_FORM_FIELDS.CITY,
                    activeField,
                    errors,
                    touched,
                    values,
                  )}
                  containerStyle={[s.mr2]}
                  onFocus={() => setActiveField(PAYMENT_FORM_FIELDS.CITY)}
                  onChangeText={handleChange(PAYMENT_FORM_FIELDS.CITY)}
                  onBlur={event => {
                    handleBlur(PAYMENT_FORM_FIELDS.CITY)(event);
                    setActiveField('');
                  }}
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
                  {...getFieldData(
                    PAYMENT_FORM_FIELDS.STATE_PROVINCE_REGION,
                    activeField,
                    errors,
                    touched,
                    values,
                  )}
                  containerStyle={[s.ml2]}
                  onFocus={() =>
                    setActiveField(PAYMENT_FORM_FIELDS.STATE_PROVINCE_REGION)
                  }
                  onChangeText={handleChange(
                    PAYMENT_FORM_FIELDS.STATE_PROVINCE_REGION,
                  )}
                  onBlur={event => {
                    handleBlur(PAYMENT_FORM_FIELDS.STATE_PROVINCE_REGION)(
                      event,
                    );
                    setActiveField('');
                  }}
                  placeholder={t('forms.stateLabel')}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (postalCode.current) {
                      postalCode.current.focus();
                    }
                  }}
                />
              </View>
              <View style={[s.flx_row]}>
                <FormInput
                  ref={postalCode}
                  {...getFieldData(
                    PAYMENT_FORM_FIELDS.POSTAL_CODE,
                    activeField,
                    errors,
                    touched,
                    values,
                  )}
                  containerStyle={[s.mr2]}
                  onFocus={() =>
                    setActiveField(PAYMENT_FORM_FIELDS.POSTAL_CODE)
                  }
                  onChangeText={handleChange(PAYMENT_FORM_FIELDS.POSTAL_CODE)}
                  onBlur={event => {
                    handleBlur(PAYMENT_FORM_FIELDS.POSTAL_CODE)(event);
                    setActiveField('');
                  }}
                  placeholder={t('forms.postalCodeLabel')}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (country.current) {
                      country.current.focus();
                    }
                  }}
                />
                <FormInput
                  ref={country}
                  {...getFieldData(
                    PAYMENT_FORM_FIELDS.COUNTRY,
                    activeField,
                    errors,
                    touched,
                    values,
                  )}
                  containerStyle={[s.ml2]}
                  onFocus={() => setActiveField(PAYMENT_FORM_FIELDS.COUNTRY)}
                  onChangeText={handleChange(PAYMENT_FORM_FIELDS.COUNTRY)}
                  onBlur={event => {
                    handleBlur(PAYMENT_FORM_FIELDS.COUNTRY)(event);
                    setActiveField('');
                  }}
                  placeholder={t('forms.countryLabel')}
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </KeyboardAwareScrollView>
            <View style={[s.mh3]}>
              <ActionFooter
                onPress={handleSubmit}
                isLoading={processing}
                buttonText={t('buttons.save')}
              />
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
};
