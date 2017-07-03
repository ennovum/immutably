import {apply} from './apply';
import {set} from './set';
import {merge} from './merge';
import {alt} from './alt';
import {clone} from './clone';

const immutably = {apply, set, merge, alt, clone};

export default immutably;
export {immutably};
