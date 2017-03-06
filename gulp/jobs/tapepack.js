const merge = require('lodash/merge');
const gutil = require('gulp-util');
const tape = require('tape');
const faucet = require('faucet');

const webpackJob = require('./webpack.js');
const buildconf = require('./../../buildconf.js');

const logTag = gutil.colors.gray('[tapepack]');

const tapepackJob = function tapepackJob(src, dest, opts) {
    opts = merge({
        target: 'node',
        output: {
            path: dest,
            filename: '[name]'
        }
    }, buildconf.tapepack, opts);

    return (callback) => {
        webpackJob.runTask(src, opts, (err, stats) => {
            if (err) throw err;

            tapepackLog(stats.toString(opts.stats));

            const assets = stats.compilation.assets;
            const htest = tape.createHarness();
            const stream = htest.createStream().pipe(faucet()).pipe(process.stdout);
            const require2 = (dependency) => (dependency === 'tape') ? (htest) : (require(dependency));
            Object.keys(assets).forEach((name) => {
                const source = assets[name]._cachedSource;

                try {
                    (new Function('require', source))(require2);
                }
                catch (err) {
                    tapepackLog(err);

                    if (callback && opts.bail) {
                        callback(err);
                        callback = null;
                    }
                }
            });

            if (callback) {
                callback(err, stream);
                callback = null;
            }
        });
    };
};

function tapepackLog(message) {
    gutil.log(logTag, message);
}

module.exports = tapepackJob;
