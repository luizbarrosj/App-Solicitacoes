const { getDefaultConfig } = require('metro-config');

module.exports = {
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'], // Extensões permitidas
    extraNodeModules: {
      crypto: require.resolve('react-native-crypto'),
      stream: require.resolve('stream-browserify'),
    },
  },
};
