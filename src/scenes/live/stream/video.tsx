import {
  EventOnAddStream,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
} from 'react-native-webrtc';
import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { logoIcon } from '../live-screen.presets';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../theme/sizes';
import Config from 'react-native-config';

const MILLICAST_ACCOUNT_ID = Config.MILLICAST_ACCOUNT_ID;
const SUBSCRIBE_URL = 'https://director.millicast.com/api/director/subscribe';
const TURN_URL = 'https://turn.millicast.com/webrtc/_turn';

export const Video = ({ streamName }): JSX.Element => {
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  useEffect(() => {
    class StreamConnection extends Connection {
      onActive(url: string) {
        console.log('Connected to stream');
        setStreamUrl(url);
      }

      onError(error: Error) {
        console.error('Error connecting to stream', error);
      }
    }

    const connection = new StreamConnection(streamName);
    if (streamName) {
      connection.connect();
    }

    return () => connection.close();
  }, [streamName]);

  return (
    <View style={[s.flx_i, s.jcc, s.aic, s.absolute_fill]}>
      {streamUrl ? (
        <RTCView
          style={[
            s.flx_i,
            s.jcc,
            s.aic,
            s.absolute_fill,
            { backgroundColor: 'black' },
          ]}
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

class Connection {
  streamName: string;
  streamUrl?: string;
  pc?: RTCPeerConnection;
  ws?: WebSocket;
  constructor(streamName: string) {
    this.streamName = streamName;
  }

  onClose() {
    // to be implemented
  }

  onInactive() {
    // to be implemented
  }

  onError(error: Error) {
    // to be implemented
  }

  onActive(streamUrl: string) {
    // to be implemented
  }

  close() {
    this.ws?.close();
    this.pc?.close();
    delete this.ws;
    delete this.pc;
    this.onClose();
  }

  async connect() {
    try {
      const url = await getWsUrl(this.streamName);
      const iceServers = await getIceServers();

      this.ws = new WebSocket(url);
      this.pc = new RTCPeerConnection({ iceServers });

      const offer = await this.pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      this.pc.setLocalDescription(offer);
      this.ws.onopen = () => {
        const payload = JSON.stringify({
          type: 'cmd',
          transId: 0,
          name: 'view',
          data: {
            streamId: `${MILLICAST_ACCOUNT_ID}/${this.streamName}`,
            sdp: offer.sdp,
          },
        });
        this.ws?.send(payload);
      };

      this.ws.onclose = event => {
        this.close();
      };

      this.ws.onerror = (error: unknown) => {
        this.onError(error as Error);
      };

      this.ws.onmessage = (event: WebSocketMessageEvent) => {
        const socketError = event.data?.error;
        if (socketError) {
          this.onError(new Error(socketError));
          return;
        }

        const data = JSON.parse(event.data);
        if (data.type === 'event' && data.name === 'inactive') {
          this.onInactive();
        }

        if (data.type === 'event' && data.name === 'active' && this.streamUrl) {
          this.onActive(this.streamUrl);
        }

        if (data.type === 'response') {
          const description = new RTCSessionDescription({
            type: 'answer',
            sdp: data.data.sdp,
          });

          this.pc?.setRemoteDescription(description);
        }
      };

      this.pc.onaddstream = (event: EventOnAddStream) => {
        this.streamUrl = event.stream.toURL();
        this.onActive(this.streamUrl);
      };
    } catch (error) {
      this.onError(error as Error);
    }

    // Kill connection and try again if stream not established in 3-5 seconds.
    setTimeout(() => {
      if (!this.streamUrl) {
        console.log('Reattempting connection');
        this.close();
        this.connect();
      }
    }, 3000 + Math.floor(Math.random() * 2000));
  }
}

async function getWsUrl(streamName: string) {
  const r = await fetch(SUBSCRIBE_URL, {
    method: 'POST',
    body: JSON.stringify({
      streamAccountId: MILLICAST_ACCOUNT_ID,
      streamName,
      unauthorizedSubscribe: true,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const body = await r.json();
  if (body.data.wsUrl) {
    return `${body.data.wsUrl}?token=${body.data.jwt}`;
  } else if (body.data.message) {
    throw new Error(body.data.message);
  } else {
    throw new Error('Unable to connect to subscribe to stream');
  }
}

async function getIceServers() {
  const r = await fetch(TURN_URL, { method: 'PUT' });
  const data = await r.json();
  return data?.v?.iceServers;
}
