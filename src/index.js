import immutably from './immutably/immutably';

export default immutably;
export {immutably};

// Webpack can't export default ESM properly (planned for 2.4 release)
try {
    module.exports = immutably;
} catch (err) {
    err; // noop
}
