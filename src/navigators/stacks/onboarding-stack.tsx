import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { View } from 'react-native';

import { ROUTES_IDS } from '../routes/identifiers';
import { CompleteProfileScreen } from '../../scenes/complete-profile/complete-profile-screen';

type OnboardingStackParamList = {
  [ROUTES_IDS.COMPLETE_PROFILE_SCREEN]: undefined;
  [ROUTES_IDS.INSTRUCTIONS_SCREEN]: undefined;
  [ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN]: undefined;
  [ROUTES_IDS.ALLOW_NOTIFICATIONS_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const GenericScreen = () => <View />;

export const OnboardingStack = () => (
  <Stack.Navigator
    initialRouteName={ROUTES_IDS.COMPLETE_PROFILE_SCREEN}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={ROUTES_IDS.COMPLETE_PROFILE_SCREEN}
      component={CompleteProfileScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.INSTRUCTIONS_SCREEN}
      component={GenericScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN}
      component={GenericScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.ALLOW_NOTIFICATIONS_SCREEN}
      component={GenericScreen}
    />
  </Stack.Navigator>
);
