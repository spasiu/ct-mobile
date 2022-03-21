import Sound from 'react-native-sound';

const VOLUME = 0.025;

export const sounds: {[key: string]: Sound} = {
  entry: new Sound('entry.wav', Sound.MAIN_BUNDLE),
  cardEntry: new Sound('card_entry.wav', Sound.MAIN_BUNDLE),
  players: new Sound('digits.wav', Sound.MAIN_BUNDLE),
  teams: new Sound('digits.wav', Sound.MAIN_BUNDLE),
  spin: new Sound('spin.wav', Sound.MAIN_BUNDLE),
  pop: new Sound('pop.mp3', Sound.MAIN_BUNDLE),
  drop1: new Sound('drop_1.wav', Sound.MAIN_BUNDLE),
  drop2: new Sound('drop_2.wav', Sound.MAIN_BUNDLE),
  drop3: new Sound('drop_3.wav', Sound.MAIN_BUNDLE)
};

export const playSound = (name: string, sound: Sound = sounds[name]) => sound && sound
  .setCurrentTime(0)
  .setVolume(VOLUME)
  .play(() => {});

export const loadSounds = () => sounds;
