import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Formik } from 'formik';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  TextLink,
  ActionFooter,
  FormInput,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { getFieldStatus } from '../../utils/form-field';

import {
  ADDRESS_FORM_SCHEMA,
  ADDRESS_FORM_FIELDS,
} from './edit-address-screen.presets';

export const EditAddressScreen = ({ navigation, route }) => {
  const { address } = route.params;
  const [activeField, setActiveField] = useState('');
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
        <Formik
          validateOnBlur
          validationSchema={ADDRESS_FORM_SCHEMA}
          initialValues={address}
          onSubmit={values => {}}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <FormInput
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.RECIPIENT)}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.RECIPIENT,
                  activeField,
                  errors,
                  touched,
                )}
                onChangeText={handleChange(ADDRESS_FORM_FIELDS.RECIPIENT)}
                onBlur={event => {
                  handleBlur(ADDRESS_FORM_FIELDS.RECIPIENT)(event);
                  setActiveField('');
                }}
                value={values[ADDRESS_FORM_FIELDS.RECIPIENT]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.RECIPIENT]}
                placeholder={t('forms.recipientLabel')}
              />
              <FormInput
                onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.FIRST_LINE)}
                status={getFieldStatus(
                  ADDRESS_FORM_FIELDS.FIRST_LINE,
                  activeField,
                  errors,
                  touched,
                )}
                onChangeText={handleChange(ADDRESS_FORM_FIELDS.FIRST_LINE)}
                onBlur={event => {
                  handleBlur(ADDRESS_FORM_FIELDS.FIRST_LINE)(event);
                  setActiveField('');
                }}
                value={values[ADDRESS_FORM_FIELDS.FIRST_LINE]}
                errorMessage={errors[ADDRESS_FORM_FIELDS.FIRST_LINE]}
                placeholder={t('forms.addressLine1Label')}
              />
              <FormInput
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
              />
              <View style={[s.flx_row]}>
                <FormInput
                  containerStyle={[s.mr2]}
                  showLabel={false}
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
                />
                <FormInput
                  containerStyle={[s.ml2]}
                  showLabel={false}
                  onFocus={() =>
                    setActiveField(ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION)
                  }
                  status={getFieldStatus(
                    ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION,
                    activeField,
                    errors,
                    touched,
                  )}
                  onChangeText={handleChange(
                    ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION,
                  )}
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
                />
              </View>
              <View style={[s.flx_row]}>
                <FormInput
                  containerStyle={[s.mr2]}
                  onFocus={() =>
                    setActiveField(ADDRESS_FORM_FIELDS.POSTAL_CODE)
                  }
                  status={getFieldStatus(
                    ADDRESS_FORM_FIELDS.POSTAL_CODE,
                    activeField,
                    errors,
                    touched,
                  )}
                  onChangeText={handleChange(ADDRESS_FORM_FIELDS.POSTAL_CODE)}
                  onBlur={event => {
                    handleBlur(ADDRESS_FORM_FIELDS.POSTAL_CODE)(event);
                    setActiveField('');
                  }}
                  value={values[ADDRESS_FORM_FIELDS.POSTAL_CODE]}
                  errorMessage={errors[ADDRESS_FORM_FIELDS.POSTAL_CODE]}
                  placeholder={t('forms.postalCodeLabel')}
                />
                <FormInput
                  containerStyle={[s.ml2]}
                  onFocus={() => setActiveField(ADDRESS_FORM_FIELDS.COUNTRY)}
                  status={getFieldStatus(
                    ADDRESS_FORM_FIELDS.COUNTRY,
                    activeField,
                    errors,
                    touched,
                  )}
                  onChangeText={handleChange(ADDRESS_FORM_FIELDS.COUNTRY)}
                  onBlur={event => {
                    handleBlur(ADDRESS_FORM_FIELDS.FIRST_LINE)(event);
                    setActiveField('');
                  }}
                  value={values[ADDRESS_FORM_FIELDS.COUNTRY]}
                  errorMessage={errors[ADDRESS_FORM_FIELDS.COUNTRY]}
                  placeholder={t('forms.countryLabel')}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <View style={[s.mh3]}>
        <ActionFooter buttonText={t('buttons.saveAddress')}>
          <TextLink
            style={[s.mb3]}
            text={t('buttons.deleteAddress')}
            onPress={() => {}}
          />
        </ActionFooter>
      </View>
    </Container>
  );
};
