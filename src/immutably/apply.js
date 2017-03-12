import pathseq from 'pathseq';

import {arrayClone, objectClone} from './utils';

function apply(input, path, applyFn) {
    if (Array.isArray(path)) return sequenceApply(input, path, applyFn);
    return pathApply(input, path, applyFn);
}

function pathApply(input, path, applyFn) {
    const sequence = pathseq(path);
    const output = sequenceApply(input, sequence, applyFn);
    return output;
}

function sequenceApply(input, sequence, applyFn) {
    const [key, ...subSequence] = sequence;

    if (subSequence.length) {
        const subInput = input ? input[key] : undefined;
        const subOutput = sequenceApply(subInput, subSequence, applyFn);
        const output = keyApply(input, key, () => subOutput);
        return output;
    }
    else {
        const output = keyApply(input, key, applyFn);
        return output;
    }
}

function keyApply(input, key, applyFn) {
    if (typeof key === 'number') return arrayKeyApply(input, key, applyFn);
    return objectKeyApply(input, key, applyFn);
}

function arrayKeyApply(input, key, applyFn) {
    if (!input) input = [];

    const value = input[key];
    const newValue = applyFn(value);
    if (value === newValue) return input;

    const output = arrayClone(input);
    output[key] = newValue;
    return output;
}

function objectKeyApply(input, key, applyFn) {
    if (!input) input = {};

    const value = input[key];
    const newValue = applyFn(value);
    if (value === newValue) return input;

    const output = objectClone(input);
    output[key] = newValue;
    return output;
}

export default apply;
export {apply};
