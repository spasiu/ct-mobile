require('dotenv').config();
const { firebaseConfigSetup, setGoogleSignInClientId } = require('./actions');

// env variables
const { FIREBASE_CONFIG_VERSION } = process.env;

console.log('\n Cards & Treasure Build Config \n');
setGoogleSignInClientId(FIREBASE_CONFIG_VERSION);
firebaseConfigSetup(FIREBASE_CONFIG_VERSION);
