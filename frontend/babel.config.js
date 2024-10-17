module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-private-methods',
      {loose: true}, // 또는 false로 설정
    ],
    [
      '@babel/plugin-transform-class-properties',
      {loose: true}, // 또는 false로 설정
    ],
    [
      '@babel/plugin-transform-private-property-in-object',
      {loose: true}, // 또는 false로 설정
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@pages': './src/pages',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
