module.exports = {
  presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@screens': './app/screens',
        },
        extensions: [
          '.ios.ts',
          '.ios.tsx',
          '.android.ts',
          '.android.tsx',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
      },
    ],
  ]
  // api.cache(true);
  // return {
  //   presets: ['babel-preset-expo'],
  // };
};
