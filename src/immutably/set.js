import pathseq from 'pathseq';

function set(data, path, newValue) {
    if (Array.isArray(path)) return sequenceSet(data, path, newValue);
    return pathSet(data, path, newValue);
}

function pathSet(data, path, newValue) {
    const sequence = pathseq(path);
    const newData = sequenceSet(data, sequence, newValue);
    return newData;
}

function sequenceSet(data, sequence, newValue) {
    const [key, ...subSequence] = sequence;

    if (subSequence.length) {
        const subData = data[key];
        const newSubData = sequenceSet(subData, subSequence, newValue);
        const newData = keySet(data, key, newSubData);
        return newData;
    }
    else {
        const newData = keySet(data, key, newValue);
        return newData;
    }
}

function keySet(data, key, newValue) {
    if (typeof key === 'number') return arrayKeySet(data, key, newValue);
    return objectKeySet(data, key, newValue);
}

function arrayKeySet(data, key, newValue) {
    if (!data) data = [];

    const value = data[key];
    if (value === newValue) return data;

    const newArray = data.map((item) => item);
    newArray[key] = newValue;
    return newArray;
}

function objectKeySet(data, key, newValue) {
    if (!data) data = {};

    const value = data[key];
    if (value === newValue) return data;

    const newData = Object.assign({}, data, {[key]: newValue});
    return newData;
}

export default set;
export {set, pathSet, sequenceSet};
