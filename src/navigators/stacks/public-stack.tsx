import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { LandingScreen } from '../../scenes/landing/landing-screen';
import { SignUpScreen } from '../../scenes/sign-up/sign-up-screen';
import { LoginScreen } from '../../scenes/login/login-screen';

type PublicStackParamList = {
  [ROUTES_IDS.LOGIN_SCREEN]: undefined;
  [ROUTES_IDS.SIGN_UP_SCREEN]: undefined;
  [ROUTES_IDS.LANDING_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicStack = () => (
  <Stack.Navigator
    initialRouteName={ROUTES_IDS.LANDING_SCREEN}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={ROUTES_IDS.LANDING_SCREEN} component={LandingScreen} />
    <Stack.Screen name={ROUTES_IDS.LOGIN_SCREEN} component={LoginScreen} />
    <Stack.Screen name={ROUTES_IDS.SIGN_UP_SCREEN} component={SignUpScreen} />
  </Stack.Navigator>
);
