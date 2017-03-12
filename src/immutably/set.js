import {apply} from './apply';

function set(input, path, newValue) {
    return apply(input, path, () => newValue);
}

export default set;
export {set};
