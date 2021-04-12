import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { TabNavigator } from '../tab-navigator';
import { OnboardingStack } from './onboarding-stack';

type ProtectedStackParamList = {
  [ROUTES_IDS.ONBOARDING_STACK]: undefined;
  [ROUTES_IDS.TAB_NAVIGATOR]: undefined;
};

const Stack = createNativeStackNavigator<ProtectedStackParamList>();
const isProfileComplete = true;

export const ProtectedStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {isProfileComplete ? (
      <Stack.Screen name={ROUTES_IDS.TAB_NAVIGATOR} component={TabNavigator} />
    ) : (
      <Stack.Screen
        name={ROUTES_IDS.ONBOARDING_STACK}
        component={OnboardingStack}
      />
    )}
  </Stack.Navigator>
);
