module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin', 'import-graphql'],
  env: {
    test: {
      presets: [["@babel/preset-env", { "modules": "auto" }]],
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  }
};
