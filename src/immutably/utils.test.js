import test from 'tape';

import {
    isPrimitive,
    reduce, objectReduce
} from './utils';

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
