import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import * as RNLocalize from 'react-native-localize';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import './theme/tachyons';
import { RootNavigator } from './navigators/root-navigator';
import { setI18nConfig } from './i18n/i18n';
import { getClient } from './services/api/api';
import { AuthProvider } from './providers/auth';
import { NotificationProvider } from './providers/notification';
import { PaymentProvider } from './providers/payment';
import { FilterProvider } from './providers/filter';
import { hasHasuraClaim } from './utils/hasura';
import { checkOnboardingStatusOnFirestore } from './services/firestore/onboarding';

import { loadSounds } from './utils/sound';
import { initLibraries } from './initializer';
import { UserProvider } from './providers/user';

// for performance optimizations and native feel
// https://reactnavigation.org/docs/react-native-screens
enableScreens();

const App = (): JSX.Element | null => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [token, setToken] = useState('');
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // concentrates all init functions
  useEffect(() => {
    setI18nConfig();
    RNLocalize.addEventListener('change', setI18nConfig);
    GoogleSignin.configure({ webClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID });
    Sentry.init({
      dsn: Config.SENTRY_DSN_URL,
    });

    initLibraries(setLoaded);
    loadSounds();

    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig);
    };
  }, []);

  // user auth handling
  useEffect(() => {
    if (loaded) {
      const authSubscriber = auth().onAuthStateChanged(
        async (authUser: FirebaseAuthTypes.User | null) => {
          if (authUser) {
            const authToken = await authUser.getIdToken();
            const idTokenResult = await authUser.getIdTokenResult();
            if (hasHasuraClaim(idTokenResult)) {
              setToken(authToken);
            }
          }

          const onboardingStatus = await checkOnboardingStatusOnFirestore(
            authUser,
          );

          setOnboardingComplete(onboardingStatus);
          setUser(authUser);

          if (initializing) {
            SplashScreen.hide();
            setInitializing(false);
          }
        },
      );
      return authSubscriber;
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  if (!loaded || initializing) {
    return null;
  }

  return (
    <ApolloProvider client={getClient(token)}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AuthProvider
          user={user}
          setToken={setToken}
          onboardingComplete={onboardingComplete}
          setOnboardingComplete={setOnboardingComplete}>
          <UserProvider>
            <FilterProvider>
              <NotificationProvider>
                <PaymentProvider>
                  <RootNavigator />
                </PaymentProvider>
              </NotificationProvider>
            </FilterProvider>
          </UserProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
