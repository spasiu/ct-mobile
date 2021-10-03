import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import Intercom from '@intercom/intercom-react-native';

import { LiveScreen } from '../../scenes/live/live-screen';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { ROUTES_IDS } from '../routes/identifiers';
import { TabNavigator } from '../tab-navigator';

import { OnboardingStack } from './onboarding-stack';
import { Platform } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type ProtectedStackParamList = {
  [ROUTES_IDS.ONBOARDING_STACK]: undefined;
  [ROUTES_IDS.TAB_NAVIGATOR]: undefined;
  [ROUTES_IDS.LIVE_MODAL]: {
    eventId: string;
  };
};

const Stack = createNativeStackNavigator<ProtectedStackParamList>();

export const ProtectedStack = (): JSX.Element => {
  const { onboardingComplete, user, getAuthToken } = useContext(
    AuthContext,
  ) as AuthContextType;
  const { getCards } = useContext(PaymentContext) as PaymentContextType;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user?.uid)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        if (Platform.OS === 'ios' && data?.intercomIOS) {
          Intercom.setUserHash(data.intercomIOS);
          Intercom.registerIdentifiedUser({
            email: user?.email as string,
            userId: user?.uid,
          });

          getAuthToken();
          unsubscribe();
        }

        if (Platform.OS === 'android' && data?.intercomAndroid) {
          Intercom.setUserHash(data.intercomAndroid);
          Intercom.registerIdentifiedUser({
            email: user?.email as string,
            userId: user?.uid,
          });

          getAuthToken();
          unsubscribe();
        }
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        Intercom.sendTokenToIntercom(token);
      });

    const unsubscribe = messaging().onTokenRefresh(token => {
      Intercom.sendTokenToIntercom(token);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getCards(user as FirebaseAuthTypes.User);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={
        onboardingComplete
          ? ROUTES_IDS.TAB_NAVIGATOR
          : ROUTES_IDS.ONBOARDING_STACK
      }
      screenOptions={{
        headerShown: false,
        stackPresentation: 'fullScreenModal',
      }}>
      {onboardingComplete ? (
        <Stack.Screen
          name={ROUTES_IDS.TAB_NAVIGATOR}
          component={TabNavigator}
        />
      ) : (
        <Stack.Screen
          name={ROUTES_IDS.ONBOARDING_STACK}
          component={OnboardingStack}
        />
      )}
      <Stack.Screen name={ROUTES_IDS.LIVE_MODAL} component={LiveScreen} />
    </Stack.Navigator>
  );
};
