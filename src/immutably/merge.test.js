import test from 'tape';

import {merge} from './merge';

test('immutably / merge / merge a value with the same value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = true;
        const value = true;
        const resultOutput = merge(input, null, value);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: true}};
        const value = true;
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.end();
});

test('immutably / merge / deep merge a value with the same value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = true;
        const value = true;
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: true}};
        const value = true;
        const resultOutput = merge(input, 'foo.bar', value, true);
        const expectedOutput = {foo: {bar: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.end();
});

test('immutably / merge / merge a value with a different value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = false;
        const value = true;
        const resultOutput = merge(input, null, value);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: false}};
        const value = true;
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / merge / deep merge a value with a different value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = false;
        const value = true;
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = true;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: false}};
        const value = true;
        const resultOutput = merge(input, 'foo.bar', value, true);
        const expectedOutput = {foo: {bar: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.end();
});

test('immutably / merge / merge an object with the same object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = [true];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [true, true];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true, true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [[true], [true]];
        const value = [[true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = [[true], [true]];
        const value = [undefined, [true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.notEqual(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: true, xxx: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true, xxx: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: true}, xxx: {yyy: true}};
        const value = {foo: {bar: true}};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: {bar: true}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {bar: {baz: true}};
        const resultOutput = merge(input, 'foo', value);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.end();
});

test('immutably / merge / deep merge an object with the same object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = [true];
        const value = [true];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [true, true];
        const value = [true];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [true, true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [[true], [true]];
        const value = [[true]];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = [[true], [true]];
        const value = [undefined, [true]];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: true, xxx: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = {foo: true, xxx: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: true}, xxx: {yyy: true}};
        const value = {foo: {bar: true}};
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = {foo: {bar: true}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value, true);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value, true);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {bar: {baz: true}};
        const resultOutput = merge(input, 'foo', value, true);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
        testCase.equal(input.foo, resultOutput.foo);
        testCase.equal(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.end();
});

test('immutably / merge / merge an object with a different object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = [false];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [false, true];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true, true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [[false], [true]];
        const value = [[true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = [[true], [false]];
        const value = [undefined, [true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.notEqual(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: false};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: false, xxx: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true, xxx: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: false}, xxx: {yyy: true}};
        const value = {foo: {bar: true}};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: {bar: true}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {bar: {baz: true}};
        const resultOutput = merge(input, 'foo', value);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.end();
});

test('immutably / merge / deep merge an object with a different object', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = [false];
        const value = [true];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [false, true];
        const value = [true];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [true, true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [[false], [true]];
        const value = [[true]];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = [[true], [false]];
        const value = [undefined, [true]];
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.notEqual(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: false};
        const value = {foo: true};
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: false, xxx: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = {foo: true, xxx: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: false}, xxx: {yyy: true}};
        const value = {foo: {bar: true}};
        const resultOutput = merge(input, null, value, true);
        const expectedOutput = {foo: {bar: true}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value, true);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value, true);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: {baz: false}, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {bar: {baz: true}};
        const resultOutput = merge(input, 'foo', value, true);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.end();
});

test('immutably / merge / merge an object with an empty value', (testCase) => {
    testCase.doesNotThrow(() => {
        const input = undefined;
        const value = undefined;
        const resultOutput = merge(input, null, value);
        const expectedOutput = undefined;

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.equal(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = undefined;
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [undefined, true];
        const value = [true];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [true, true];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = [undefined, [true]];
        const value = [[true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [[true], [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input[0], resultOutput[0]);
        testCase.equal(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = [undefined, [false]];
        const value = [undefined, [true]];
        const resultOutput = merge(input, null, value);
        const expectedOutput = [undefined, [true]];

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.equal(input[0], resultOutput[0]);
        testCase.notEqual(input[1], resultOutput[1]);
    });

    testCase.doesNotThrow(() => {
        const input = undefined;
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: undefined, xxx: true};
        const value = {foo: true};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: true, xxx: true};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: undefined, xxx: {yyy: true}};
        const value = {foo: {bar: true}};
        const resultOutput = merge(input, null, value);
        const expectedOutput = {foo: {bar: true}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: undefined}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: {bar: undefined, aaa: {bbb: true}}, xxx: {yyy: true}};
        const value = {baz: true};
        const resultOutput = merge(input, 'foo.bar', value);
        const expectedOutput = {foo: {bar: {baz: true}, aaa: {bbb: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.notEqual(input.foo.bar, resultOutput.foo.bar);
        testCase.equal(input.foo.aaa, resultOutput.foo.aaa);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.doesNotThrow(() => {
        const input = {foo: undefined, xxx: {yyy: true}};
        const value = {bar: {baz: true}};
        const resultOutput = merge(input, 'foo', value);
        const expectedOutput = {foo: {bar: {baz: true}}, xxx: {yyy: true}};

        testCase.deepEqual(resultOutput, expectedOutput);
        testCase.notEqual(input, resultOutput);
        testCase.notEqual(input.foo, resultOutput.foo);
        testCase.equal(input.xxx, resultOutput.xxx);
    });

    testCase.end();
});
