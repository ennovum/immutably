function arrayClone(input) {
    const output = input.map((value) => value);
    return output;
}

function objectClone(input) {
    const output = Object.assign({}, input);
    return output;
}

export {arrayClone, objectClone};
