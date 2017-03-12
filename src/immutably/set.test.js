import test from 'tape';

import {set} from './set';

test('immutably / set / set a primitive value on an object', (testCase) => {
    const testScenario = () => {
        const input = {foo: false};
        const value = true;
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('immutably / set / set a primitive value on an empty object', (testCase) => {
    const testScenario = () => {
        const input = {};
        const value = true;
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('immutably / set / set a non-primitive value on an object', (testCase) => {
    const testScenario = () => {
        const input = {foo: {bar: false}};
        const value = {bar: true};
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('immutably / set / set a non-primitive value on an empty object', (testCase) => {
    const testScenario = () => {
        const input = {};
        const value = {bar: true};
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});
