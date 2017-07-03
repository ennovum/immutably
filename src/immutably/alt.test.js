import test from 'tape';

import {alt} from './alt';

test('immutably / alt / set an alternative value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {};
        const altValue = true;
        const resultOutput = alt(input, 'foo', altValue);
        const expectedOutput = {foo: true};

        testCase.equal(resultOutput.foo, altValue);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {}}};
        const altValue = true;
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: true}}};

        testCase.equal(resultOutput.foo.bar.baz, altValue);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {};
        const altValue = {};
        const resultOutput = alt(input, 'foo', altValue);
        const expectedOutput = {foo: {}};

        testCase.equal(resultOutput.foo, altValue);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {}}};
        const altValue = {};
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: {}}}};

        testCase.equal(resultOutput.foo.bar.baz, altValue);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / alt / set an alternative value and build a data structure with a path', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {};
        const altValue = true;
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: true}}};

        testCase.equal(resultOutput.foo.bar.baz, altValue);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {};
        const altValue = true;
        const resultOutput = alt(input, 'foo[0].bar[1].baz', altValue);
        const expectedOutput = {foo: [{bar: [, {baz: true}]}]};

        testCase.equal(resultOutput.foo[0].bar[1].baz, altValue);
        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / alt / not set an alternative value over a value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {foo: false};
        const altValue = true;
        const resultOutput = alt(input, 'foo', altValue);
        const expectedOutput = {foo: false};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}}};
        const altValue = true;
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: false}}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: 1};
        const altValue = true;
        const resultOutput = alt(input, 'foo', altValue);
        const expectedOutput = {foo: 1};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: 1}}};
        const altValue = true;
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: 1}}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: 'xxx'};
        const altValue = true;
        const resultOutput = alt(input, 'foo', altValue);
        const expectedOutput = {foo: 'xxx'};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: 'xxx'}}};
        const altValue = true;
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: 'xxx'}}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {}};
        const altValue = true;
        const resultOutput = alt(input, 'foo', altValue);
        const expectedOutput = {foo: {}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: {}}}};
        const altValue = true;
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: {}}}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.end();
});

test('immutably / alt / not set an alternative value over null value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {foo: null};
        const altValue = true;
        const resultOutput = alt(input, 'foo', altValue);
        const expectedOutput = {foo: null};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: null}}};
        const altValue = true;
        const resultOutput = alt(input, 'foo.bar.baz', altValue);
        const expectedOutput = {foo: {bar: {baz: null}}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.end();
});
