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

import './theme/tachyons';
import { RootNavigator } from './navigators/root-navigator';
import { setI18nConfig } from './i18n/i18n';
import { client } from './services/api/api';
import { AuthProvider } from './providers/auth';
import { NotificationProvider } from './providers/notification';
import { PaymentProvider } from './providers/payment';
import { FilterProvider } from './providers/filter';

import { loadSounds } from './utils/sound';
import { initLibraries } from './initializer';

// for performance optimizations and native feel
// https://reactnavigation.org/docs/react-native-screens
enableScreens();

const App = (): JSX.Element | null => {
  const [loaded, setLoaded] = useState<boolean>(false);

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

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AuthProvider>
          <FilterProvider>
            <NotificationProvider>
              <PaymentProvider>
                <RootNavigator />
              </PaymentProvider>
            </NotificationProvider>
          </FilterProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
