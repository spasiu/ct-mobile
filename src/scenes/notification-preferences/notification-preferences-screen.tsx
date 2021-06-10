import React from 'react';
import { ScrollView, Switch, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  RowLink,
} from '../../components';
import { t } from '../../i18n/i18n';

export const NotificationPreferencesScreen = ({ navigation, route }) => {
  const { notificationPreferences } = route.params;
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('notificationPreferences.title')}
      />
      <ScrollView contentContainerStyle={[s.ph3]}>
        <RowLink
          text={t('notificationPreferences.enableNotifications')}
          showArrow={false}
          enabled={false}
          containerStyle={[s.mb4]}
          rightElementContainerStyle={[s.aic]}
          rightElement={<Switch />}
        />
        <Text style={[s.ff_alt_sb, s.f5, s.mt3, s.mb4]}>
          {t('notificationPreferences.notifictionTypesSection')}
        </Text>
        <RowLink
          text={t('notificationPreferences.notificationTypes.followedBreakers')}
          showArrow={false}
          enabled={false}
          containerStyle={[s.mb3]}
          rightElementContainerStyle={[s.aic]}
          rightElement={<Switch />}
        />
        <RowLink
          text={t('notificationPreferences.notificationTypes.followedEvents')}
          showArrow={false}
          enabled={false}
          containerStyle={[s.mb3]}
          rightElementContainerStyle={[s.aic]}
          rightElement={<Switch />}
        />
        <RowLink
          text={t('notificationPreferences.notificationTypes.followedBreaks')}
          showArrow={false}
          enabled={false}
          containerStyle={[s.mb3]}
          rightElementContainerStyle={[s.aic]}
          rightElement={<Switch />}
        />
        <RowLink
          text={t('notificationPreferences.notificationTypes.newPersonalHits')}
          showArrow={false}
          enabled={false}
          containerStyle={[s.mb3]}
          rightElementContainerStyle={[s.aic]}
          rightElement={<Switch />}
        />
        <RowLink
          text={t('notificationPreferences.notificationTypes.supportMessages')}
          showArrow={false}
          enabled={false}
          containerStyle={[s.mb3]}
          rightElementContainerStyle={[s.aic]}
          rightElement={<Switch />}
        />
        <RowLink
          text={t('notificationPreferences.notificationTypes.announcements')}
          showArrow={false}
          enabled={false}
          containerStyle={[s.mb3]}
          rightElementContainerStyle={[s.aic]}
          rightElement={<Switch />}
        />
      </ScrollView>
    </Container>
  );
};
