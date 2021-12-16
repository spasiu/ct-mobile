import { RTCView } from 'react-native-webrtc';
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { logoIcon } from '../live-screen.presets';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../theme/sizes';
import { Connection } from './connection';

interface VideoProps {
  streamName: string;
}

export const Video = ({ streamName }: VideoProps): JSX.Element => {
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  useEffect(() => {
    const connection = new Connection(streamName);

    connection.onActive = (url: string) => {
      console.log('Connected to stream');
      setStreamUrl(url);
    };

    connection.onInactive = () => {
      setStreamUrl(null);
    };

    connection.onError = (error: Error) => {
      console.log('Error connecting to stream', error);
    };

    if (streamName) {
      connection.connect();
    }

    return () => connection.close(true);
  }, [streamName]);

  return (
    <View style={[s.flx_i, s.jcc, s.aic, s.absolute_fill]}>
      {streamUrl ? (
        <RTCView
          style={[s.flx_i, s.jcc, s.aic, s.absolute_fill]}
          streamURL={streamUrl}
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
