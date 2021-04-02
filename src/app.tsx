import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import * as RNLocalize from 'react-native-localize';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import './theme/tachyons';
import { RootNavigator } from './navigators/root-navigator';
import { setI18nConfig } from './i18n/i18n';

// for performance optimizations and native feel
// https://reactnavigation.org/docs/react-native-screens
enableScreens();

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setI18nConfig();
    RNLocalize.addEventListener('change', setI18nConfig);
    setLoaded(true);
    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig);
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
