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
    isPrimitive,
    reduce, objectReduce
};
