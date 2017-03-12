import test from 'tape';

import {arrayClone, objectClone} from './utils';

test('immutably / utils / clone an array', (testCase) => {
    const testScenario1 = () => {
        const input = [];
        const output = arrayClone(input);

        testCase.deepEqual(input, output);
        testCase.notEqual(input, output);
    };

    testCase.doesNotThrow(testScenario1);

    const testScenario2 = () => {
        const input = [1, 2, 3, 'a', 'b', 'c', null, undefined];
        const output = arrayClone(input);

        testCase.deepEqual(input, output);
        testCase.notEqual(input, output);
    };

    testCase.doesNotThrow(testScenario2);

    testCase.end();
});

test('immutably / utils / clone an object', (testCase) => {
    const testScenario1 = () => {
        const input = {};
        const output = objectClone(input);

        testCase.deepEqual(input, output);
        testCase.notEqual(input, output);
    };

    testCase.doesNotThrow(testScenario1);

    const testScenario2 = () => {
        const input = {a: {}, b: {foo: 'bar'}, c: [], d: ['baz'], e: 1, f: null, g: undefined};
        const output = objectClone(input);

        testCase.deepEqual(input, output);
        testCase.notEqual(input, output);
    };

    testCase.doesNotThrow(testScenario2);

    testCase.end();
});
