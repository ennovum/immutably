import {applyOn} from './apply';
import {isPrimitive} from './utils';
import {clone} from './clone';

function merge(input, path, delta, deep) {
    return mergeOn(input, path, delta, deep);
}

function mergeOn(input, path, delta, deep, output) {
    return applyOn(input, path, (input, output) => valueMergeOn(input, delta, deep, output), output);
}

function valueMergeOn(input, delta, deep, output) {
    if (isPrimitive(delta)) {
        return delta;
    }
    return objectMergeOn(input, delta, deep, output);
}

function objectMergeOn(input, delta, deep, output) {
    output = Object.keys(delta).reduce((output, subKey) => {
        const subValue = delta[subKey];
        if (subValue === undefined) return output;

        const subInput = input ? input[subKey] : undefined;
        let subOutput = output ? output[subKey] : undefined;
        if (deep) {
            subOutput = valueMergeOn(subInput, subValue, deep, subOutput);
        }
        else {
            subOutput = subValue;
        }

        if (subInput !== subOutput) {
            if (output === undefined || output === input) output = clone(input, null);
            output[subKey] = subOutput;
        }

        return output;
    }, output) || input;

    return output;
}

export {merge, mergeOn};
