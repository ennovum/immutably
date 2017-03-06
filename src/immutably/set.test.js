import test from 'tape';

import {immutably} from './immutably';

test('pathseq / set the same value on simple object', (testCase) => {
    const testScenario = () => {
        const input = {foo: true};
        const expectedOutput = {foo: true};
        const resultOutput = immutably.set(input, 'foo', true);

        testCase.deepEqual(expectedOutput, resultOutput);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('pathseq / set new value on simple object', (testCase) => {
    const testScenario = () => {
        const input = {foo: false};
        const expectedOutput = {foo: true};
        const resultOutput = immutably.set(input, 'foo', true);

        testCase.deepEqual(expectedOutput, resultOutput);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('pathseq / set the same value on simple object with an array', (testCase) => {
    const testScenario = () => {
        const input = {foo: [true]};
        const expectedOutput = {foo: [true]};
        const resultOutput = immutably.set(input, 'foo[0]', true);

        testCase.deepEqual(expectedOutput, resultOutput);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('pathseq / set new value on simple object with an array', (testCase) => {
    const testScenario = () => {
        const input = {foo: [false]};
        const expectedOutput = {foo: [true]};
        const resultOutput = immutably.set(input, 'foo[0]', true);

        testCase.deepEqual(expectedOutput, resultOutput);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('pathseq / set the same value on complex object without arrays + deep check', (testCase) => {
    const testScenario = () => {
        const input = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const resultOutput = immutably.set(input, 'foo.bar.baz', true);

        testCase.deepEqual(expectedOutput, resultOutput);

        testCase.equal(input.foo.bar.baz, resultOutput.foo.bar.baz);
        testCase.equal(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.xxx.yyy, resultOutput.xxx.yyy);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('pathseq / set new value on complex object without arrays + deep check', (testCase) => {
    const testScenario = () => {
        const input = {foo: {bar: {baz: false}}, xxx: {yyy: true}};
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const resultOutput = immutably.set(input, 'foo.bar.baz', true);

        testCase.deepEqual(expectedOutput, resultOutput);

        testCase.notEqual(input.foo.bar.baz, resultOutput.foo.bar.baz);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx.yyy, resultOutput.xxx.yyy);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('pathseq / set the same value on complex object with arrays + deep check', (testCase) => {
    const testScenario = () => {
        const input = {foo: [{bar: [undefined, [undefined, undefined, {baz: true}]]}], xxx: [{yyy: true}]};
        const expectedOutput = {foo: [{bar: [undefined, [undefined, undefined, {baz: true}]]}], xxx: [{yyy: true}]};
        const resultOutput = immutably.set(input, 'foo[0].bar[1][2].baz', true);

        testCase.deepEqual(expectedOutput, resultOutput);

        testCase.equal(input.foo[0].bar[1][2].baz, resultOutput.foo[0].bar[1][2].baz);
        testCase.equal(input.foo[0].bar[1][2], resultOutput.foo[0].bar[1][2]);
        testCase.equal(input.foo[0].bar[1], resultOutput.foo[0].bar[1]);
        testCase.equal(input.foo[0].bar, resultOutput.foo[0].bar);
        testCase.equal(input.foo[0], resultOutput.foo[0]);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.xxx[0].yyy, resultOutput.xxx[0].yyy);
        testCase.equal(input.xxx[0], resultOutput.xxx[0]);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.equal(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});

test('pathseq / set new value on complex object with arrays + deep check', (testCase) => {
    const testScenario = () => {
        const input = {foo: [{bar: [undefined, [undefined, undefined, {baz: false}]]}], xxx: [{yyy: true}]};
        const expectedOutput = {foo: [{bar: [undefined, [undefined, undefined, {baz: true}]]}], xxx: [{yyy: true}]};
        const resultOutput = immutably.set(input, 'foo[0].bar[1][2].baz', true);

        testCase.deepEqual(expectedOutput, resultOutput);

        testCase.notEqual(input.foo[0].bar[1][2].baz, resultOutput.foo[0].bar[1][2].baz);
        testCase.notEqual(input.foo[0].bar[1][2], resultOutput.foo[0].bar[1][2]);
        testCase.notEqual(input.foo[0].bar[1], resultOutput.foo[0].bar[1]);
        testCase.notEqual(input.foo[0].bar, resultOutput.foo[0].bar);
        testCase.notEqual(input.foo[0], resultOutput.foo[0]);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx[0].yyy, resultOutput.xxx[0].yyy);
        testCase.equal(input.xxx[0], resultOutput.xxx[0]);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.notEqual(input, resultOutput);
    };

    testCase.doesNotThrow(testScenario);
    testCase.end();
});
