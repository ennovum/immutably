# immutably

Dead simple immutability for JS.
A setter that performs changes of nested values in data objects in the immutable way.

## Install

`immutably` is available to download through [NPM](https://www.npmjs.com/package/immutably).
```
npm install immutably
```

## Use

### Set

```
output = immutably.set(input, path, value);
```

**Arguments**

`input` *(object)* data object.
`path` *(string)* data object's new nested value path.
`value` *(any)* data object's new nested value.

**Returns**

`output` *(object)* new data object with the given new nested value set to the given path.

**Examples**

Basic use:
```
const input = {foo: {bar: {baz: true}}};
const output = immutably.set(input, 'foo.bar.baz', true);
output; // {foo: {bar: {baz: true}}}
input === output; // true
```
```
const input = {foo: {bar: {baz: false}}};
const output = immutably.set(input, 'foo.bar.baz', true);
output; // {foo: {bar: {baz: true}}}
input === output; // false
```

You can find more examples in the test files.

## Roadmap

* **merge** - merging objects
* **push**, **pop**, **shift**, **unshift**, **splice**, **slice** - working with arrays

## Develop

If you want to fork and develop `immutably`, these commands are for you:
```
npm run dev
npm run test-dev
```

## Test

`immutably` is equipped with a test suite. You can run it with:
```
npm run test
```

## Licence

MIT
