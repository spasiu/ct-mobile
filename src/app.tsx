import React from 'react';
import { enableScreens } from 'react-native-screens';

import { RootNavigator } from './navigators/root-navigator';

// for performance optimizations and native feel
// https://reactnavigation.org/docs/react-native-screens
enableScreens();

const App = () => <RootNavigator />;

export default App;
