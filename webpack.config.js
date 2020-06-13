const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}