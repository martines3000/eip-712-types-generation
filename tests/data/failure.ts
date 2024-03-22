// Example 1
// Array with elements of different types
const INPUT_1 = {
  a: [1, 'test'],
};

const OUTPUT_1 = 'Array elements of different types found';

export const FAILURE_EXAMPLE_1 = {
  name: 'Array with elements of different types',
  input: INPUT_1,
  output: OUTPUT_1,
};

// Example 2
// Empty array
const INPUT_2 = {
  a: [],
};

const OUTPUT_2 = 'Array with length 0 found';

export const FAILURE_EXAMPLE_2 = {
  name: 'Empty array',
  input: INPUT_2,
  output: OUTPUT_2,
};

// Example 3
// Nested arrays
const INPUT_3 = {
  a: [
    [1, 2],
    [3, 4],
  ],
};

const OUTPUT_3 = 'Nested arrays not supported yet';

export const FAILURE_EXAMPLE_3 = {
  name: 'Nested arrays',
  input: INPUT_3,
  output: OUTPUT_3,
};

// Example 4
// Array with objects that have same the keys but different types
const INPUT_4 = {
  a: [{ b: 1 }, { b: 'test' }],
};

const OUTPUT_4 = 'Array elements of different types found';

export const FAILURE_EXAMPLE_4 = {
  name: 'Array with objects that have same keys but different types',
  input: INPUT_4,
  output: OUTPUT_4,
};

// Example 5
// Array with objects that have different keys
const INPUT_5 = {
  a: [{ b: 1 }, { c: 1 }],
};

const OUTPUT_5 = 'Array elements of different types found';

export const FAILURE_EXAMPLE_5 = {
  name: 'Array with objects that have different keys',
  input: INPUT_5,
  output: OUTPUT_5,
};

// Example 6
// Usupported type (function)
const INPUT_6 = {
  a: () => {},
};

const OUTPUT_6 = 'Unsupported type found';

export const FAILURE_EXAMPLE_6 = {
  name: 'Unsupported type (function)',
  input: INPUT_6,
  output: OUTPUT_6,
};

// Example 7
// Usupported type (symbol)
const INPUT_7 = {
  a: Symbol('test'),
};

const OUTPUT_7 = 'Unsupported type found';

export const FAILURE_EXAMPLE_7 = {
  name: 'Unsupported type (symbol)',
  input: INPUT_7,
  output: OUTPUT_7,
};

// Example 8
// Usupported type (null)
const INPUT_8 = {
  a: null,
};

const OUTPUT_8 = 'Cannot convert undefined or null to object';

export const FAILURE_EXAMPLE_8 = {
  name: 'Unsupported type (null)',
  input: INPUT_8,
  output: OUTPUT_8,
};

// Example 9
// Usupported type (undefined)
const INPUT_9 = {
  a: undefined,
};

const OUTPUT_9 = 'Unsupported type found';

export const FAILURE_EXAMPLE_9 = {
  name: 'Unsupported type (undefined)',
  input: INPUT_9,
  output: OUTPUT_9,
};

// Example 10
// Usupported type in array (function)
const INPUT_10 = {
  a: [() => {}],
};

const OUTPUT_10 = 'Array with elements of unsupported type found';

export const FAILURE_EXAMPLE_10 = {
  name: 'Unsupported type in array (function)',
  input: INPUT_10,
  output: OUTPUT_10,
};

// Example 11
// Usupported type in array (symbol)
const INPUT_11 = {
  a: [Symbol('test')],
};

const OUTPUT_11 = 'Array with elements of unsupported type found';

export const FAILURE_EXAMPLE_11 = {
  name: 'Unsupported type in array (symbol)',
  input: INPUT_11,
  output: OUTPUT_11,
};

// Example 12
// Usupported type in array (null)
const INPUT_12 = {
  a: [null],
};

const OUTPUT_12 = 'Cannot convert undefined or null to object';

export const FAILURE_EXAMPLE_12 = {
  name: 'Unsupported type in array (null)',
  input: INPUT_12,
  output: OUTPUT_12,
};

// Example 13
// Usupported type in array (undefined)
const INPUT_13 = {
  a: [undefined],
};

const OUTPUT_13 = 'Array with elements of unsupported type found';

export const FAILURE_EXAMPLE_13 = {
  name: 'Unsupported type in array (undefined)',
  input: INPUT_13,
  output: OUTPUT_13,
};

export const FAILURE_TESTS = [
  FAILURE_EXAMPLE_1,
  FAILURE_EXAMPLE_2,
  FAILURE_EXAMPLE_3,
  FAILURE_EXAMPLE_4,
  FAILURE_EXAMPLE_5,
  FAILURE_EXAMPLE_6,
  FAILURE_EXAMPLE_7,
  FAILURE_EXAMPLE_8,
  FAILURE_EXAMPLE_9,
  FAILURE_EXAMPLE_10,
  FAILURE_EXAMPLE_11,
  FAILURE_EXAMPLE_12,
  FAILURE_EXAMPLE_13,
];
