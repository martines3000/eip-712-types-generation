import { describe, expect, test } from 'vitest';
import { SUCCESS_TESTS, FAILURE_TESTS } from './data';
import { getEthTypesFromInputDoc } from '../src';

describe('EIP712 types generation tests', () => {
  describe('Success tests', () => {
    test.each(SUCCESS_TESTS)('$name', ({ input, output }) => {
      const result = getEthTypesFromInputDoc(input);
      expect(result).toEqual(output);
    });
  });

  describe('Failure tests', () => {
    test.each(FAILURE_TESTS)('$name', ({ input, output }) => {
      expect(() => getEthTypesFromInputDoc(input)).toThrow(output);
    });
  });
});
