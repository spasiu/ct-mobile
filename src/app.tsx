import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import * as RNLocalize from 'react-native-localize';

import './styles/tachyons';
import { RootNavigator } from './navigators/root-navigator';
import { setI18nConfig } from './i18n/i18n';

// for performance optimizations and native feel
// https://reactnavigation.org/docs/react-native-screens
enableScreens();

const App = () => {
  useEffect(() => {
    setI18nConfig();
    RNLocalize.addEventListener('change', setI18nConfig);
    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig);
    };
  }, []);

  return <RootNavigator />;
};

export default App;
