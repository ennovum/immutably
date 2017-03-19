import test from 'tape';

import {
    clone, arrayClone, objectClone,
    isPrimitive
} from './utils';

test('immutably / utils / clone with type detect', (testCase) => {
    const testScenario1 = () => {
        const input = true;
        const output = clone(input);

        testCase.deepEqual(input, output);
    };

    testCase.doesNotThrow(testScenario1);

    const testScenario2 = () => {
        const input = 123;
        const output = clone(input);

        testCase.deepEqual(input, output);
    };

    testCase.doesNotThrow(testScenario2);

    const testScenario3 = () => {
        const input = 'foo';
        const output = clone(input);

        testCase.deepEqual(input, output);
    };

    testCase.doesNotThrow(testScenario3);

    const testScenario4 = () => {
        const input = [];
        const output = clone(input);

        testCase.deepEqual(input, output);
    };

    testCase.doesNotThrow(testScenario4);

    const testScenario5 = () => {
        const input = {};
        const output = clone(input);

        testCase.deepEqual(input, output);
    };

    testCase.doesNotThrow(testScenario5);

    testCase.end();
});

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

test('immutably / utils / checks primitive values', (testCase) => {
    const testScenario = () => {
        testCase.equal(isPrimitive(null), true);
        testCase.equal(isPrimitive(undefined), true);
        testCase.equal(isPrimitive(1), true);
        testCase.equal(isPrimitive('a'), true);
        testCase.equal(isPrimitive(true), true);
        testCase.equal(isPrimitive({}), false);
        testCase.equal(isPrimitive([]), false);
    };

    testCase.doesNotThrow(testScenario);

    testCase.end();
});
