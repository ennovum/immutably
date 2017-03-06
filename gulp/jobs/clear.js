const gulp = require('gulp');
const del = require('del');

function clearJob() {
    const paths = Array.prototype.slice.call(arguments);

    return (callback) => {
        del(paths).then(() => callback());
    };
}

module.exports = clearJob;
