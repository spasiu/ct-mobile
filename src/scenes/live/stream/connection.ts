import {
  RTCPeerConnection,
  RTCSessionDescription,
  EventOnAddStream,
} from 'react-native-webrtc';
import Config from 'react-native-config';

const MILLICAST_ACCOUNT_ID = Config.MILLICAST_ACCOUNT_ID;
const SUBSCRIBE_URL = 'https://director.millicast.com/api/director/subscribe';
const TURN_URL = 'https://turn.millicast.com/webrtc/_turn';
const TURN_RETRIES = 2;

type OnActiveCallback = (streamURl: string) => any;
type OnErrorCallback = (error: Error) => any;
type OnInactiveCallback = () => any;
type OnCloseCallback = () => any;

interface Connection {
  onActive: (cb: OnActiveCallback) => void;
  onInactive: (cb: OnInactiveCallback) => void;
  onClose: (cb: OnCloseCallback) => void;
  onError: (cb: OnErrorCallback) => void;
  close: () => Connection;
}

export const connect = async (
  streamName: string,
  onActiveObserver: OnActiveCallback = (streamUrl: string) => undefined,
  onInactiveObserver: OnInactiveCallback = () => undefined,
  onCloseObserver: OnCloseCallback = () => undefined,
  onErrorObserver: OnErrorCallback = (error: Error) => undefined,
): Promise<Connection> => {
  let streamUrl: string;
  let shouldTerminate = false;

  const wsUrl = await getWebsocketUrl(streamName);
  const websocket = new WebSocket(wsUrl);
  const connection = new RTCPeerConnection({
    iceServers: await getIceServers(),
  });

  connection.onaddstream = (event: EventOnAddStream) => {
    streamUrl = event.stream.toURL();
    onActiveObserver(streamUrl);
  };

  websocket.onmessage = (event: WebSocketMessageEvent) => {
    const socketError = event.data?.error;
    if (socketError) {
      onErrorObserver(new Error(socketError));
      return;
    }

    const data = JSON.parse(event.data);

    if (data.type === 'event' && data.name === 'inactive') {
      onInactiveObserver();
    }

    if (data.type === 'event' && data.name === 'active' && streamUrl) {
      onActiveObserver(streamUrl);
    }

    if (data.type === 'response') {
      const description = new RTCSessionDescription({
        type: 'answer',
        sdp: data.data.sdp,
      });
      connection.setRemoteDescription(description);
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
          streamId: `${MILLICAST_ACCOUNT_ID}/${streamName}`,
          sdp: offer.sdp,
        },
      }),
    );
  };

  websocket.onerror = (error: unknown) => {
    onErrorObserver(error as Error);
  };

  websocket.onclose = event => {
    // on close wipe out the connection and reconnect
    try {
      connection.close();
    } catch (error) {
      console.error(`Unable to close RTC Peer Connection ${error}`);
    }

    try {
      websocket.close();
    } catch (error) {
      // should already be closed
      console.error(`Unable to close web socket ${error}`);
    }

    // if we're not trying to kill the connection then don't try to reconnect
    if (!shouldTerminate) {
      backoff(1).then(() =>
        connect(
          streamName,
          onActiveObserver,
          onInactiveObserver,
          onCloseObserver,
          onErrorObserver,
        ),
      );
    }
  };

  return {
    onActive: (cb: OnActiveCallback) => {
      onActiveObserver = cb;
    },
    onInactive: (cb: OnInactiveCallback) => {
      onInactiveObserver = cb;
    },
    onClose: (cb: OnCloseCallback) => {
      onCloseObserver = cb;
    },
    onError: (cb: OnErrorCallback) => {
      onErrorObserver = cb;
    },
    close: () => {
      shouldTerminate = true;
      connection.close();
      websocket.close();
    },
  } as Connection;
};

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

async function getWebsocketUrl(streamName: string): Promise<string> {
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
