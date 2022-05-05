jest.mock('@intercom/intercom-react-native', () => {});
jest.mock('@invertase/react-native-apple-authentication', () => {});
jest.mock('@react-native-firebase/firestore', () => jest.fn(() => ({})));
jest.mock('@react-native-firebase/auth', () => {});
jest.mock('@react-native-firebase/storage', () => {});
jest.mock('@react-native-google-signin/google-signin', () => {});
jest.mock('react-native-localize', () => {});
jest.mock('react-native-config', () => ({ MILLICAST_ACCOUNT_ID: '' }));
jest.mock('react-native-incall-manager', () => {});
jest.mock('react-native-flash-message', () => {});
jest.mock('react-native-webrtc', () => {
  EventOnAddStream: jest.fn();
  RTCPeerConnection: jest.fn();
  RTCSessionDescription: jest.fn();
});

jest.mock('react-native-style-tachyons', () =>
  jest.requireActual('react-native-style-tachyons'),
);

jest.mock('dayjs', () => {
  const dayjs = jest.requireActual('dayjs');
  const calendar = jest.requireActual('dayjs/plugin/calendar');
  dayjs.extend(calendar);
  return dayjs;
});
