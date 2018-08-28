const modes = {
  production: 'production',
  development: 'development',
  testing: 'testing',
}

const MODE = process.env.NODE_ENV || modes.production
const IS_DEVELOPMENT = MODE === modes.development
const IS_PRODUCTION = MODE === modes.production
const IS_TESTING = MODE === modes.testing

const IS_STATIC_BUILD = process.env.IS_STATIC_BUILD === '1'

module.exports = {
  modes,
  MODE,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_TESTING,
  IS_STATIC_BUILD,
}
