import {applyOn} from './apply';

function set(input, path, value) {
    return setOn(input, path, value);
}

function setOn(input, path, value, output) {
    return applyOn(input, path, () => value, output);
}

export {set, setOn};
