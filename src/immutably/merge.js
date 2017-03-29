import {apply, applyOn} from './apply';
import {clone, isPrimitive, reduce} from './utils';

function merge(input, path, delta) {
    return apply(input, path, (input, output) => valueMergeOn(input, delta, output));
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
    output = reduce(delta, (output, subValue, subKey) => {
        if (subValue === undefined) {
            return output;
        }

        const subInput = input[subKey];
        let subOutput = output ? output[subKey] : undefined;
        subOutput = valueMergeOn(subInput, subValue, subOutput);

        if (subInput !== subOutput) {
            if (output === undefined || output === input) output = clone(input);
            output[subKey] = subOutput;
        }

        return output;
    }, output) || input;

    return output;
}

export {merge, mergeOn};
