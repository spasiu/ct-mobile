const fs = require('fs');
const R = require('ramda');
const {
  FIREBASE_CONFIG_SRC_PATH,
  FIREBASE_CONFIG_DESTINATION_PATH,
  PLATFORM_OPTIONS,
} = require('./constants');

const firebaseConfigSetup = version =>
  R.forEach(
    platform =>
      fs.copyFile(
        FIREBASE_CONFIG_SRC_PATH[version][platform],
        FIREBASE_CONFIG_DESTINATION_PATH[platform],
        err => {
          if (err) {
            console.log(
              `💥  Error on Firebase configuration for ${version} on ${platform} \n`,
            );
            throw err;
          }
          console.log(
            `🔧  Firebase configured for ${version} on ${platform} \n`,
          );
        },
      ),
    R.values(PLATFORM_OPTIONS),
  );

module.exports = {
  firebaseConfigSetup,
};
