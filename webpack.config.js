const path = require('path');

module.exports = {
  entry: {
    index: './ts/index.ts',
    game: './ts/game.ts',
    boot: './ts/boot.ts',
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './web/js/'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
};