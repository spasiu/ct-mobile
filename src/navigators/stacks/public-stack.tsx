import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { LandingScreen } from '../../scenes/landing/landing-screen';
import { SignUpScreen } from '../../scenes/sign-up/sign-up-screen';
import { LoginScreen } from '../../scenes/login/login-screen';
import { ResetPasswordScreen } from '../../scenes/reset-password/reset-password-screen';
import { ResetPasswordConfirmationScreen } from '../../scenes/reset-password-confirmation/reset-password-confirmation-screen';

export type PublicStackParamList = {
  [ROUTES_IDS.LOGIN_SCREEN]: undefined;
  [ROUTES_IDS.SIGN_UP_SCREEN]: undefined;
  [ROUTES_IDS.LANDING_SCREEN]: undefined;
  [ROUTES_IDS.RESET_PASSWORD_SCREEN]: undefined;
  [ROUTES_IDS.RESET_PASSWORD_CONFIRMATION_SCREEN]: {
    email: string;
  };
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicStack = (): JSX.Element => (
  <Stack.Navigator
    initialRouteName={ROUTES_IDS.LANDING_SCREEN}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={ROUTES_IDS.LANDING_SCREEN} component={LandingScreen} />
    <Stack.Screen name={ROUTES_IDS.LOGIN_SCREEN} component={LoginScreen} />
    <Stack.Screen name={ROUTES_IDS.SIGN_UP_SCREEN} component={SignUpScreen} />
    <Stack.Screen
      name={ROUTES_IDS.RESET_PASSWORD_SCREEN}
      component={ResetPasswordScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.RESET_PASSWORD_CONFIRMATION_SCREEN}
      component={ResetPasswordConfirmationScreen}
    />
  </Stack.Navigator>
);
