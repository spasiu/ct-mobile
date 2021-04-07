import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { CompleteProfileScreen } from '../../scenes/complete-profile/complete-profile-screen';
import { OnboardingInstructionsScreen } from '../../scenes/onboarding-instructions/onboarding-instructions-screen';
import { OnboardingQuestionsScreen } from '../../scenes/onboarding-questions/onboarding-questions-screen';
import { AllowNotificationsScreen } from '../../scenes/allow-notifications/allow-notifications-screen';

type OnboardingStackParamList = {
  [ROUTES_IDS.COMPLETE_PROFILE_SCREEN]: undefined;
  [ROUTES_IDS.ONBOARDING_INSTRUCTIONS_SCREEN]: undefined;
  [ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN]: undefined;
  [ROUTES_IDS.ALLOW_NOTIFICATIONS_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

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
      name={ROUTES_IDS.ONBOARDING_INSTRUCTIONS_SCREEN}
      component={OnboardingInstructionsScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.ONBOARDING_QUESTIONS_SCREEN}
      component={OnboardingQuestionsScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.ALLOW_NOTIFICATIONS_SCREEN}
      component={AllowNotificationsScreen}
    />
  </Stack.Navigator>
);
