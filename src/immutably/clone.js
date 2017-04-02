import {isPrimitive} from './utils';
import {apply} from './apply';

function clone(input, path, deep) {
    return apply(input, path, (value) => cloneValue(value, deep));
}

function cloneValue(input, deep) {
    if (isPrimitive(input)) {
        return input;
    }
    if (Array.isArray(input)) {
        return cloneArray(input, deep);
    }
    return cloneObject(input, deep);
}

function cloneArray(input, deep) {
    const output = input.map((value) => deep ? cloneValue(value, deep) : value);
    return output;
}

function cloneObject(input, deep) {
    const output = Object.assign({}, input);
    if (deep) {
        for (let key in output) output[key] = cloneValue(output[key], deep);
    }
    return output;
}

export {clone};
