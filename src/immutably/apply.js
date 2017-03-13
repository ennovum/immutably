import pathseq from 'pathseq';

import {arrayClone, objectClone} from './utils';

function apply(input, path, applyFn, output) {
    if (path === null || path === undefined) {
        return valueApply(input, applyFn, output);
    }
    if (Array.isArray(path)) {
        return sequenceApply(input, path, applyFn, output);
    }
    return pathApply(input, path, applyFn, output);
}

function valueApply(input, applyFn, output) {
    output = applyFn(input, output);
    return output;
}

function pathApply(input, path, applyFn, output) {
    const sequence = pathseq(path);

    output = sequenceApply(input, sequence, applyFn, output);
    return output;
}

function sequenceApply(input, sequence, applyFn, output) {
    const [key, ...subSequence] = sequence;

    if (subSequence.length) {
        const subInput = input ? input[key] : undefined;
        let subOutput = output ? output[key] : undefined;
        subOutput = sequenceApply(subInput, subSequence, applyFn, subOutput);
        output = keyValueApply(input, key, () => subOutput, output);
        return output;
    }
    else {
        output = keyValueApply(input, key, applyFn, output);
        return output;
    }
}

function keyValueApply(input, key, applyFn, output) {
    if (typeof key === 'number') {
        return arrayKeyValueApply(input, key, applyFn, output);
    }
    return objectKeyValueApply(input, key, applyFn, output);
}

function arrayKeyValueApply(input, key, applyFn, output) {
    if (!input) input = [];

    const inputValue = input[key];
    const outputValue = output ? output[key] : undefined;
    const value = applyFn(inputValue, outputValue);
    if (inputValue === value) return input;

    if (!output) output = arrayClone(input);
    output[key] = value;
    return output;
}

function objectKeyValueApply(input, key, applyFn, output) {
    if (!input) input = {};

    const inputValue = input[key];
    const outputValue = output ? output[key] : undefined;
    const value = applyFn(inputValue, outputValue);
    if (inputValue === value) return input;

    if (!output) output = objectClone(input);
    output[key] = value;
    return output;
}

export {apply};
