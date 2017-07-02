import test from 'tape';

import {apply} from './apply';

test('immutably / apply / apply the same value on a value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = true;
        const resultOutput = apply(input, null, (value) => value);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.end();
});

test('immutably / apply / apply the same value on an object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {foo: true};
        const resultOutput = apply(input, 'foo', (value) => value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: [true]};
        const resultOutput = apply(input, 'foo[0]', (value) => value);
        const expectedOutput = {foo: [true]};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const resultOutput = apply(input, 'foo.bar.baz', (value) => value);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);

        testCase.equal(input.foo.bar.baz, resultOutput.foo.bar.baz);
        testCase.equal(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.xxx.yyy, resultOutput.xxx.yyy);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: [{bar: [undefined, [undefined, undefined, {baz: true}]]}], xxx: [{yyy: true}]};
        const resultOutput = apply(input, 'foo[0].bar[1][2].baz', (value) => value);
        const expectedOutput = {foo: [{bar: [undefined, [undefined, undefined, {baz: true}]]}], xxx: [{yyy: true}]};

        testCase.deepEqual(resultOutput, expectedOutput);

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
    });

    testCase.end();
});

test('immutably / apply / apply a different value on a value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = false;
        const resultOutput = apply(input, null, (value) => !value);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / apply / apply a different value on an object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {foo: false};
        const resultOutput = apply(input, 'foo', (value) => !value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: [false]};
        const resultOutput = apply(input, 'foo[0]', (value) => !value);
        const expectedOutput = {foo: [true]};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}}, xxx: {yyy: true}};
        const resultOutput = apply(input, 'foo.bar.baz', (value) => !value);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);

        testCase.notEqual(input.foo.bar.baz, resultOutput.foo.bar.baz);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx.yyy, resultOutput.xxx.yyy);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: [{bar: [undefined, [undefined, undefined, {baz: false}]]}], xxx: [{yyy: true}]};
        const resultOutput = apply(input, 'foo[0].bar[1][2].baz', (value) => !value);
        const expectedOutput = {foo: [{bar: [undefined, [undefined, undefined, {baz: true}]]}], xxx: [{yyy: true}]};

        testCase.deepEqual(resultOutput, expectedOutput);

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
    });

    testCase.end();
});

test('immutably / apply / apply a different value on an empty object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {};
        const resultOutput = apply(input, 'foo', (value) => !value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {};
        const resultOutput = apply(input, 'foo[0]', (value) => !value);
        const expectedOutput = {foo: [true]};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {xxx: {yyy: true}};
        const resultOutput = apply(input, 'foo.bar.baz', (value) => !value);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);

        testCase.equal(input.xxx.yyy, resultOutput.xxx.yyy);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {xxx: [{yyy: true}]};
        const resultOutput = apply(input, 'foo[0].bar[1][2].baz', (value) => !value);
        const expectedOutput = {foo: [{bar: [, [, , {baz: true}]]}], xxx: [{yyy: true}]};

        testCase.deepEqual(resultOutput, expectedOutput);

        testCase.equal(input.xxx[0].yyy, resultOutput.xxx[0].yyy);
        testCase.equal(input.xxx[0], resultOutput.xxx[0]);
        testCase.equal(input.xxx, resultOutput.xxx);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});
