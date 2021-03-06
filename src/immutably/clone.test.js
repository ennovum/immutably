import test from 'tape';

import {clone} from './clone';

test('immutably / clone / clone with type detect', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = true;
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = 123;
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = 'foo';
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [];
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {};
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / clone / clone an array', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = [];
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [1, 2, 3, 'a', 'b', 'c', null, undefined];
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [{foo: 'bar'}];
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / clone / deep clone an array', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = [{foo: true}];
        const resultOutput = clone(input, null, true);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input[0], resultOutput[0]);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [{foo: {bar: {baz: true}}}];
        const resultOutput = clone(input, null, true);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input[0], resultOutput[0]);
        testCase.notEqual(input[0].foo, resultOutput[0].foo);
        testCase.notEqual(input[0].foo.bar, resultOutput[0].foo.bar);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / clone / clone an object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {};
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {a: {}, b: {foo: 'bar'}, c: [], d: ['baz'], e: 1, f: null, g: undefined};
        const resultOutput = clone(input, null);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / clone / deep clone an object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {foo: true};
        const resultOutput = clone(input, null, true);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}}};
        const resultOutput = clone(input, null, true);

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / clone / clone with a path', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const resultOutput = clone(input, 'foo.bar');

        testCase.deepEqual(input, resultOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const resultOutput = clone(input, 'foo.bar.baz');

        testCase.deepEqual(input, resultOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.end();
});
