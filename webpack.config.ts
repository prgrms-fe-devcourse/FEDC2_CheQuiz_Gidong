import path from 'path';

import DotenvPlugin from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';

import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devserver?: WebpackDevServerConfiguration;
}

type WebpackArguments = {
  [key: string]: string;
};

export default (env: NodeJS.ProcessEnv, argv: WebpackArguments) => {
  const isProdcution = argv.mode === 'production';
  const isDevelopment = argv.mode === 'development';

  const config: Configuration = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        // ANCHOR: '@' 경로는 삭제 예정이므로, import시 하위 폴더 alias로 import 변경
        '@': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    entry: './src/index.tsx',
    output: {
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
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
        inject: true,
        template: path.resolve(__dirname, 'public/index.html'),
        ...(isProdcution
          ? {
              minify: {
                removeComments: true,
                removeRedundantAttributes: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined),
      }),
      new ForkTsCheckerWebpackPlugin({
        async: isDevelopment,
        typescript: {
          diagnosticOptions: {
            syntactic: true,
          },
        },
      }),
      new DotenvPlugin({
        systemvars: true,
      }),
      new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: 'bundle-stats.json',
      }),
    ],
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };

  return config;
};
