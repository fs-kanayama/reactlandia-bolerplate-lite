const modes = {
  production: 'production',
  development: 'development',
  testing: 'testing',
}

const MODE = process.env.NODE_ENV || modes.production
const IS_DEVELOPMENT = MODE === modes.development
const IS_PRODUCTION = MODE === modes.production
const IS_TESTING = MODE === modes.testing

module.exports = { modes, MODE, IS_DEVELOPMENT, IS_PRODUCTION, IS_TESTING }
