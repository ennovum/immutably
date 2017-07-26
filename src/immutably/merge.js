import {applyOn} from './apply';
import {isPrimitive} from './utils';
import {clone} from './clone';

function merge(input, path, delta) {
    return mergeOn(input, path, delta);
}

function mergeOn(input, path, delta, output) {
    return applyOn(input, path, (input, output) => valueMergeOn(input, delta, output), output);
}

function valueMergeOn(input, delta, output) {
    if (isPrimitive(delta)) {
        return delta;
    }
    return objectMergeOn(input, delta, output);
}

function objectMergeOn(input, delta, output) {
    output = Object.keys(delta).reduce((output, subKey) => {
        const subValue = delta[subKey];
        if (subValue === undefined) return output;

        const subInput = input ? input[subKey] : undefined;
        let subOutput = output ? output[subKey] : undefined;
        subOutput = valueMergeOn(subInput, subValue, subOutput);

        if (subInput !== subOutput) {
            if (output === undefined || output === input) output = clone(input, null);
            output[subKey] = subOutput;
        }

        return output;
    }, output) || input;

    return output;
}

export {merge, mergeOn};
