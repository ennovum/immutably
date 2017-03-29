import {apply} from './apply';
import {clone, isPrimitive, reduce} from './utils';

function merge(input, path, value, output) {
    return apply(input, path, (input, output) => valueMerge(input, value, output), output);
}

function valueMerge(input, value, output) {
    if (isPrimitive(value)) {
        return value;
    }
    return recurrentMerge(input, value, output);
}

function recurrentMerge(input, value, output) {
    output = reduce(value, (output, subValue, subKey) => {
        if (subValue === undefined) {
            return output;
        }

        const subInput = input[subKey];
        let subOutput = output ? output[subKey] : undefined;
        subOutput = valueMerge(subInput, subValue, subOutput);

        if (subInput !== subOutput) {
            if (output === undefined || output === input) output = clone(input);
            output[subKey] = subOutput;
        }

        return output;
    }, output) || input;

    return output;
}

export {merge};
