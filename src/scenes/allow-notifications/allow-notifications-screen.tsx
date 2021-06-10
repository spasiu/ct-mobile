import React, { useContext, useState } from 'react';
import { Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  TextLink,
  TitleBar,
  ActionFooter,
  WarningModal,
} from '../../components';
import { t } from '../../i18n/i18n';
import {
  NotificationContext,
  NotificationContextType,
} from '../../providers/notification';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { instructionImage } from './allow-notifications-screen.presets';

export const AllowNotificationsScreen = (): JSX.Element => {
  const { requestNotificationPermission } = useContext(
    NotificationContext,
  ) as NotificationContextType;
  const { setOnboardingStatusComplete } = useContext(
    AuthContext,
  ) as AuthContextType;

  const [warningModalVisible, setWarningModalVisible] = useState(false);
  return (
    <Container
      style={[s.flx_i, s.jcfe, s.aic]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.scroll}>
      <TitleBar
        title={t('onboarding.allowNotifications.title')}
        subtitle={t('onboarding.allowNotifications.subtitle')}
        wrapperStyle={[s.w_100]}
      />
      <Image style={[s.flx_i]} source={instructionImage} resizeMode="contain" />
      <ActionFooter
        buttonText={t('buttons.notifyMe')}
        onPress={async () => {
          await requestNotificationPermission();
          setOnboardingStatusComplete();
        }}>
        <TextLink
          style={[s.ml1]}
          text={t('buttons.noThanks')}
          onPress={() => setWarningModalVisible(true)}
        />
      </ActionFooter>
      <WarningModal
        visible={warningModalVisible}
        title={t('onboarding.allowNotifications.warningTitle')}
        description={t('onboarding.allowNotifications.warningMessage')}
        primaryActionText={t('buttons.enableNotifications')}
        onPrimaryActionPressed={async () => {
          await requestNotificationPermission();
          setOnboardingStatusComplete();
        }}
        secondaryActionText={t('onboarding.allowNotifications.continueToHome')}
        onSecondaryActionPressed={() => setOnboardingStatusComplete()}
      />
    </Container>
  );
};
