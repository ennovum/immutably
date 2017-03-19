import test from 'tape';

import {
    clone, arrayClone, objectClone,
    isPrimitive,
    reduce, objectReduce
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
    const testScenario1 = () => {
        testCase.equal(isPrimitive(null), true);
        testCase.equal(isPrimitive(undefined), true);
        testCase.equal(isPrimitive(1), true);
        testCase.equal(isPrimitive('a'), true);
        testCase.equal(isPrimitive(true), true);
        testCase.equal(isPrimitive({}), false);
        testCase.equal(isPrimitive([]), false);
    };

    testCase.doesNotThrow(testScenario1);

    testCase.end();
});

test('immutably / utils / performs reduce with type check', (testCase) => {
    const testScenario1 = () => {
        const input = [1, 2, 3, 4];
        const output = reduce(input, (output, value, index) => {
            output[index] = value;
            return output;
        }, []);

        testCase.deepEqual(output, input);
    };

    testCase.doesNotThrow(testScenario1);

    const testScenario2 = () => {
        const input = {a: 1, b: 2, c: 3, d: 4};
        const output = reduce(input, (output, value, key) => {
            output[key] = value;
            return output;
        }, {});

        testCase.deepEqual(output, input);
    };

    testCase.doesNotThrow(testScenario2);

    testCase.end();
});

test('immutably / utils / performs object reduce', (testCase) => {
    const testScenario1 = () => {
        const input = {a: 1, b: 2, c: 3, d: 4};
        const output = objectReduce(input, (output, value) => output + value, 0);

        testCase.equal(output, 10);
    };

    testCase.doesNotThrow(testScenario1);

    const testScenario2 = () => {
        const input = {a: 1, b: 2, c: 3, d: 4};
        const output = objectReduce(input, (output, value, key) => output + key, '!');

        testCase.equal(output, '!abcd');
    };

    testCase.doesNotThrow(testScenario2);

    testCase.end();
});
