# immutably

Non-mutating operations on data structures.

## Install

`immutably` is available to download through [NPM](https://www.npmjs.com/package/immutably).
```
$ npm install immutably
```

## Use

### `apply`

```
output = immutably.apply(input, path, applyFn);
```

**Arguments**

* `input` *(object)* input data object.
* `path` *(string)* input data object's new nested value path.
* `applyFn` *(function)* a function that gets a value as an argument, applies a change and returns a new value.

**Returns**

* `output` *(object)* output data object with the given new nested value set to the given path.

**Examples**

Basic use:
```
const input = {foo: {bar: {baz: false}}};
const output = immutably.apply(input, 'foo.bar.baz', (value) => !value);
output; // {foo: {bar: {baz: true}}}
```

You can find more examples in the test files.

### `set`

```
output = immutably.set(input, path, value);
```

**Arguments**

* `input` *(object)* input data object.
* `path` *(string)* input data object's new nested value path.
* `value` *(any)* input data object's new nested value.

**Returns**

* `output` *(object)* output data object with the given new nested value set to the given path.

**Examples**

Basic use:
```
const input = {foo: {bar: {baz: false}}};
const output = immutably.set(input, 'foo.bar.baz', true);
output; // {foo: {bar: {baz: true}}}
```

You can find more examples in the test files.

### `merge`

```
output = immutably.merge(input, path, delta);
```

**Arguments**

* `input` *(object)* input data object.
* `path` *(string)* input data object's merging path.
* `delta` *(object)* merge data object.

**Returns**

* `output` *(object)* output data object merged with the given merge data object on the given path.

**Examples**

Basic use:
```
const input = {foo: {bar: {baz: false}}};
const output = immutably.merge(input, 'foo.bar', {baz: true});
output; // {foo: {bar: {baz: true}}}
```

You can find more examples in the test files.

### `clone`

```
output = immutably.clone(input, path, deep);
```

**Arguments**

* `input` *(object)* input data object.
* `path` *(string)* input data object's merging path.
* `deep` *(object)* deep clone switch.

**Returns**

* `output` *(object)* output data object cloned on the given path.

**Examples**

Basic use:
```
const input = {foo: {bar: {baz: false}}};
const output = immutably.clone(input, 'foo.bar', false);
output; // {foo: {bar: {baz: false}}}
input.foo.bar === output.foo.bar; // false
```

You can find more examples in the test files.

## Changelog

**1.3.0**

* `immutably.clone` implemented & unit tested

**1.2.2**

* minor refactoring
* project metadata update

**1.2.1**

* `import`/`export` bug fixed

**1.2.0**

* `immutably.merge` implemented & unit tested
* `immutably.apply` refactoring
* empty path proper handling

**1.1.0**

* `immutably.apply` implemented & unit tested
* more unit tests for `immutably.set`

**1.0.0**

* `immutably.set` implemented & unit tested

## Develop

If you want to fork and develop `immutably`, these commands are for you:
```
$ npm run dev
$ npm run test-dev
```

## Test

`immutably` is equipped with a test suite. You can run it with:
```
$ npm run test
```

## Licence

MIT
