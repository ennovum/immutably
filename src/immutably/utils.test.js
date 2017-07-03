import test from 'tape';

import {
    isPrimitive
} from './utils';

test('immutably / utils / checks primitive values', (testCase) => {
    testCase.doesNotThrow(() => {
        testCase.equal(isPrimitive(null), true);
        testCase.equal(isPrimitive(undefined), true);
        testCase.equal(isPrimitive(1), true);
        testCase.equal(isPrimitive('a'), true);
        testCase.equal(isPrimitive(true), true);
        testCase.equal(isPrimitive({}), false);
        testCase.equal(isPrimitive([]), false);
    });

    testCase.end();
});
