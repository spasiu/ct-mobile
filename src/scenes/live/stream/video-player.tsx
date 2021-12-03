import { RTCView } from 'react-native-webrtc';
import { showMessage } from 'react-native-flash-message';
import React, { useLayoutEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { styles } from 'react-native-style-tachyons';
import { logoIcon } from '../live-screen.presets';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../theme/sizes';
import { connect } from './connection';

type VideoPlayerProps = {
  streamName: string;
};

export const VideoPlayer = ({ streamName }: VideoPlayerProps): JSX.Element => {
  const [streamURL, setStreamURL] = useState<string | null>(null);
  const s = styles;

  useLayoutEffect(() => {
    connect(streamName).then(connection => {
      connection.onActive(setStreamURL);
      connection.onInactive(() => setStreamURL(null));
      connection.onError((error: Error) => {
        console.error(`connection error ${error}`);
        showMessage({
          message: error.message,
          type: 'warning',
        });
      });
      connection.onClose(() => setStreamURL(null));
    });
  }, [streamName]);

  return (
    <View style={[s.flx_i, s.jcc, s.aic, s.absolute_fill]}>
      {streamURL ? (
        <RTCView
          style={[
            s.flx_i,
            s.jcc,
            s.aic,
            s.absolute_fill,
            { backgroundColor: 'black' },
          ]}
          streamURL={streamURL}
        />
      ) : (
        <View
          style={[
            s.absolute,
            { top: WINDOW_HEIGHT / 3, right: WINDOW_WIDTH / 3 },
          ]}>
          <Image source={logoIcon} />
        </View>
      )}
    </View>
  );
};
