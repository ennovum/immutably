# immutably

Non-mutating operations on data structures.

## Install

`immutably` is available to download through [NPM](https://www.npmjs.com/package/immutably).
```
npm install immutably
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
* `output` *(object)* output data object.

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

**Warning**

The output data object passed through arguments is going to be *mutated*. It is supposed to be used only for transactions and such. In most cases you should just skip it.

### `set`

```
output = immutably.set(input, path, value);
```

**Arguments**

* `input` *(object)* input data object.
* `path` *(string)* input data object's new nested value path.
* `value` *(any)* input data object's new nested value.
* `output` *(object)* output data object.

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

**Warning**

The output data object passed through arguments is going to be *mutated*. It is supposed to be used only for transactions and such. In most cases you should just skip it.

### `merge`

```
output = immutably.merge(input, path, delta);
```

**Arguments**

* `input` *(object)* input data object.
* `path` *(string)* input data object's merging path.
* `delta` *(object)* merge data object.
* `output` *(object)* output data object.

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

**Warning**

The output data object passed through arguments is going to be *mutated*. It is supposed to be used only for transactions and such. In most cases you should just skip it.

## Changelog

**1.2.1**

* `import`/`export` bug fixed

**1.2.0**

* `immutably.merge` implemented & unit tested
* `immutably.apply` refactoring
* empty path proper handling
* `output` as argument of all public functions

**1.1.0**

* `immutably.apply` implemented & unit tested
* more unit tests for `immutably.set`

**1.0.0**

* `immutably.set` implemented & unit tested

## Roadmap

* **push**, **pop**, **shift**, **unshift**, **splice**
* **map**, **reduce**

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
