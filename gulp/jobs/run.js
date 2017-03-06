const run = require('run-sequence');

function runJob(tasks) {
    return (callback) => {
        const sequence = tasks.concat((err) => {
            callback && callback(err);
            callback = null;
        });

        run.apply(null, sequence);
    };
}

module.exports = runJob;
