import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { WebView } from 'react-native-webview';
import { showMessage } from 'react-native-flash-message';
import { Loading } from '../../components';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { AddPaymentInformationProps } from './add-payment-information.props';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { t } from '../../i18n/i18n';
import Config from "react-native-config";

const sourceUri =
  (Platform.OS === 'android' ? 'file:///android_asset/' : '') +
  'Web.bundle/index.html';

  /* injectedJavaScriptBeforeContentLoaded is not Android compatible */
const INJECTED_JAVASCRIPT = `(function() {
  window.googleApiKey = "${Config.GOOGLE_PLACES_API_KEY}";
  window.paysafeSingleUseToken = "${Config.PAYSAFE_SINGLE_USE_TOKEN}";
  window.paysafeEnv = "${Config.PAYSAFE_ENV}";
  true;
  })();`;

export const AddPaymentInformation = ({
  onPaymentAdded,
}: AddPaymentInformationProps): JSX.Element => {
  const [status, setStatus] = useState('loading');

  const { createCard } = useContext(PaymentContext) as PaymentContextType;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  return (
    <>
      {status === 'processing' ? (
        <Loading />
      ) : (
        <WebView
          style={
            status === 'idle'
              ? [s.bg_transparent]
              : [s.flx_0, s.h_custom(0), s.o_0]
          }
          startInLoadingState
          onLoadEnd={() => setStatus('idle')}
          renderLoading={() => <Loading />}
          allowFileAccess={true}
          ref={(e) => (this.e = e)}
          injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          source={{ uri: sourceUri }}
          onMessage={event => {
            const eventData = JSON.parse(event.nativeEvent.data);
            if (eventData.initError) {
              showMessage({
                message: t('errors.generic'),
                type: 'danger',
              });
            } else {
              setStatus('processing');
              if (eventData.token) {
                createCard(authUser as FirebaseAuthTypes.User, {
                  singleUseToken: eventData.token,
                })
                  .then(() => onPaymentAdded())
                  .catch(() => setStatus('idle'));
              } else {
                setStatus('idle');
                showMessage({
                  message: eventData.error.detailedMessage,
                  type: 'danger',
                });
              }
            }
          }}
        />
      )}
    </>
  );
};
