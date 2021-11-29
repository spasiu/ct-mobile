import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  EventOnAddStream,
} from 'react-native-webrtc';
import React, { useLayoutEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { styles } from 'react-native-style-tachyons';
import { logoIcon } from './live-screen.presets';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../theme/sizes';

const MILLICAST_ACCOUNT_ID = 'mnNRvw';
const SUBSCRIBE_URL = 'https://director.millicast.com/api/director/subscribe';
const TURN_URL = 'https://turn.millicast.com/webrtc/_turn';
const TURN_RETRIES = 2;

type VideoPlayerProps = {
  streamName: string;
};

export const VideoPlayer = ({ streamName }: VideoPlayerProps): JSX.Element => {
  const [streamURL, setStreamURL] = useState<string | null>(null);
  const s = styles;

  useLayoutEffect(() => {
    let websocket: WebSocket | null;
    let connection: RTCPeerConnection | null;
    // IIFE (useEffect can't take an async func as a CB)
    (async () => {
      console.log('CALLED CONNECT');
      const wsUrl = await getWebsocketUrl(streamName);
      websocket = new WebSocket(wsUrl);
      connection = new RTCPeerConnection({
        iceServers: await getIceServers(),
      });

      // send SDP
      websocket.onmessage = (event: WebSocketMessageEvent) => {
        console.log('onevent');
        let streamUrl: string | null = null;
        let data;
        try {
          data = JSON.parse(event.data);
        } catch (error: unknown) {
          console.error(`Error parsing event data ${event} (${error})`);
          // It's possible with certain error events that the data prop is not serialized, it's a JS object.
          data = event.data;
        }

        console.log(`MESSAGE >>> ${JSON.stringify(data, null, 4)}`);

        if (data.error) {
          console.error(
            `Error message event from WebRTC provider ${event.data.error}`,
          );
        }

        if (data.type === 'event' && data.name === 'inactive') {
          setStreamURL(null);
        }

        if (
          data.type === 'event' &&
          data.name === 'active' &&
          streamUrl !== null
        ) {
          setStreamURL(streamUrl);
        }

        if (data.type === 'response') {
          const description = new RTCSessionDescription({
            type: 'answer',
            sdp: data.data.sdp,
          });
          connection.setRemoteDescription(description);
          console.log('set description', description);
        }
      };

      websocket.onopen = async () => {
        console.log('onopen');
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
              streamId: `${MILLICAST_ACCOUNT_ID}/${streamName}`,
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

        setStreamURL(null);
      };

      connection.onaddstream = (event: EventOnAddStream) => {
        console.log('onaddstream', event);
        streamUrl = event.stream.toURL();
        setStreamURL(streamUrl);
      };
    })();

    // clean up function
    return () => {
      console.log('CLEAN UP');
      websocket?.close();
      connection?.close();
      websocket = null;
      connection = null;
    };
  }, [streamName]);

  console.log('COMPONENT LOADED', streamURL);

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

async function getIceServers(retryCount = 0): Promise<{ url: string }[]> {
  console.log('CALLED getIceServers');
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

async function getWebsocketUrl(streamName: string): Promise<string> {
  console.log('CALLED getWebsocketUrl', streamName);
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

  if (r.status > 299) {
    const body = await r.json();
    throw new Error(
      `Subscribe failed ${r.status} ${JSON.stringify(body, null, 4)}`,
    );
  }

  const body = await r.json();
  return `${body.data.wsUrl}?token=${body.data.jwt}`;
}
