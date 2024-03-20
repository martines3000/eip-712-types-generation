import { describe, expect, test } from 'vitest';
import { EXAMPLE_1, EXAMPLE_2 } from './data';
import { getEthTypesFromInputDoc } from '../src/getEthTypesFromInputDoc';

const ALL_TESTS = [EXAMPLE_1, EXAMPLE_2];

describe('extra tests', () => {
  test.each(ALL_TESTS)('', ({ input, output }) => {
    const result = getEthTypesFromInputDoc(input);
    expect(result).toEqual(output);
  });
});
