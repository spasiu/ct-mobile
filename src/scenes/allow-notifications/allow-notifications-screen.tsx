import React from 'react';
import { Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  TextLink,
  TitleBar,
  ActionFooter,
} from '../../components';
import { t } from '../../i18n/i18n';

const instructionImage = require('../../assets/instruction-one.png');

export const AllowNotificationsScreen = () => {
  return (
    <Container
      style={[s.flx_i, s.jcfe, s.aic]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.scroll}>
      <TitleBar
        title={t('onboarding.allowNotifications.title')}
        subtitle={t('onboarding.allowNotifications.subtitle')}
      />
      <Image style={[s.flx_i]} source={instructionImage} resizeMode="contain" />
      <ActionFooter buttonText={t('buttons.notifyMe')}>
        <TextLink style={[s.ml1]} text={t('buttons.noThanks')} />
      </ActionFooter>
    </Container>
  );
};
