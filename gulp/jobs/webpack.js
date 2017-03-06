const merge = require('lodash/merge');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const gutil = require('gulp-util');

const buildconf = require('./../../buildconf.js');

const logTag = gutil.colors.gray('[webpack]');

const webpackJob = function webpackJob(src, dest, opts) {
    opts = merge({
        target: 'web',
        output: {
            path: dest,
            filename: '[name]'
        }
    }, buildconf.webpack, opts);

    return (callback) => {
        webpackJob.runTask(src, opts, (err, stats) => {
            if (err) throw err;

            webpackLog(stats.toString(opts.stats));

            if (callback) {
                callback(err);
                callback = null;
            }
        });
    };
};

webpackJob.runTask = function webpackRunTask(src, opts, callback) {
    webpackJob.evalGlobFiles(src, (err, files) => {
        if (err) throw err;

        webpackJob.evalFilesEntry(files, (err, entry) => {
            if (err) throw err;

            webpackJob.compileEntry(entry, opts, (err, opts, stats) => {
                if (err) throw err;

                callback(err, stats);
            });
        });
    });
};

webpackJob.evalGlobFiles = function webpackEvalGlobFiles(src, callback) {
    const globOpts = {
        absolute: true
    };

    glob(src, globOpts, (err, files) => callback(err, files));
};

webpackJob.evalFilesEntry = function webpackEvalFilesEntry(files, callback) {
    const entry = files.reduce((entry, file) => {
        const filename = path.basename(file);
        entry[filename] = file;
        return entry;
    }, {});

    callback(null, entry);
};

webpackJob.compileEntry = function webpackCompileEntry(entry, opts, callback) {
    opts = merge({
        entry: entry
    }, opts);

    webpack(opts, (err, stats) => callback(err, opts, stats));
};

function webpackLog(message) {
    gutil.log(logTag, message);
}

module.exports = webpackJob;
