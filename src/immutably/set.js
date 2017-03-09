import {apply} from './apply';

function set(data, path, newValue) {
    return apply(data, path, () => newValue);
}

export default set;
export {set};
