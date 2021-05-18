import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { Container, NavigationBar } from '../../components';
import { t } from '../../i18n/i18n';

export const UserProfileScreen = ({ navigation }) => (
  <Container style={[s.mh0]} containerType="scroll">
    <NavigationBar
      onBackPressed={() => navigation.goBack()}
      title={t('profile.title')}
    />
  </Container>
);
