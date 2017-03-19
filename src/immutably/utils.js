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

function isPrimitive(value) {
    if (typeof value === 'object' && value !== null) return false;
    return true;
}

export {
    arrayClone, objectClone,
    isPrimitive
};
