import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  EventOnAddStream,
} from 'react-native-webrtc';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Loading } from '../../components';
import { styles } from 'react-native-style-tachyons';

const WS_URL = 'wss://streamevents.millicast.com/ws';
const TURN_URL = 'https://turn.millicast.com/webrtc/_turn';
const TURN_RETRIES = 2;

type VideoPlayerProps = {
  streamId: string;
};

export const VideoPlayer = ({ streamId }: VideoPlayerProps): JSX.Element => {
  const [streamURL, setStreamURL] = useState<string>('');
  const s = styles;
  useLayoutEffect(() => {
    connect(streamId).then(streamUrl => setStreamURL(streamUrl));
  }, [streamId]);

  console.log('COMPONENT LOADED', streamURL);

  return (
    <View style={[s.absolute_fill]}>
      {streamURL ? (
        <RTCView streamURL={streamURL} />
      ) : (
        <View style={[s.flx_i, s.jcc, s.aic, s.absolute_fill]}>
          <Loading containerStyle={[s.flx_i, s.jcc, s.aic]} />
        </View>
      )}
    </View>
  );
};

async function connect(streamId: string): Promise<string> {
  console.log('CALLED CONNECT');
  const websocket = new WebSocket(WS_URL);
  const connection = new RTCPeerConnection({
    iceServers: await getIceServers(),
  });

  // send SDP
  websocket.onmessage = (event: WebSocketMessageEvent) => {
    console.log('Message recieved', JSON.stringify(event, null, 4));
    if (event.data?.error) {
      console.error(
        `Error message event from WebRTC provider ${event.data.error}`,
      );

      return;
    }

    if (event.data?.type === 'response') {
      const description = new RTCSessionDescription({
        type: 'answer',
        sdp: event.data?.data?.sdp,
      });
      connection.setRemoteDescription(description);
      return;
    }
  };

  websocket.onopen = async () => {
    const offer = await connection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    connection.setLocalDescription(offer);
    websocket.send(
      JSON.stringify({
        type: 'cmd',
        transId: 0,
        name: 'view',
        data: {
          streamId,
          sdp: offer.sdp,
        },
      }),
    );
  };

  websocket.onerror = (error: unknown) => {
    console.error(
      `Error on websocket connection ${JSON.stringify(error, null, 4)}`,
    );
  };

  websocket.onclose = event => {
    console.log(
      `Websocket connection closed ${JSON.stringify(event, null, 4)}`,
    );
  };

  return new Promise(resolve => {
    connection.onaddstream = (event: EventOnAddStream) => {
      resolve(event.stream.toURL());
    };
  });
}

async function getIceServers(retryCount = 0): Promise<{ url: string }[]> {
  let r: Response;
  try {
    r = await fetch(TURN_URL, { method: 'PUT' });
  } catch (error) {
    throw new Error(`Error requesting stun servers ${error}`);
  }

  if (r.status > 299) {
    console.error(`${TURN_URL} responded with ${r.status}`);
    if (retryCount > TURN_RETRIES) {
      console.error(`${TURN_URL} retried ${TURN_RETRIES} times. Giving up.`);
      throw new Error('Unable to retreive stun servers.');
    }

    await backoff(retryCount);
    return getIceServers(retryCount + 1);
  }

  const data = await r.json();
  const servers = (data?.v?.iceServers || []) as { url: string }[];
  if (servers.length < 1) {
    throw new Error('List of stun servers is empty.');
  }

  return servers;
}

// backoff 1: 500-1500ms, 2: 1000-2000ms, 3: 2000-3000ms, 4: 4000-5000ms, etc...
function backoff(attempt: number): Promise<void> {
  const ms = 2 ** (attempt - 1) * 500 + Math.floor(Math.random() * 1000);
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}
