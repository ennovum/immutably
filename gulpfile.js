const gulp = require('gulp');

const buildconf = require('./buildconf.js');
const jobs = {
    clear: require('./gulp/jobs/clear.js'),
    run: require('./gulp/jobs/run.js')
};

const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;

require('./gulp/tasks/common.js');
require('./gulp/tasks/scripts.js');

gulp.task(
    'clear',
    jobs.run(['common:clear']));

gulp.task(
    'dev',
    jobs.run(['clear', 'scripts:dev']));

gulp.task(
    'lint',
    jobs.run(['scripts:lint']));

gulp.task(
    'test',
    jobs.run(['clear', 'scripts:test']));

gulp.task(
    'test-dev',
    jobs.run(['clear', 'scripts:test-dev']));

gulp.task(
    'build',
    jobs.run(['clear', 'scripts:build']));
