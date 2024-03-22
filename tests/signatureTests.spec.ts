import { describe, expect, test } from 'vitest';
import {
  SUCCESS_EXAMPLE_1,
  SUCCESS_EXAMPLE_2,
  SUCCESS_EXAMPLE_3,
  SUCCESS_EXAMPLE_4,
  SUCCESS_EXAMPLE_5,
} from './data';
import { getEthTypesFromInputDoc } from '../src';
import {
  signTypedData,
  SignTypedDataVersion,
  recoverTypedSignature,
} from '@metamask/eth-sig-util';

const TESTS = [
  SUCCESS_EXAMPLE_1,
  SUCCESS_EXAMPLE_2,
  SUCCESS_EXAMPLE_3,
  SUCCESS_EXAMPLE_4,
  SUCCESS_EXAMPLE_5,
];

const TEST_PRIVATE_KEY =
  'd3784a97aa3b86f6e32b01cfe5aae6b900508c7111fb4d46fe664af12fb089dc';

const TEST_ADDRESS = '0xdc2647338ee72d7097cdc8a268813a581c98f124';

describe('Test if data can be successfully signed', () => {
  test.each(TESTS)('$name', ({ input }) => {
    const types = getEthTypesFromInputDoc(input);

    // Create a typed message
    const typedMessage = {
      domain: {
        chainId: 1,
        name: 'Test',
        version: '1',
      },
      types,
      primaryType: 'Document',
      message: input,
    };

    // Sign the typed message
    const signature = signTypedData<SignTypedDataVersion.V4, any>({
      privateKey: Buffer.from(TEST_PRIVATE_KEY, 'hex'),
      data: typedMessage,
      version: SignTypedDataVersion.V4,
    });

    // Recover the address from the signature
    const recoveredAddress = recoverTypedSignature<
      SignTypedDataVersion.V4,
      any
    >({
      data: typedMessage,
      signature,
      version: SignTypedDataVersion.V4,
    });

    // Check if the recovered address is the same as the one used to sign the message
    expect(recoveredAddress).toBe(TEST_ADDRESS);
  });
});
