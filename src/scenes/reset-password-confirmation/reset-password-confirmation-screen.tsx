import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  TitleBar,
  ActionFooter,
  FormInput,
  FormInputStatusTypes,
} from '../../components';
import { t } from '../../i18n/i18n';

import { ResetPasswordConfirmationScreenProps } from './reset-password-confirmation-screen.props';

export const ResetPasswordConfirmationScreen = ({
  navigation,
  route,
}: ResetPasswordConfirmationScreenProps): JSX.Element => {
  const { email } = route.params;
  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.scroll}>
      <View style={[s.flx_i, s.jcfs, s.aic, s.mb4]}>
        <NavigationBar
          containerStyle={[s.ml0]}
          onBackPressed={() => navigation.goBack()}
        />
        <TitleBar
          wrapperStyle={[s.mt1]}
          title={t('resetPassword.confirmationTitle')}
          subtitle={t('resetPassword.confirmationInstruction')}
        />
        <FormInput
          keyboardType="email-address"
          status={FormInputStatusTypes.disabled}
          label={t('forms.emailLabel')}
          value={email}
        />
      </View>
      <ActionFooter
        buttonText={t('buttons.backToLogin')}
        onPress={() => navigation.pop(2)}
      />
    </Container>
  );
};
