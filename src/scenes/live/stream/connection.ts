import {
  EventOnAddStream,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import Config from 'react-native-config';

const MILLICAST_ACCOUNT_ID = Config.MILLICAST_ACCOUNT_ID;
const SUBSCRIBE_URL = 'https://director.millicast.com/api/director/subscribe';
const TURN_URL = 'https://turn.millicast.com/webrtc/_turn';

export class Connection {
  onActive?: (streamUrl: string) => void;
  onInactive?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
  streamName: string;
  streamUrl?: string;
  pc?: RTCPeerConnection;
  ws?: WebSocket;
  constructor(streamName: string) {
    this.streamName = streamName;
  }

  close(): void {
    this.ws?.close();
    this.pc?.close();
    delete this.ws;
    delete this.pc;
    this.onClose && this.onClose();
  }

  async connect(): Promise<void> {
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

      this.ws.onclose = () => {
        this.close();
      };

      this.ws.onerror = (error: unknown) => {
        this.onError && this.onError(error as Error);
      };

      this.ws.onmessage = (event: WebSocketMessageEvent) => {
        const socketError = event.data?.error;
        if (socketError) {
          this.onError && this.onError(new Error(socketError));
          return;
        }

        const data = JSON.parse(event.data);
        if (data.type === 'event' && data.name === 'inactive') {
          this.onInactive && this.onInactive();
        }

        if (data.type === 'event' && data.name === 'active' && this.streamUrl) {
          this.onActive && this.onActive(this.streamUrl);
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
        this.onActive && this.onActive(this.streamUrl);
      };
    } catch (error) {
      this.onError && this.onError(error as Error);
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
