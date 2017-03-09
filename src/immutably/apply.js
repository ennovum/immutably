import pathseq from 'pathseq';

function apply(data, path, applyFn) {
    if (Array.isArray(path)) return sequenceApply(data, path, applyFn);
    return pathApply(data, path, applyFn);
}

function pathApply(data, path, applyFn) {
    const sequence = pathseq(path);
    const newData = sequenceApply(data, sequence, applyFn);
    return newData;
}

function sequenceApply(data, sequence, applyFn) {
    const [key, ...subSequence] = sequence;

    if (subSequence.length) {
        const subData = data ? data[key] : undefined;
        const newSubData = sequenceApply(subData, subSequence, applyFn);
        const newData = keyApply(data, key, () => newSubData);
        return newData;
    }
    else {
        const newData = keyApply(data, key, applyFn);
        return newData;
    }
}

function keyApply(data, key, applyFn) {
    if (typeof key === 'number') return arrayKeyApply(data, key, applyFn);
    return objectKeyApply(data, key, applyFn);
}

function arrayKeyApply(data, key, applyFn) {
    if (!data) data = [];

    const value = data[key];
    const newValue = applyFn(value);
    if (value === newValue) return data;

    const newArray = data.map((item) => item);
    newArray[key] = newValue;
    return newArray;
}

function objectKeyApply(data, key, applyFn) {
    if (!data) data = {};

    const value = data[key];
    const newValue = applyFn(value);
    if (value === newValue) return data;

    const newData = Object.assign({}, data, {[key]: newValue});
    return newData;
}

export default apply;
export {apply, pathApply, sequenceApply};
