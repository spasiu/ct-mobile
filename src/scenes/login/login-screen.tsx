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
  TitleBar,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { getFieldStatus } from '../../utils/form-field';

import {
  LOGIN_FORM_FIELDS,
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_FORM_SCHEMA,
  appleLogo,
  googleLogo,
} from './login-screen.presets';
import { LoginScreenProps } from './login-screen.props';

export const LoginScreen = ({ navigation }: LoginScreenProps): JSX.Element => {
  const height = Dimensions.get('window').height;
  const isShortScreen = height < 600;
  const { signInWithGoogle, signInWithApple, signInWithEmail } = useContext(
    AuthContext,
  ) as AuthContextType;

  const [activeField, setActiveField] = useState('');
  const [processing, setProcessing] = useState(false);
  const password = useRef<TextInput>(null);
  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.scroll}>
      <Formik
        validateOnBlur
        validationSchema={LOGIN_FORM_SCHEMA}
        initialValues={LOGIN_FORM_INITIAL_VALUES}
        onSubmit={values => {
          setProcessing(true);
          signInWithEmail(
            values[LOGIN_FORM_FIELDS.EMAIL],
            values[LOGIN_FORM_FIELDS.PASSWORD],
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
              <TitleBar
                title={isShortScreen ? null : t('account.welcomeBackTitle')}
                subtitle={isShortScreen ? null : t('account.welcomeBackSubtitle')}
                wrapperStyle={[s.w_100]}
              />
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
              <View style={[s.flx_row, s.aic, s.jcsb, s.w_100, isShortScreen ? s.mv3 : s.mv4]}>
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
                  onFocus={() => setActiveField(LOGIN_FORM_FIELDS.EMAIL)}
                  status={getFieldStatus(
                    LOGIN_FORM_FIELDS.EMAIL,
                    activeField,
                    errors,
                    touched,
                  )}
                  label={t('forms.emailLabel')}
                  onChangeText={handleChange(LOGIN_FORM_FIELDS.EMAIL)}
                  onBlur={event => {
                    handleBlur(LOGIN_FORM_FIELDS.EMAIL)(event);
                    setActiveField('');
                  }}
                  value={values[LOGIN_FORM_FIELDS.EMAIL]}
                  errorMessage={errors[LOGIN_FORM_FIELDS.EMAIL]}
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
                  onFocus={() => setActiveField(LOGIN_FORM_FIELDS.PASSWORD)}
                  status={getFieldStatus(
                    LOGIN_FORM_FIELDS.PASSWORD,
                    activeField,
                    errors,
                    touched,
                  )}
                  label={t('forms.passwordLabel')}
                  onChangeText={handleChange(LOGIN_FORM_FIELDS.PASSWORD)}
                  onBlur={event => {
                    handleBlur(LOGIN_FORM_FIELDS.PASSWORD)(event);
                    setActiveField('');
                  }}
                  value={values[LOGIN_FORM_FIELDS.PASSWORD]}
                  errorMessage={errors[LOGIN_FORM_FIELDS.PASSWORD]}
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                  containerStyle={[s.mb0]}
                />
                <TextLink
                  onPress={() =>
                    navigation.navigate(ROUTES_IDS.RESET_PASSWORD_SCREEN)
                  }
                  text={t('buttons.forgotPassword')}
                  textStyle={[s.ff_alt_sb, s.black, s.f6]}
                  style={[s.ml2]}
                />
              </View>
            </View>

            <ActionFooter
              isLoading={processing}
              buttonText={t('buttons.login')}
              onPress={handleSubmit}>
              <Text style={[s.ff_alt_r, s.f5, s.tc, s.black]}>
                {t('account.dontHaveAccountInstructions')}
              </Text>
              <TextLink
                style={[s.ml1]}
                textStyle={[s.underline]}
                text={t('buttons.signUp')}
                onPress={() => navigation.navigate(ROUTES_IDS.SIGN_UP_SCREEN)}
              />
            </ActionFooter>
          </>
        )}
      </Formik>
    </Container>
  );
};
