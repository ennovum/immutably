function clone(input) {
    if (isPrimitive(input)) {
        return input;
    }
    if (Array.isArray(input)) {
        return arrayClone(input);
    }
    return objectClone(input);
}

function arrayClone(input) {
    const output = input.map((value) => value);
    return output;
}

function objectClone(input) {
    const output = Object.assign({}, input);
    return output;
}

function isPrimitive(input) {
    if (typeof input === 'object' && input !== null) return false;
    return true;
}

function reduce(input, reduceFn, output) {
    if (Array.isArray(input)) {
        return input.reduce(reduceFn, output);
    }
    return objectReduce(input, reduceFn, output);
}

function objectReduce(input, reduceFn, output) {
    return Object.keys(input).reduce((output, key) => {
        const value = input[key];
        output = reduceFn(output, value, key);
        return output;
    }, output);
}

export {
    clone, arrayClone, objectClone,
    isPrimitive,
    reduce, objectReduce
};
