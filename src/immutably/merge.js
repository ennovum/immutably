import {apply} from './apply';
import {isPrimitive, reduce} from './utils';
import {clone} from './clone';

function merge(input, path, delta) {
    return apply(input, path, (input) => valueMerge(input, delta));
}

function valueMerge(input, delta) {
    if (isPrimitive(delta)) {
        return delta;
    }
    return objectMerge(input, delta);
}

function objectMerge(input, delta) {
    const output = reduce(delta, (output, subValue, subKey) => {
        if (subValue === undefined) {
            return output;
        }

        const subInput = input[subKey];
        const subOutput = valueMerge(subInput, subValue);

        if (subInput !== subOutput) {
            if (output === undefined) output = clone(input, null);
            output[subKey] = subOutput;
        }

        return output;
    }) || input;

    return output;
}

export {merge};
