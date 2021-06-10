import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { HitsScreen } from '../../scenes/hits/hits-screen';

import { UserProfileStack } from './user-profile-stack';

export type HitsStackParamList = {
  [ROUTES_IDS.HITS_SCREEN]: undefined;
  [ROUTES_IDS.USER_PROFILE_STACK]: undefined;
};

const Stack = createNativeStackNavigator<HitsStackParamList>();

export const HitsStack = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={ROUTES_IDS.HITS_SCREEN} component={HitsScreen} />
    <Stack.Screen
      name={ROUTES_IDS.USER_PROFILE_STACK}
      component={UserProfileStack}
    />
  </Stack.Navigator>
);
