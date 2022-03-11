import { AudioSession, RTCView } from './webrtc';
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { logoIcon } from '../live-screen.presets';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../theme/sizes';
import { Connection } from './connection';
import IdleTimerManager from 'react-native-idle-timer';

interface VideoProps {
  streamName?: string;
}

export const Video = ({ streamName }: VideoProps): JSX.Element => {
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  useEffect(() => {
    if (streamName) {
      const connection = new Connection(streamName);

      connection.onActive = (url: string) => {
        console.log('Connected to stream');
        AudioSession.setViewerOnlyMode()
          .then(() => setStreamUrl(url))
          .catch((error: Error) => {
            console.error(`Unable to set viewer only mode ${error}.`);
            setStreamUrl(url);
          });
      };

      connection.onInactive = () => {
        setStreamUrl(null);
      };

      connection.onError = (error: Error) => {
        console.log('Error connecting to stream', error);
      };

      connection.connect();

      return () => connection.close(true);
    }

    return;
  }, [streamName]);

  useEffect(() => {
    IdleTimerManager.setIdleTimerDisabled(true);
    return () => IdleTimerManager.setIdleTimerDisabled(false);
  }, []);

  return (
    <View style={[s.absolute_fill]}>
      {streamUrl ? (
        <RTCView
          style={[s.absolute_fill]}
          streamURL={streamUrl}
          objectFit={'cover'}
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
