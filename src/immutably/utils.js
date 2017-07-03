function isPrimitive(input) {
    if (typeof input === 'object' && input !== null) return false;
    return true;
}

export {
    isPrimitive
};
