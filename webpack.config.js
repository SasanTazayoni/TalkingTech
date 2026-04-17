const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  entry: './assets/scripts/appointments.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv()
  ]
})
