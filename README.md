# Cards & Treasure

## Release Configuration Steps

- [ ] Production email sources for Apple Sign-in on [Apple Developer Center](https://help.apple.com/developer-account/#/devf822fb8fc)
- [ ] Production Firebase credentials on the environment folders
- [ ] Change firebase env to production on .env
- [ ] Add REVERSED_CLIENT_ID to [URL Types](https://developers.google.com/identity/sign-in/ios/start-integrating#add_a_url_scheme_to_your_project)
- [ ] Key restriction for maps API
- [ ] Key restriction for other google APIs

## Configuring Info.plist

To build for prod, you need to do the following:

- make sure you've updated your .env file with the values from Mobile-Env-Prod in 1PW
- copy Info.plist from environments/prod to ios/CardsAndTreasure
- copy GoogleService-Info.plist from environments/prod to ios/

## Local Setup

1. Using _nvm_ or _n_ make sure your node version is v14.16.
1. Install Watchman `brew install watchman`.
1. Install CocoaPods `sudo gem install cocoapods -v 1.10.1`.
1. Install/Update Java `https://java.com/en/download/`.
1. Clone this repo.
1. If you want to make use of the `yarn set:dev` and `yarn set:prod` commands place prod and dev _.env_ files in the prod and dev folders under _environments_. Otherwise do the following three things:
  1. Copy the dev _.env_ file from 1Password into the root project folder.
  1. Copy the dev GoogleService-Info.plist from ./environments/dev/ into ./ios/.
  1. Copy the dev Info.plist from ./environments/dev/ into ./ios/cardsandtreasure/.
1. Make sure Xcode and Android Studio are installed and run `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`.
1. Open the _/android_ folder with Android Studio to generate a _local.properties_ file in that folder pointing at your android SDK path.
1. To prepare the app dependencies run `yarn install`, `yarn clean:ios` and `yarn generate`. On M1 the chip you'll need to alias `pod` in your .zshrc file: _alias pod='arch -x86_64 pod'_.
1. Run `yarn ios` to build the app and run the simulator. You can run a specific simulator by appending a device tag like so `yarn ios --simulator="iPhone SE (2nd generation)"`. You can find a list of available devices with `xcrun simctl list devices`.

## Running the app on your iPhone from local dev

It happens sometimes that you want to do something like tests push notifications or see how the app performs on a real device. Now you have to build and run the app from your local dev environment onto an actual iPhone.

Basically you need to build the project using react native and then open it in Xcode to build on your iPhone. You'll need to be signed in as a developer in Xcode, and your device will need to be registered. Detailed instructions below:

1. Plug your iPhone into your MacBook.
1. If you're not already part of the Apple dev team, ask someone to go to `appstoreconnect.apple.com/access/users` and add you as a developer.
1. You'll need the UDID for your phone in the next step. In _finder_ locate your iPhone and click on the device description E.g., _iPhone 6 Plus - 11.91GB..._. This will reveal the UDID.
1. Login to your developer account and add your phone to the device list here `developer.apple.com/account/resources/devices/list`.
1. Create a new **development** certificate and download it here `developer.apple.com/account/resources/certificates/list`.
1. After building the iOS code (using `yarn clean:ios` or some other weirdly names command) open the _.xcworkspace_ file from the _ios_ folder in xcode.
1. In the menu go to _**Xcode**_ -> _**Preferences**_ -> _**Accounts**_ and add your apple developer account.
1. Back in the menu go to _**Product**_ -> _**Destination**_ -> _**iOS Device**_ and select your iPhone.
1. Now when you click _run_ in Xcode the app will build on your phone (keep an eye on your device for prompts during the build process).

## Deploying a new build to TestFlight for internal testing

1. Download or generate a **distribution** certificate for **Cartes et Tresor Inc** from `developer.apple.com/account/resources/certificates/list`.
1. Run `yarn ios:clean` to build the React-Native project for ios.
1. Open _ios/CardsAndTreasure.xcworkspace_ in Xcode.
1. Go to _Xcode_ > _Preferences_ > _Accounts_ then select the "Cards and Treasure" profile and click _Manage Certificates_ and make sure that you have a distribution certificate, then close this menu.
1. On the project screen in Xcode, under the _General_ tab, increment the build string OR version fields.
1. In the run menu (where you would normally select the iOS device for the simulator) choose "Any iOS Device (arm64, armv7)" with a hammer icon beside it (don't build yet).
1. From the menu bar click _Product_ > _Archive_ and wait for the app to build.
1. When the archiving completes select "Distribute App" >  "App Store Connect" > "Upload" > etc etc defaults and follow the upload process. Once the upload completes and Apple processes the new build, as long as it's a newer version or build of the current version, testers will be prompted to use the new version.
1. Log in to [appstoreconnect.apple.com](https://appstoreconnect.apple.com).
1. Click through to "My Apps" > "Cards and Treasure" > "TestFlight". Once the new release finishes processing you will need to fill out a form about encryption and US government export controls.
1. Click on the build number for the new version in the testflight menu and fill out and save the release description.

## Troubleshooting

### Problem 2: `yarn ios` fails

If `yarn ios` fails, it might have to do with your global node/nvm versions ([reference](https://stackoverflow.com/questions/66627590/phasescriptexecution-error-in-react-native-app?rq=1)). Try this:

1. When in doubt wipe out ios/Pods the podfile lock and Xcode/DerivedData.
1. Go to your `bash_profile/zshrc` and comment the three nvm initialization lines (`export NVM_DIR="$HOME/.nvm" [...]`)
1. Open a new terminal and do `node -v`, if it still finds something it means that you have a global version somewhere.
1. Do `brew uses --installed node`. _This will show you what is still using node._
1. Do `brew uninstall --force yarn` _it was `yarn` that was still using a version of node, in my case._ This automatically uninstalls its node/npm dependency.
1. Uncomment the nvm initialization lines
1. Reinstall yarn using nvm's npm with `npm i -g yarn`.

_If you have different packages that come up, replace `yarn` with the packages that you need to reinstall._

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
