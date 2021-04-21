import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../theme/colors';
import { t } from '../i18n/i18n';

import { ScheduleScreen } from '../scenes/schedule/schedule-screen';
import { HomeStack } from './stacks/home-stack';

import { ROUTES_IDS } from './routes/identifiers';

type TabNavigatorParamList = {
  [ROUTES_IDS.HOME_TAB]: undefined;
  [ROUTES_IDS.SCHEDULE_TAB]: undefined;
  [ROUTES_IDS.HITS_TAB]: undefined;
  [ROUTES_IDS.BREAKERS_TAB]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const homeIcon = require('../assets/home-icon.png');
const scheduleIcon = require('../assets/schedule-icon.png');
const hitsIcon = require('../assets/hits-icon.png');
const breakersIcon = require('../assets/breakers-icon.png');

export const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={ROUTES_IDS.HOME_TAB}
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <Image
            source={homeIcon}
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
            <Text style={[...labelStyle, s.f7]}>{t('tabBar.homeTab')}</Text>
          );
        },
      }}
    />
    <Tab.Screen
      name={ROUTES_IDS.SCHEDULE_TAB}
      component={ScheduleScreen}
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
      component={HomeStack}
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
      component={HomeStack}
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
