const path = require('path')

module.exports = {
  mode: 'development',
  entry: './assets/scripts/signup.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true
}