import Sound from 'react-native-sound';

export const playSound = (type: string) => {
  if (!type) {
    throw new Error('Invalid sound file provided.')
  }

  const loadedSound = (sounds as any)[type] as any;
  if (loadedSound) {
    loadedSound.setCurrentTime(0);
    loadedSound.play(() => {});
    return loadedSound;
  }
}
const errorCallback = (error: string) => {}

export const sounds = {
  entry: new Sound('entry.wav', Sound.MAIN_BUNDLE, errorCallback),
  cardEntry: new Sound('card_entry.wav', Sound.MAIN_BUNDLE, errorCallback),
  players: new Sound('digits.wav', Sound.MAIN_BUNDLE, errorCallback),
  teams: new Sound('digits.wav', Sound.MAIN_BUNDLE, errorCallback),
  spin: new Sound('spin.wav', Sound.MAIN_BUNDLE, errorCallback),
  pop: new Sound('pop.mp3', Sound.MAIN_BUNDLE, errorCallback),
  drop1: new Sound('drop_1.wav', Sound.MAIN_BUNDLE, errorCallback),
  drop2: new Sound('drop_2.wav', Sound.MAIN_BUNDLE, errorCallback),
  drop3: new Sound('drop_3.wav', Sound.MAIN_BUNDLE, errorCallback),
};

export const loadSounds = () => {
  return sounds;
}