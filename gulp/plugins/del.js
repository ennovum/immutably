const merge = require('lodash/merge');
const through = require('through2');
const del = require('del');

const buildconf = require('./../../buildconf.js');

function delPlugin(opts) {
    opts = merge({}, buildconf.del, opts);

    return through.obj((file, enc, done) => {
        del(file.path);
        done();
    });
}

module.exports = delPlugin;
