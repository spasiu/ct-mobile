// react-naqtive-webrtc doesn't export AudioSession
// react-naqtive-webrtc RTCView doesn't expose style property
// but these things work in the JavaScript
// so doing a hacky workaround here so we can compile
const webrtc = require('react-native-webrtc');
export const { AudioSession }: any = webrtc;
export const { RTCView }: any = webrtc;
