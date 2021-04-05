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
  TitleBar,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

const appleLogo = require('../../assets/apple-logo.png');
const googleLogo = require('../../assets/google-logo.png');

export const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType="scroll">
      <View style={[s.flx_i, s.jcfs, s.aic, s.mb4]}>
        <TitleBar
          title={t('account.welcomeBackTitle')}
          subtitle={t('account.welcomeBackSubtitle')}
        />
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
      <ActionFooter buttonText={t('buttons.login')}>
        <Text style={[s.ff_alt_r, s.f5, s.tc, s.black]}>
          {t('account.haveAccountInstructions')}
        </Text>
        <TextLink
          style={[s.ml1]}
          text={t('buttons.signUp')}
          onPress={() => navigation.navigate(ROUTES_IDS.SIGN_UP_SCREEN)}
        />
      </ActionFooter>
    </Container>
  );
};
