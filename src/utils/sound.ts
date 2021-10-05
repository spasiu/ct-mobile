import Sound from 'react-native-sound';

export const playSound = (type, reply) => {
  if (!type) {
    throw new Error('Invalid sound file provided')
  }

  const loadedSound = sounds[type];
  if (loadedSound) {
    loadedSound.setCurrentTime(0);
    loadedSound.play((success) => {});
    return loadedSound;
  }
}

export const sounds = {
  entry: null,
  cardEntry: null,
  players: null,
  teams: null,
  spin: null,
  pop: null,
};

const errorCallback = (error) => {}

export const loadSounds = () => {
  sounds.entry = new Sound('entry.wav', Sound.MAIN_BUNDLE, errorCallback)
  sounds.cardEntry = new Sound('card_entry.wav', Sound.MAIN_BUNDLE, errorCallback);
  sounds.players = new Sound('digits.wav', Sound.MAIN_BUNDLE, errorCallback);
  sounds.teams = new Sound('digits.wav', Sound.MAIN_BUNDLE, errorCallback);
  sounds.spin = new Sound('spin.wav', Sound.MAIN_BUNDLE, errorCallback);
  sounds.pop = new Sound('pop.mp3', Sound.MAIN_BUNDLE, errorCallback);
}