const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const fs = require('fs');

const additionalEntryPoints = {};
let i = 0;
const htmlPlugins = glob.sync('./src/lessons/**/*.html', {
  ignore: './src/lessons/**/class-resources/**/*.html'
}).map(file => {
  const jsFileCandidate = file.replace(/\.html$/i, '.js');
  
  const chunks = [file.match(/\.slides\.html$/i) ? 'slides' : 'main'];
  
  if (fs.existsSync(jsFileCandidate) && fs.lstatSync(jsFileCandidate).isFile()) {
    const chunkName = `additional-chunk-${i++}`;
    additionalEntryPoints[chunkName] = jsFileCandidate;
    chunks.push(chunkName);
  }

  return new HtmlWebpackPlugin({
    template: file,
    filename: file.replace(/^\.\/src\//, ''),
    chunks: chunks,
  });
});

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: ['src', 'node_modules']
    }
  }
};

module.exports = {
  entry: {
    main: './src/main.js',
    slides: './src/slides.js',
    ...additionalEntryPoints
  },
  output: {
    filename: '[id].[contenthash].js',
    path: path.resolve(__dirname, 'dist/docs')
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: {
            minifyCSS: false,
            minifyJS: false
          },
          sources: {
            list: [
              // All default supported tags and attributes
              '...',
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
            ]
          }
        }
      },
      {
        test: /\.(ttf|woff2?|eot)(\?[a-z0-9=.]+)?$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.raw\.(sa|sc|c)ss$/i,
        use: ['raw-loader', sassLoader]
      },
      {
        test: /(?<!\.raw)\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', sassLoader]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'lessons/**/class-resources/**/*',
        context: './src'
      }]
    }),
    ...htmlPlugins
  ]
}