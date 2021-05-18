import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { HitsScreen } from '../../scenes/hits/hits-screen';
import { UserProfileScreen } from '../../scenes/user-profile/user-profile-screen';

type HitsStackParamList = {
  [ROUTES_IDS.HITS_SCREEN]: undefined;
  [ROUTES_IDS.USER_PROFILE_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<HitsStackParamList>();

export const HitsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={ROUTES_IDS.HITS_SCREEN} component={HitsScreen} />
    <Stack.Screen
      name={ROUTES_IDS.USER_PROFILE_SCREEN}
      component={UserProfileScreen}
    />
  </Stack.Navigator>
);
