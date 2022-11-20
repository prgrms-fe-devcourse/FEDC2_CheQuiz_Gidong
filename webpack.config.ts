import path from 'path';

import DotenvPlugin from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devserver?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // ANCHOR: '@' 경로는 삭제 예정이므로, import시 하위 폴더 alias로 import 변경
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new DotenvPlugin({
      systemvars: true,
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};

export default config;
