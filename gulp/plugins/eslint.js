const gutil = require('gulp-util');
const merge = require('lodash/merge');
const through = require('through2');
const eslint = require('eslint');

const buildconf = require('./../../buildconf.js');

const logTag = gutil.colors.gray('[eslint]');

function eslintPlugin(opts) {
    opts = merge({}, buildconf.eslint, opts);

    return through.obj((file, enc, done) => {
        const cli = new eslint.CLIEngine(opts);
        const formatter = cli.getFormatter('compact');
        const report = cli.executeOnFiles([file.path]);

        if (report.errorCount > 0) {
            eslintErrorLog(
                `Lint failure report\n` +
                formatter(report.results) + '\n');
        }

        if (opts.bail && report.errorCount > 0) {
            throw new gutil.PluginError('eslint', {
                message: 'Lint run failure'
            });
        }

        done(null, report);
    });
}

function eslintErrorLog(message) {
    gutil.beep();
    gutil.log(logTag, gutil.colors.red(message));
}

module.exports = eslintPlugin;
