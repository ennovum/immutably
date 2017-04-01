import {apply} from './apply';

function set(input, path, value) {
    return apply(input, path, () => value);
}

export {set};
