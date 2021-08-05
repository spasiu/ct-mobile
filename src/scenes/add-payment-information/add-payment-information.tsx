import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { WebView } from 'react-native-webview';

import { Loading } from '../../components';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { AddPaymentInformationProps } from './add-payment-information.props';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const sourceUri =
  (Platform.OS === 'android' ? 'file:///android_asset/' : '') +
  'Web.bundle/index.html';

export const AddPaymentInformation = ({
  onPaymentAdded,
}: AddPaymentInformationProps): JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { createCard } = useContext(PaymentContext) as PaymentContextType;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  return (
    <>
      {processing ? (
        <Loading />
      ) : (
        <WebView
          style={loaded ? [s.bg_transparent] : [s.flx_0, s.h_custom(0), s.o_0]}
          startInLoadingState
          onLoadEnd={() => setLoaded(true)}
          renderLoading={() => <Loading />}
          allowFileAccess={true}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          source={{ uri: sourceUri }}
          onMessage={event => {
            setProcessing(true);
            const eventData = JSON.parse(event.nativeEvent.data);
            if (eventData.token) {
              createCard(authUser as FirebaseAuthTypes.User, {
                singleUseToken: eventData.token,
              })
                .then(() => onPaymentAdded())
                .catch(() => setProcessing(false));
            } else {
              setProcessing(false);
            }
          }}
        />
      )}
    </>
  );
};
