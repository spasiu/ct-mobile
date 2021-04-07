import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../theme/colors';
import { t } from '../i18n/i18n';
import { ROUTES_IDS } from './routes/identifiers';

type TabNavigatorParamList = {
  [ROUTES_IDS.LIVE_TAB]: undefined;
  [ROUTES_IDS.SCHEDULE_TAB]: undefined;
  [ROUTES_IDS.HITS_TAB]: undefined;
  [ROUTES_IDS.BREAKERS_TAB]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const liveIcon = require('../assets/live-icon.png');
const scheduleIcon = require('../assets/schedule-icon.png');
const hitsIcon = require('../assets/hits-icon.png');
const breakersIcon = require('../assets/breakers-icon.png');

const GenericScreen = () => <View />;

export const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={ROUTES_IDS.LIVE_TAB}
      component={GenericScreen}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <Image
            source={liveIcon}
            style={[
              {
                width: size,
                height: size,
                tintColor: focused ? COLORS.secondary : COLORS.black_60,
              },
            ]}
          />
        ),
        tabBarLabel: ({ focused }) => {
          const labelStyle = focused
            ? [s.ff_alt_b, s.black]
            : [s.ff_alt_r, s.black_60];
          return (
            <Text style={[...labelStyle, s.f7]}>{t('tabBar.liveTab')}</Text>
          );
        },
      }}
    />
    <Tab.Screen
      name={ROUTES_IDS.SCHEDULE_TAB}
      component={GenericScreen}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <Image
            source={scheduleIcon}
            style={[
              {
                width: size,
                height: size,
                tintColor: focused ? COLORS.blue : COLORS.black_60,
              },
            ]}
          />
        ),
        tabBarLabel: ({ focused }) => {
          const labelStyle = focused
            ? [s.ff_alt_b, s.black]
            : [s.ff_alt_r, s.black_60];
          return (
            <Text style={[...labelStyle, s.f7]}>{t('tabBar.scheduleTab')}</Text>
          );
        },
      }}
    />
    <Tab.Screen
      name={ROUTES_IDS.HITS_TAB}
      component={GenericScreen}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <Image
            source={hitsIcon}
            style={[
              {
                width: size,
                height: size,
                tintColor: focused ? COLORS.primary : COLORS.black_60,
              },
            ]}
          />
        ),
        tabBarLabel: ({ focused }) => {
          const labelStyle = focused
            ? [s.ff_alt_b, s.black]
            : [s.ff_alt_r, s.black_60];
          return (
            <Text style={[...labelStyle, s.f7]}>{t('tabBar.hitsTab')}</Text>
          );
        },
      }}
    />
    <Tab.Screen
      name={ROUTES_IDS.BREAKERS_TAB}
      component={GenericScreen}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <Image
            source={breakersIcon}
            style={[
              {
                width: size,
                height: size,
                tintColor: focused ? COLORS.dark_blue : COLORS.black_60,
              },
            ]}
          />
        ),
        tabBarLabel: ({ focused }) => {
          const labelStyle = focused
            ? [s.ff_alt_b, s.black]
            : [s.ff_alt_r, s.black_60];
          return (
            <Text style={[...labelStyle, s.f7]}>{t('tabBar.breakersTab')}</Text>
          );
        },
      }}
    />
  </Tab.Navigator>
);
