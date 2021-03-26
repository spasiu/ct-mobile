require('dotenv').config();
const { firebaseConfigSetup } = require('./actions');

// env variables
const { FIREBASE_CONFIG_VERSION } = process.env;

console.log('\n Cards & Treasure Build Config \n');
firebaseConfigSetup(FIREBASE_CONFIG_VERSION);
