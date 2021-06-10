# Cards & Treasure

## Release Configuration Steps

- [ ] Production email sources for Apple Sign-in on [Apple Developer Center](https://help.apple.com/developer-account/#/devf822fb8fc)
- [ ] Production Firebase credentials on the environment folders
- [ ] Change firebase env to production on .env
- [ ] Add REVERSED_CLIENT_ID to [URL Types](https://developers.google.com/identity/sign-in/ios/start-integrating#add_a_url_scheme_to_your_project)

## Project Structure

```
mobile
├── src
│   ├── components
│   ├── i18n
│   ├── utils
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── app.tsx
├── test
├── README.md
├── android
├── index.js
├── ios
├── .env
└── package.json

```

## ./app directory

### components

This is where React components live. Each component will have a directory containing the `.tsx` file, and optionally `.presets`, and `.props` files for larger components.

### i18n

This is where the translations live.

### models

This is where the app's models live.

### navigators

This is where the navigators live.

### screens

This is where the screen components live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy.

### services

Any services that interface with the outside world live here (think REST APIs, Push Notifications, etc.).

### theme

Here lives the application theme, including spacing, colors, and typography and tachyons config.

### utils

This is the place for helpers and utilities. Things like date helpers, formatters, etc. are often found here.

## ./test directory

This directory will hold Jest configs and mocks

## app.tsx

This is the entry point to the app. This is where you will find the main App component which renders the rest of the application.
