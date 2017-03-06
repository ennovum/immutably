const gulp = require('gulp');

const buildconf = require('./../../buildconf.js');
const jobs = {
    clear: require('./../jobs/clear.js'),
};

const dev = buildconf.path.root + buildconf.dir.dev;
const test = buildconf.path.root + buildconf.dir.test;
const dist = buildconf.path.root + buildconf.dir.dist;

gulp.task(
    'common:clear',
    jobs.clear(dev, test, dist));
