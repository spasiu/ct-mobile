import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SplashScreen from 'react-native-splash-screen';

import { ProtectedStack } from './stacks/protected-stack';
import { PublicStack } from './stacks/public-stack';
import { ROUTES_IDS } from './routes/identifiers';

type RootStackParamList = {
  [ROUTES_IDS.PUBLIC_STACK]?: undefined;
  [ROUTES_IDS.PROTECTED_STACK]?: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const isLoggedIn = true;

export const RootNavigator = () => {
  SplashScreen.hide();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name={ROUTES_IDS.PROTECTED_STACK}
            component={ProtectedStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name={ROUTES_IDS.PUBLIC_STACK}
            component={PublicStack}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';
