var exec = require('child_process').exec;

exec('npm run test', (error, stdout, stderr) => {
    if (error) throw error;

    console.log(stdout);
    console.log(stderr);
});
