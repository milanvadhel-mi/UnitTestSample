const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { resolver } = config;

  config.resolver = {
    ...resolver,
    sourceExts: [...resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx']
  };

  return config;
})(); 