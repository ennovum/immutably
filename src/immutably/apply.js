import pathseq from 'pathseq';

import {clone} from './clone';

function apply(input, path, applyFn) {
    return applyOn(input, path, applyFn);
}

function applyOn(input, path, applyFn, output) {
    if (path === null || path === undefined) {
        return valueApplyOn(input, applyFn, output);
    }
    if (Array.isArray(path)) {
        return sequenceApplyOn(input, path, applyFn, output);
    }
    return pathApplyOn(input, path, applyFn, output);
}

function valueApplyOn(input, applyFn, output) {
    output = applyFn(input, output);
    return output;
}

function pathApplyOn(input, path, applyFn, output) {
    const sequence = pathseq(path);
    output = sequenceApplyOn(input, sequence, applyFn, output);
    return output;
}

function sequenceApplyOn(input, sequence, applyFn, output) {
    const [key, ...subSequence] = sequence;

    if (subSequence.length > 0) {
        const subInput = input ? input[key] : undefined;
        let subOutput = output ? output[key] : undefined;
        subOutput = sequenceApplyOn(subInput, subSequence, applyFn, subOutput);
        output = keyValueApplyOn(input, key, () => subOutput, output);
        return output;
    }
    else {
        output = keyValueApplyOn(input, key, applyFn, output);
        return output;
    }
}

function keyValueApplyOn(input, key, applyFn, output) {
    if (!input) {
        input = (typeof key === 'number') ? [] : {};
    }

    const inputValue = input[key];
    const outputValue = output ? output[key] : undefined;
    const value = applyFn(inputValue, outputValue);
    if (inputValue === value) return input;

    if (output === undefined || output === input) output = clone(input, null);
    output[key] = value;
    return output;
}

export {apply, applyOn};
