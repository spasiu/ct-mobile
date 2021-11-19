import { FC, useEffect } from 'react';

import {
  RTCView,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

export const VideoStream: FC = ({ streamId: string, wsUrl: string }) => {
  return <RTCView streamURL={''} style={{ width: 480, height: 320 }} />;
};

async function connect(
  wsUrl: string,
  ice: Array<string>,
  streamId: string,
): Promise<void> {
  const websocket = new WebSocket(wsUrl);
  const peerConnection = new RTCPeerConnection({
    iceServers: ice,
    rtcpMuxPolicy: 'require',
  });

  websocket.addEventListener('error', (error: unknown) => {
    throw error; // throwing won't work really because promise will have executed by now
    // I guess we should log this error?
  });

  websocket.addEventListener('close', () => {
    throw new Error('Web socket closed'); // throwing won't work really because promise will have executed by now
    // probably want to reconnect here.
  });

  // send session description on response
  websocket.addEventListener('message', async (event: any) => {
    const message = JSON.parse(event.data);
    if (message.type === 'response') {
      const description = new RTCSessionDescription({
        type: 'answer',
        sdp: message.data.sdp,
      });
      return peerConnection.setRemoteDescription(description);
    }
  });

  // send offer on open
  peerConnection.addEventListener('open', async () => {
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await peerConnection.setLocalDescription(offer);
    websocket.send({
      type: 'cmd',
      transId: 0,
      name: 'view',
      data: {
        streamId,
        sdp: offer.sdp,
      },
    });
  });

  peerConnection.addEventListener('addStream', (event: any) => {
    const { stream } = event;
    stream; // do stuff with the stream for whoever is calling makeViewerClient
    peerConnection;
    websocket;
  });
}
