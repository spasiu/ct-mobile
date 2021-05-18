import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { BreakersScreen } from '../../scenes/breakers/breakers-screen';
import { BreakerDetailScreen } from '../../scenes/breaker-detail/breaker-detail-screen';
import { UserProfileScreen } from '../../scenes/user-profile/user-profile-screen';

type BreakersStackParamList = {
  [ROUTES_IDS.BREAKERS_SCREEN]: undefined;
  [ROUTES_IDS.BREAKER_DETAIL_SCREEN]: undefined;
  [ROUTES_IDS.USER_PROFILE_SCREEN]: undefined;
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
    <Stack.Screen
      name={ROUTES_IDS.BREAKER_DETAIL_SCREEN}
      component={BreakerDetailScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.USER_PROFILE_SCREEN}
      component={UserProfileScreen}
    />
  </Stack.Navigator>
);
