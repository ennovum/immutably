import {applyOn} from './apply';

function alt(input, path, altValue) {
    return altOn(input, path, altValue);
}

function altOn(input, path, altValue, output) {
    return applyOn(input, path, (value) => {
        if (value === undefined) return altValue;
        return value;
    }, output);
}

export {alt, altOn};
