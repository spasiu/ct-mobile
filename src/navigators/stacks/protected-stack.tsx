import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import { ROUTES_IDS } from '../routes/identifiers';

type ProtectedStackParamList = {
  [ROUTES_IDS.LIVE_TAB]: undefined;
  [ROUTES_IDS.SCHEDULE_TAB]: undefined;
  [ROUTES_IDS.HITS_TAB]: undefined;
  [ROUTES_IDS.BREAKERS_TAB]: undefined;
};

const Tab = createBottomTabNavigator<ProtectedStackParamList>();

const GenericScreen = () => <View />;

export const ProtectedStack = () => (
  <Tab.Navigator>
    <Tab.Screen name={ROUTES_IDS.LIVE_TAB} component={GenericScreen} />
    <Tab.Screen name={ROUTES_IDS.SCHEDULE_TAB} component={GenericScreen} />
    <Tab.Screen name={ROUTES_IDS.HITS_TAB} component={GenericScreen} />
    <Tab.Screen name={ROUTES_IDS.BREAKERS_TAB} component={GenericScreen} />
  </Tab.Navigator>
);
