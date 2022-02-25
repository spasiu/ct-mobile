jest.mock('react-native-config', () => ({ MILLICAST_ACCOUNT_ID: '' }));
jest.mock('react-native-incall-manager', () => {});
jest.mock('react-native-webrtc', () => {
  EventOnAddStream: jest.fn();
  RTCPeerConnection: jest.fn();
  RTCSessionDescription: jest.fn();
});

import { Connection } from "./connection";

describe('Connection', () => {
  test('should instaitate Connection with streamName', () => {
    const connection = new Connection('somestreamname');
    expect(connection.streamName).toBe('somestreamname');
  });
});