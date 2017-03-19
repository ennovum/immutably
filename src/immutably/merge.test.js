import test from 'tape';

import {merge} from './merge';

test('immutably / merge / merge a value with the same value', (testCase) => {
    const testScenario1 = () => {
        const input = true;
        const value = true;
        const resultOutput = merge(input, null, value);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario1);

    testCase.end();
});

test('immutably / merge / merge a value with a different value', (testCase) => {
    const testScenario1 = () => {
        const input = false;
        const value = true;
        const resultOutput = merge(input, null, value);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario1);

    testCase.end();
});

test('immutably / merge / merge an objecy with the same object', (testCase) => {
    const testScenario1 = () => {
        const input = [true];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario1);

    const testScenario2 = () => {
        const input = [true, true];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true, true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario2);

    const testScenario3 = () => {
        const input = [[true], [true]];
        const value = [[true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    };

    testCase.doesNotThrow(testScenario3);

    const testScenario4 = () => {
        const input = [[true], [true]];
        const value = [undefined, [true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    };

    testCase.doesNotThrow(testScenario4);

    const testScenario5 = () => {
        const input = {foo: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario5);

    const testScenario6 = () => {
        const input = {foo: true, xxx: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true, xxx: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario6);

    const testScenario7 = () => {
        const input = {foo: {bar: true}, xxx: {yyy: true}};
        const value = {foo: {bar: true}};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: {bar: true}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    };

    testCase.doesNotThrow(testScenario7);

    testCase.end();
});

test('immutably / merge / merge an object with a different object', (testCase) => {
    const testScenario1 = () => {
        const input = [false];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario1);

    const testScenario2 = () => {
        const input = [false, true];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true, true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario2);

    const testScenario3 = () => {
        const input = [[false], [true]];
        const value = [[true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    };

    testCase.doesNotThrow(testScenario3);

    const testScenario4 = () => {
        const input = [[true], [false]];
        const value = [undefined, [true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.notEqual(input[1], resultOutput[1]);
    };

    testCase.doesNotThrow(testScenario4);

    const testScenario5 = () => {
        const input = {foo: false};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario5);

    const testScenario6 = () => {
        const input = {foo: false, xxx: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true, xxx: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario6);

    const testScenario7 = () => {
        const input = {foo: {bar: false}, xxx: {yyy: true}};
        const value = {foo: {bar: true}};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: {bar: true}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    };

    testCase.doesNotThrow(testScenario7);

    testCase.end();
});
