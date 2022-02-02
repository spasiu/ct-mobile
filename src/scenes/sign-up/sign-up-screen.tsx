import React, { useContext, useState, useRef } from 'react';
import { View, Text, Image, TextInput, Dimensions } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Formik } from 'formik';

import {
  Container,
  ContainerTypes,
  ActionFooter,
  TextLink,
  ActionButton,
  FormInput,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { getFieldStatus } from '../../utils/form-field';

import {
  SIGN_UP_FORM_FIELDS,
  SIGN_UP_FORM_INITIAL_VALUES,
  SIGN_UP_FORM_SCHEMA,
  logo,
  appleLogo,
  googleLogo,
} from './sign-up-screen.presets';
import { SignUpScreenProps } from './sign-up-screen.props';
import { isShortScreen, screenHeight } from '../device-properties';

export const SignUpScreen = ({
  navigation,
}: SignUpScreenProps): JSX.Element => {

  const { signInWithGoogle, signInWithApple, signUpWithEmail } = useContext(
    AuthContext,
  ) as AuthContextType;

  const [activeField, setActiveField] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const password = useRef<TextInput>(null);

  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.scroll}>
      <Formik
        validateOnBlur
        validationSchema={SIGN_UP_FORM_SCHEMA}
        initialValues={SIGN_UP_FORM_INITIAL_VALUES}
        onSubmit={values => {
          setProcessing(true);
          signUpWithEmail(
            values[SIGN_UP_FORM_FIELDS.EMAIL],
            values[SIGN_UP_FORM_FIELDS.PASSWORD],
          );
          setProcessing(false);
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
            <View style={[s.flx_i, s.jcfs, s.aic]}>
              <View style={[s.w_100, isShortScreen ? s.mv1 : s.mv4, s.aic]}>
                <Text style={[s.ff_b, s.f4, s.black]}>
                  {t('account.welcomeText')}
                </Text>
                <Image
                  style={[
                    s.mv2,
                    {height: screenHeight / 15}
                  ]}
                  resizeMode="contain"
                  source={logo}
                />
                <Text style={[s.ff_alt_r, s.f6, s.black]}>
                  {t('account.welcomeAdvisory')}
                </Text>
              </View>
              <ActionButton
                onPress={() => signInWithApple()}
                style={[s.bg_white, s.ba, s.b__black]}
                textStyle={[s.black]}
                text={t('buttons.appleSignUp')}>
                <Image source={appleLogo} style={[s.mr3]} />
              </ActionButton>
              <ActionButton
                onPress={() => signInWithGoogle()}
                style={[s.bg_white, s.ba, s.b__black_10, s.mt3]}
                textStyle={[s.black]}
                text={t('buttons.googleSignUp')}>
                <Image source={googleLogo} style={[s.mr3]} />
              </ActionButton>
              <View style={[s.flx_row, s.aic, s.jcsb, s.w_100, isShortScreen ? s.mv1 : s.mv4]}>
                <View
                  style={[s.flx_ratio(0.45), s.h_custom(1), s.bg_black_40]}
                />
                <Text style={[s.tc, s.ff_alt_r, s.f6, s.black_40]}>
                  {t('account.separatorText').toUpperCase()}
                </Text>
                <View
                  style={[s.flx_ratio(0.45), s.h_custom(1), s.bg_black_40]}
                />
              </View>
              <View style={[s.flx_i, s.w_100, s.jcfs]}>
                <FormInput
                  keyboardType="email-address"
                  onFocus={() => setActiveField(SIGN_UP_FORM_FIELDS.EMAIL)}
                  value={values[SIGN_UP_FORM_FIELDS.EMAIL]}
                  status={getFieldStatus(
                    SIGN_UP_FORM_FIELDS.EMAIL,
                    activeField,
                    errors,
                    touched,
                  )}
                  label={t('forms.emailLabel')}
                  onBlur={event => {
                    handleBlur(SIGN_UP_FORM_FIELDS.EMAIL)(event);
                    setActiveField('');
                  }}
                  onChangeText={handleChange(SIGN_UP_FORM_FIELDS.EMAIL)}
                  errorMessage={errors[SIGN_UP_FORM_FIELDS.EMAIL]}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (password.current) {
                      password.current.focus();
                    }
                  }}
                />
                <FormInput
                  ref={password}
                  secureTextEntry
                  onFocus={() => setActiveField(SIGN_UP_FORM_FIELDS.PASSWORD)}
                  value={values[SIGN_UP_FORM_FIELDS.PASSWORD]}
                  status={getFieldStatus(
                    SIGN_UP_FORM_FIELDS.PASSWORD,
                    activeField,
                    errors,
                    touched,
                  )}
                  label={t('forms.passwordLabel')}
                  onBlur={event => {
                    handleBlur(SIGN_UP_FORM_FIELDS.PASSWORD)(event);
                    setActiveField('');
                  }}
                  onChangeText={handleChange(SIGN_UP_FORM_FIELDS.PASSWORD)}
                  errorMessage={errors[SIGN_UP_FORM_FIELDS.PASSWORD]}
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </View>
            <ActionFooter
              isLoading={processing}
              onPress={handleSubmit}
              buttonText={t('buttons.signUp')}>
              <Text style={[s.ff_alt_r, s.f5, s.tc, s.black]}>
                {t('account.haveAccountInstructions')}
              </Text>
              <TextLink
                style={[s.ml1]}
                textStyle={[s.underline]}
                text={t('buttons.login')}
                onPress={() => navigation.navigate(ROUTES_IDS.LOGIN_SCREEN)}
              />
            </ActionFooter>
          </>
        )}
      </Formik>
    </Container>
  );
};
