const fs = require('fs');
const R = require('ramda');
const {
  FIREBASE_CONFIG_SRC_PATH,
  FIREBASE_CONFIG_DESTINATION_PATH,
  PLATFORM_OPTIONS,
  ENVIRONMENT_FILE_PATH,
  GOOGLE_SIGN_IN_CLIENT_ID_KEY,
} = require('./constants');

const findClientId = R.pipe(
  R.path(['client']),
  R.head,
  R.path(['oauth_client']),
  R.head,
  R.path(['client_id']),
);

const setGoogleSignInClientId = version => {
  const data = fs.readFileSync(
    FIREBASE_CONFIG_SRC_PATH[version][PLATFORM_OPTIONS.ANDROID],
    'utf-8',
  );
  const clientId = findClientId(JSON.parse(data));
  const envFile = fs.readFileSync(ENVIRONMENT_FILE_PATH, 'utf-8');

  const linesArray = R.split('\n', envFile);
  const keyRegex = new RegExp(GOOGLE_SIGN_IN_CLIENT_ID_KEY, 'g');
  const googleClientIdIndex = R.findIndex(R.test(keyRegex), linesArray);

  const googleClientId = `${GOOGLE_SIGN_IN_CLIENT_ID_KEY}="${clientId}"`;
  const newEnvLinesArray =
    googleClientIdIndex !== -1
      ? R.update(googleClientIdIndex, googleClientId, linesArray)
      : R.append(googleClientId, linesArray);
  fs.writeFileSync(ENVIRONMENT_FILE_PATH, R.join('\n', newEnvLinesArray));
};

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
  setGoogleSignInClientId,
};
