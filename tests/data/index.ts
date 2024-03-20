import { canonicalize } from 'json-canonicalize';

export const EIP712_DOMAIN = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
  ],
};

//

// Example 1
// Primitive types
const INPUT_1 = {
  a: 'simple',
  b: true,
  c: false,
  d: 0,
  e: 1,
  f: -1,
  // h: 1n,
  // i: -1n,
};

const OUTPUT_1 = JSON.parse(
  canonicalize({
    ...EIP712_DOMAIN,
    Document: [
      { name: 'a', type: 'string' },
      { name: 'b', type: 'bool' },
      { name: 'c', type: 'bool' },
      { name: 'd', type: 'uint256' },
      { name: 'e', type: 'uint256' },
      { name: 'f', type: 'uint256' },
      // { name: 'h', type: 'uint256' },
      // { name: 'i', type: 'uint256' },
    ],
  })
);

export const EXAMPLE_1 = {
  input: INPUT_1,
  output: OUTPUT_1,
};

// Example 2
// Nested objects
const INPUT_2 = {
  a: {
    b: 'nested',
  },
  c: {
    d: {
      e: 'deeply nested',
    },
  },
  f: {
    g: {
      h: {
        i: 'very deeply nested',
      },
    },
  },
};

const OUTPUT_2 = JSON.parse(
  canonicalize({
    ...EIP712_DOMAIN,
    Document: [
      { name: 'a', type: 'A' },
      { name: 'c', type: 'C' },
      { name: 'f', type: 'F' },
    ],
    A: [{ name: 'b', type: 'string' }],
    C: [{ name: 'd', type: 'D' }],
    D: [{ name: 'e', type: 'string' }],
    F: [{ name: 'g', type: 'G' }],
    G: [{ name: 'h', type: 'H' }],
    H: [{ name: 'i', type: 'string' }],
  })
);

export const EXAMPLE_2 = {
  input: INPUT_2,
  output: OUTPUT_2,
};
