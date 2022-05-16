import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Formik } from 'formik';
import {
  Container,
  ContainerTypes,
  NavigationBar,
  TitleBar,
  FormInput,
  ActionFooter,
} from '../../components';
import { t } from '../../i18n/i18n';
import { getFieldStatus } from '../../utils/form-field';
import { ResetPasswordScreenProps } from './reset-password-screen.props';
import {
  RESET_PASSWORD_FORM_INITIAL_VALUES,
  RESET_PASSWORD_FORM_FIELDS,
  RESET_PASSWORD_FORM_SCHEMA,
} from './reset-password-screen.presets';
import { useResetPasswordScreenHook } from './reset-password-screen.logic';

export const ResetPasswordScreen = ({
  navigation,
}: ResetPasswordScreenProps): JSX.Element => {
  const { submit, activeField, setActiveField, processing } =
    useResetPasswordScreenHook(navigation);
  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.scroll}>
      <Formik
        validateOnBlur
        validationSchema={RESET_PASSWORD_FORM_SCHEMA}
        initialValues={RESET_PASSWORD_FORM_INITIAL_VALUES}
        onSubmit={async values => await submit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={[s.flx_i, s.jcfs, s.aic, s.mb4]}>
              <NavigationBar
                containerStyle={[s.ml0]}
                onBackPressed={() => navigation.goBack()}
              />
              <TitleBar
                wrapperStyle={[s.mt1]}
                title={t('resetPassword.title')}
                subtitle={t('resetPassword.instruction')}
              />
              <FormInput
                keyboardType="email-address"
                onFocus={() => setActiveField(RESET_PASSWORD_FORM_FIELDS.EMAIL)}
                status={getFieldStatus(
                  RESET_PASSWORD_FORM_FIELDS.EMAIL,
                  activeField,
                  errors,
                  touched,
                )}
                label={t('forms.emailLabel')}
                onChangeText={handleChange(RESET_PASSWORD_FORM_FIELDS.EMAIL)}
                onBlur={event => {
                  handleBlur(RESET_PASSWORD_FORM_FIELDS.EMAIL)(event);
                  setActiveField('');
                }}
                value={values[RESET_PASSWORD_FORM_FIELDS.EMAIL]}
                errorMessage={errors[RESET_PASSWORD_FORM_FIELDS.EMAIL]}
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
              />
            </View>
            <ActionFooter
              isLoading={processing}
              buttonText={t('buttons.resetPassword')}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Container>
  );
};
