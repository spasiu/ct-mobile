import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SplashScreen from 'react-native-splash-screen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';
import Intercom from '@intercom/intercom-react-native';

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
  const { user, setUser, checkOnboardingStatus } = useContext(
    AuthContext,
  ) as AuthContextType;
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(
      async (authUser: FirebaseAuthTypes.User | null) => {
        await checkOnboardingStatus(authUser);
        setUser(authUser);
        // Intercom.registerIdentifiedUser({
        //   email: authUser.email || '',
        //   userId: authUser.uid,
        // });
        Intercom.registerUnidentifiedUser();

        if (initializing) {
          SplashScreen.hide();
          setInitializing(false);
        }
      },
    );
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
