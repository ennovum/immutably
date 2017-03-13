import {apply} from './apply';

function set(input, path, value, output) {
    return apply(input, path, () => value, output);
}

export {set};
