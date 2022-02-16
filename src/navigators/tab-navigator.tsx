import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../theme/colors';
import { t } from '../i18n/i18n';

import { ScheduleStack } from './stacks/schedule-stack';
import { HitsStack } from './stacks/hits-stack';
import { HomeStack } from './stacks/home-stack';
import { BreakersStack } from './stacks/breakers-stack';

import { ROUTES_IDS } from './routes/identifiers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FilterContext, FilterContextType } from '../providers/filter';

export type TabNavigatorParamList = {
  [ROUTES_IDS.HOME_TAB]: undefined;
  [ROUTES_IDS.SCHEDULE_TAB]:
    | {
        screen?: string;
        initial?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params?: any;
      }
    | undefined;
  [ROUTES_IDS.HITS_TAB]: undefined;
  [ROUTES_IDS.BREAKERS_TAB]:
    | {
        screen?: string;
        initial?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params?: any;
      }
    | undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const homeIcon = require('../assets/home-icon.png');
const scheduleIcon = require('../assets/schedule-icon.png');
const hitsIcon = require('../assets/hits-icon.png');
const breakersIcon = require('../assets/breakers-icon.png');

const {
  setItemTypeFilter,
  cleanFilters
} = useContext(FilterContext) as FilterContextType;

export const TabNavigator = (): JSX.Element => (
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
      component={ScheduleStack}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <TouchableOpacity onPress={() => {
            setItemTypeFilter('Events');
            cleanFilters();
          }}>
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
          </TouchableOpacity>
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
      component={HitsStack}
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
      component={BreakersStack}
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
