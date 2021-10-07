import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import FlashMessage from 'react-native-flash-message';

import { AuthContext, AuthContextType } from '../providers/auth';

import { ProtectedStack } from './stacks/protected-stack';
import { PublicStack } from './stacks/public-stack';
import { ROUTES_IDS } from './routes/identifiers';

export type RootStackParamList = {
  [ROUTES_IDS.PUBLIC_STACK]?: undefined;
  [ROUTES_IDS.PROTECTED_STACK]?: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = (): JSX.Element => {
  const { user, checkOnboardingStatus } = useContext(
    AuthContext,
  ) as AuthContextType;

  useEffect(() => {
    checkOnboardingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
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
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';
