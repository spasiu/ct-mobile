import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { HomeScreen } from '../../scenes/home/home-screen';

import { UserProfileStack } from './user-profile-stack';

export type HomeStackParamList = {
  [ROUTES_IDS.HOME_SCREEN]: undefined;
  [ROUTES_IDS.SEARCH_SCREEN]: undefined;
  [ROUTES_IDS.USER_PROFILE_STACK]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={ROUTES_IDS.HOME_SCREEN} component={HomeScreen} />
    <Stack.Screen name={ROUTES_IDS.SEARCH_SCREEN} component={HomeScreen} />
    <Stack.Screen
      name={ROUTES_IDS.USER_PROFILE_STACK}
      component={UserProfileStack}
    />
  </Stack.Navigator>
);
