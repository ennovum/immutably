const process = require('process');

const buildName = process.npm_package_config_buildconf || 'default';
const buildconf = require('./buildconf/' + buildName + '.js');

module.exports = buildconf;
