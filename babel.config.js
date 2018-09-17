module.exports = {
  'presets': [
    '@babel/preset-env',
    '@babel/preset-react',
    ['linaria/babel', { 'evaluate': true }],
  ],
  'plugins': [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'universal-import',
  ],
}
