export const EIP712_DOMAIN = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
  ],
};

// Example 1
// Primitive types
const INPUT_1 = {
  a: 'simple',
  b: true,
  c: false,
  d: 0,
  e: 1,
  f: -1,
  h: 1n,
  i: -1n,
};

const OUTPUT_1 = {
  ...EIP712_DOMAIN,
  Document: [
    { name: 'a', type: 'string' },
    { name: 'b', type: 'bool' },
    { name: 'c', type: 'bool' },
    { name: 'd', type: 'uint256' },
    { name: 'e', type: 'uint256' },
    { name: 'f', type: 'int256' },
    { name: 'h', type: 'uint256' },
    { name: 'i', type: 'int256' },
  ],
};

export const SUCCESS_EXAMPLE_1 = {
  name: 'Primitive types',
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

const OUTPUT_2 = {
  ...EIP712_DOMAIN,
  '2d085cd2f420704d4cb1fa5619ee2b15f5b8ced8d5cf530fed30d75d733644a6': [
    {
      name: 'd',
      type: '636d37226049e5d0cbd474019d5200f59ea330a0c8244f78654386f00a80f7ac',
    },
  ],
  '558c286bf7ffe6265c7a91e34f197186394cb54cccfc15e5bf16eacbe86e635a': [
    {
      name: 'g',
      type: 'd06a5af908f75002aa81b8813b3cef9e746f4c93cbecf8bbf9f120127ad76d71',
    },
  ],
  '636d37226049e5d0cbd474019d5200f59ea330a0c8244f78654386f00a80f7ac': [
    { name: 'e', type: 'string' },
  ],
  '6680b9a408f9a5f1a155054bce44aa213e8eb0e17984684a65df7b13ec22a976': [
    { name: 'i', type: 'string' },
  ],
  '6bb8e24f15929234c3fe8719c84d8b075e7bb39c453543f72db333ce32e1cf37': [
    { name: 'b', type: 'string' },
  ],
  Document: [
    {
      name: 'a',
      type: '6bb8e24f15929234c3fe8719c84d8b075e7bb39c453543f72db333ce32e1cf37',
    },
    {
      name: 'c',
      type: '2d085cd2f420704d4cb1fa5619ee2b15f5b8ced8d5cf530fed30d75d733644a6',
    },
    {
      name: 'f',
      type: '558c286bf7ffe6265c7a91e34f197186394cb54cccfc15e5bf16eacbe86e635a',
    },
  ],
  d06a5af908f75002aa81b8813b3cef9e746f4c93cbecf8bbf9f120127ad76d71: [
    {
      name: 'h',
      type: '6680b9a408f9a5f1a155054bce44aa213e8eb0e17984684a65df7b13ec22a976',
    },
  ],
};

export const SUCCESS_EXAMPLE_2 = {
  name: 'Nested objects',
  input: INPUT_2,
  output: OUTPUT_2,
};

// Example 3
// Arrays
const INPUT_3 = {
  a: ['simple', 'array'],
  b: [true, false],
  c: [0, 1, 2, 3, 4, 5],
  d: [0n, 1n, 2n, 3n, 4n, 5n],
  e: [1, -1, 2, 3, 4, 5],
};

const OUTPUT_3 = {
  ...EIP712_DOMAIN,
  Document: [
    { name: 'a', type: 'string[]' },
    { name: 'b', type: 'bool[]' },
    { name: 'c', type: 'uint256[]' },
    { name: 'd', type: 'uint256[]' },
    { name: 'e', type: 'int256[]' },
  ],
};

export const SUCCESS_EXAMPLE_3 = {
  name: 'Arrays',
  input: INPUT_3,
  output: OUTPUT_3,
};

// Example 4
// Arrays of objects
const INPUT_4 = {
  a: [{ b: 'nested' }, { b: 'array' }, { b: 'of objects' }],
  b: [{ b: 'nested' }],
  c: [
    { d: 1, e: 'nested' },
    { d: 12345, e: 'array' },
    { d: -12345, e: 'of objects' },
  ],
};

const OUTPUT_4 = {
  ...EIP712_DOMAIN,
  '6bb8e24f15929234c3fe8719c84d8b075e7bb39c453543f72db333ce32e1cf37': [
    { name: 'b', type: 'string' },
  ],
  '4dce06afdba8c29075ece9b2141a8ff0a7e7aaf78a222dbe05633ad7e2570ee8': [
    { name: 'd', type: 'int256' },
    { name: 'e', type: 'string' },
  ],
  Document: [
    {
      name: 'a',
      type: '6bb8e24f15929234c3fe8719c84d8b075e7bb39c453543f72db333ce32e1cf37[]',
    },
    {
      name: 'b',
      type: '6bb8e24f15929234c3fe8719c84d8b075e7bb39c453543f72db333ce32e1cf37[]',
    },
    {
      name: 'c',
      type: '4dce06afdba8c29075ece9b2141a8ff0a7e7aaf78a222dbe05633ad7e2570ee8[]',
    },
  ],
};

export const SUCCESS_EXAMPLE_4 = {
  name: 'Arrays of objects',
  input: INPUT_4,
  output: OUTPUT_4,
};

// Example 5
// Real world example with a verifiable credential
const INPUT_5 = {
  '@context': ['https://schema.org', 'https://w3id.org/security/v2'],
  '@type': 'Person',
  name: {
    first: 'Jane',
    last: 'Doe',
  },
  otherData: {
    jobTitle: 'Professor',
    school: 'University of ExampleLand',
  },
  telephone: '(425) 123-4567',
  email: 'jane.doe@example.com',

  proof: {
    verificationMethod: 'did:fake' + '#controller',
    created: 'date: fake',
    proofPurpose: 'assertionMethod',
    type: 'EthereumEip712Signature2021',
  },
};

const OUTPUT_5 = {
  ...EIP712_DOMAIN,
  '6c4e2391495eadaa20662363e7be11495ed5f12ca10f814d506f05e1070dbc66': [
    { name: 'first', type: 'string' },
    { name: 'last', type: 'string' },
  ],
  '94db65fb3f1060270430f065c7b79931ce18daf2c2713f7156e3c72640220e1b': [
    { name: 'jobTitle', type: 'string' },
    { name: 'school', type: 'string' },
  ],
  '36377a8dabe5d3541720fd6b875acc44a5008cee08c1a9af175e4a878b88798b': [
    { name: 'verificationMethod', type: 'string' },
    { name: 'created', type: 'string' },
    { name: 'proofPurpose', type: 'string' },
    { name: 'type', type: 'string' },
  ],
  Document: [
    { name: '@context', type: 'string[]' },
    { name: '@type', type: 'string' },
    {
      name: 'name',
      type: '6c4e2391495eadaa20662363e7be11495ed5f12ca10f814d506f05e1070dbc66',
    },
    {
      name: 'otherData',
      type: '94db65fb3f1060270430f065c7b79931ce18daf2c2713f7156e3c72640220e1b',
    },
    { name: 'telephone', type: 'string' },
    { name: 'email', type: 'string' },
    {
      name: 'proof',
      type: '36377a8dabe5d3541720fd6b875acc44a5008cee08c1a9af175e4a878b88798b',
    },
  ],
};

export const SUCCESS_EXAMPLE_5 = {
  name: 'Verifiable credential example',
  input: INPUT_5,
  output: OUTPUT_5,
};

export const SUCCESS_TESTS = [
  SUCCESS_EXAMPLE_1,
  SUCCESS_EXAMPLE_2,
  SUCCESS_EXAMPLE_3,
  SUCCESS_EXAMPLE_4,
  SUCCESS_EXAMPLE_5,
];
