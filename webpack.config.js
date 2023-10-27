const path = require('path')

module.exports = {
  mode: 'development',
  entry: './assets/scripts/appointments.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true
}