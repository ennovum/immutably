import {apply} from './apply';

function set(input, path, newValue, output) {
    return apply(input, path, () => newValue, output);
}

export {set};
