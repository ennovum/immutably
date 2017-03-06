const gulp = require('gulp');
const path = require('path');

const buildconf = require('./../../buildconf.js');
const plugins = {
    eslint: require('./../plugins/eslint.js')
};
const jobs = {
    webpack: require('./../jobs/webpack.js'),
    tapepack: require('./../jobs/tapepack.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const test = buildconf.path.root + buildconf.dir.test;
const dist = buildconf.path.root + buildconf.dir.dist;

gulp.task(
    'scripts:dev',
    jobs.webpack(src + '/*.js', dev + '/', {watch: true}));

gulp.task(
    'scripts:lint',
    () => gulp.src(src + '/**/*.js')
        .pipe(plugins.eslint({bail: true})));

gulp.task(
    'scripts:test',
    jobs.tapepack(src + '/**/*.test.js', test + '/', {}));

gulp.task(
    'scripts:test-dev',
    jobs.tapepack(src + '/**/*.test.js', test + '/', {watch: true}));

gulp.task(
    'scripts:build',
    jobs.webpack(src + '/*.js', dist + '/', {bail: true}));
