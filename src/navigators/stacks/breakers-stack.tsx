import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { BreakersScreen } from '../../scenes/breakers/breakers-screen';
import { BreakerScreen } from '../../scenes/breaker/breaker-screen';

type BreakersStackParamList = {
  [ROUTES_IDS.BREAKERS_SCREEN]: undefined;
  [ROUTES_IDS.BREAKER_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<BreakersStackParamList>();

export const BreakersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={ROUTES_IDS.BREAKERS_SCREEN}
      component={BreakersScreen}
    />
    <Stack.Screen name={ROUTES_IDS.BREAKER_SCREEN} component={BreakerScreen} />
  </Stack.Navigator>
);
