import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { BreakersScreen } from '../../scenes/breakers/breakers-screen';
import { BreakerDetailScreen } from '../../scenes/breaker-detail/breaker-detail-screen';

import { UserProfileStack } from './user-profile-stack';
import { BreakerProfiles } from '../../services/api/requests';

export type BreakersStackParamList = {
  [ROUTES_IDS.BREAKERS_SCREEN]: undefined;
  [ROUTES_IDS.BREAKER_DETAIL_SCREEN]: {
    id: string;
    breaker: Partial<BreakerProfiles>;
    startOnEventsView?: boolean;
  };
  [ROUTES_IDS.USER_PROFILE_STACK]: undefined;
};

const Stack = createNativeStackNavigator<BreakersStackParamList>();

export const BreakersStack = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={ROUTES_IDS.BREAKERS_SCREEN}
      component={BreakersScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.BREAKER_DETAIL_SCREEN}
      component={BreakerDetailScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.USER_PROFILE_STACK}
      component={UserProfileStack}
    />
  </Stack.Navigator>
);
