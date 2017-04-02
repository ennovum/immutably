import pathseq from 'pathseq';

import {clone} from './clone';

function apply(input, path, applyFn) {
    if (path === null || path === undefined) {
        return valueApply(input, applyFn);
    }
    if (Array.isArray(path)) {
        return sequenceApply(input, path, applyFn);
    }
    return pathApply(input, path, applyFn);
}

function valueApply(input, applyFn) {
    const output = applyFn(input);
    return output;
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
        const output = keyValueApply(input, key, () => subOutput);
        return output;
    }
    else {
        const output = keyValueApply(input, key, applyFn);
        return output;
    }
}

function keyValueApply(input, key, applyFn) {
    if (!input) {
        input = (typeof key === 'number') ? [] : {};
    }

    const inputValue = input[key];
    const value = applyFn(inputValue);
    if (inputValue === value) return input;

    const output = clone(input, null);
    output[key] = value;
    return output;
}

export {apply};
