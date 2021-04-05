import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ActionFooter,
  TextLink,
  ActionButton,
  FormInput,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

const logo = require('../../assets/candt-logo.png');
const appleLogo = require('../../assets/apple-logo.png');
const googleLogo = require('../../assets/google-logo.png');

export const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType="scroll">
      <View style={[s.flx_i, s.jcfs, s.aic, s.mb4]}>
        <View style={[s.w_100, s.mv4, s.aic]}>
          <Text style={[s.ff_b, s.f4, s.woodsmoke]}>
            {t('account.welcomeText')}
          </Text>
          <Image
            style={[s.h3, s.w4, s.mv3]}
            resizeMode="contain"
            source={logo}
          />
          <Text style={[s.ff_alt_r, s.f6, s.woodsmoke]}>
            {t('account.welcomeAdvisory')}
          </Text>
        </View>
        <ActionButton
          style={[s.bg_white, s.ba, s.b__woodsmoke]}
          textStyle={[s.woodsmoke]}
          text={t('buttons.appleSignUp')}>
          <Image source={appleLogo} style={[s.mr3]} />
        </ActionButton>
        <ActionButton
          style={[s.bg_white, s.ba, s.b__mercury, s.mt3]}
          textStyle={[s.woodsmoke]}
          text={t('buttons.googleSignUp')}>
          <Image source={googleLogo} style={[s.mr3]} />
        </ActionButton>
        <View style={[s.flx_row, s.aic, s.jcsb, s.w_100, s.mv4]}>
          <View style={[s.flx_ratio(0.45), s.h_1px, s.bg_iron]} />
          <Text style={[s.tc, s.ff_alt_r, s.f6, s.iron]}>
            {t('account.separatorText').toUpperCase()}
          </Text>
          <View style={[s.flx_ratio(0.45), s.h_1px, s.bg_iron]} />
        </View>
        <View style={[s.flx_i, s.w_100, s.jcfs]}>
          <FormInput label={t('forms.emailLabel')} />
          <FormInput label={t('forms.passwordLabel')} />
        </View>
      </View>
      <ActionFooter buttonText={t('buttons.signUp')}>
        <Text style={[s.ff_alt_r, s.f5, s.tc, s.black]}>
          {t('account.haveAccountInstructions')}
        </Text>
        <TextLink
          style={[s.ml1]}
          text={t('buttons.login')}
          onPress={() => navigation.navigate(ROUTES_IDS.LOGIN_SCREEN)}
        />
      </ActionFooter>
    </Container>
  );
};
