import test from 'tape';

import {set} from './set';

test('immutably / set / set a primitive value on an object', (testCase) => {
    const testScenario1 = () => {
        const input = {foo: false};
        const value = true;
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario1);

    testCase.end();
});

test('immutably / set / set a primitive value on an empty object', (testCase) => {
    const testScenario1 = () => {
        const input = {};
        const value = true;
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario1);

    testCase.end();
});

test('immutably / set / set a non-primitive value on an object', (testCase) => {
    const testScenario1 = () => {
        const input = {foo: {bar: false}};
        const value = {bar: true};
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario1);

    testCase.end();
});

test('immutably / set / set a non-primitive value on an empty object', (testCase) => {
    const testScenario1 = () => {
        const input = {};
        const value = {bar: true};
        const output = set(input, 'foo', value);

        testCase.equal(value, output.foo);
    };

    testCase.doesNotThrow(testScenario1);

    testCase.end();
});
