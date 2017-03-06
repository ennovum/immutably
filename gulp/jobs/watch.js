const merge = require('lodash/merge');
const run = require('run-sequence');
const gulp = require('gulp');

const buildconf = require('./../../buildconf.js');

function watchJob(src, tasks, opts) {
    opts = merge({}, buildconf.watch, opts);

    return (callback) => {
        const sequence = tasks.concat((err) => {
            callback && callback(err);
            callback = null;
        });

        run.apply(null, sequence);

        gulp.watch(src, opts, null).on('change', () => {
            run.apply(null, sequence);
        });
    };
}

module.exports = watchJob;
