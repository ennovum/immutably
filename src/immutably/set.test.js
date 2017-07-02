import test from 'tape';

import {set} from './set';

test('immutably / set / set a primitive value on an object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {};
        const value = true;
        const resultOutput = set(input, 'foo', value);
        const expectedOutput = {foo: true};

        testCase.equal(resultOutput.foo, value);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: false};
        const value = true;
        const resultOutput = set(input, 'foo', value);
        const expectedOutput = {foo: true};

        testCase.equal(resultOutput.foo, value);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / set / set a non-primitive value on an object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {};
        const value = {bar: true};
        const resultOutput = set(input, 'foo', value);
        const expectedOutput = {foo: {bar: true}};

        testCase.equal(resultOutput.foo, value);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: false}};
        const value = {bar: true};
        const resultOutput = set(input, 'foo', value);
        const expectedOutput = {foo: {bar: true}};

        testCase.equal(resultOutput.foo, value);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});
