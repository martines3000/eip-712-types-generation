import { canonicalize } from 'json-canonicalize';
import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex, randomBytes } from '@noble/hashes/utils';

interface TypedDataField {
  name: string;
  type: string;
}

export function getEthTypesFromInputDoc(
  input: object,
  primaryType = 'Document'
): object {
  const res = getEthTypesFromInputDocHelper(input, primaryType);

  let obj = Object.fromEntries(res);
  obj = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
    ],
    ...obj,
  };
  return obj;
}

// Given an Input Document, generate Types according to type generation algorithm specified in EIP-712 spec:
// https://w3c-ccg.github.io/ethereum-eip712-signature-2021-spec/#ref-for-dfn-types-generation-algorithm-2
function getEthTypesFromInputDocHelper(
  input: unknown,
  primaryType: string,
  useHashing = false
): Map<string, TypedDataField[]> {
  const output = new Map<string, TypedDataField[]>();
  const types = new Array<TypedDataField>();

  const canonicalizedInput = JSON.parse(canonicalize(input));
  const entries = Object.entries(canonicalizedInput);

  for (const [key, value] of entries) {
    const valueType = typeof value;
    switch (valueType) {
      case 'boolean':
        types.push({ name: key, type: 'bool' });
        continue;
      case 'number':
      case 'bigint':
        types.push({ name: key, type: 'uint256' });
        continue;
      case 'string':
        types.push({ name: key, type: 'string' });
        continue;
      case 'object': {
        if (Array.isArray(value)) {
          if (value.length === 0) throw new Error('Array with length 0 found');
          const arrayFirstType = typeof value[0];

          let recursiveTypes: TypedDataField[] | null = null;
          let firstElementTypesHash: string | null = null;

          if (arrayFirstType === 'object') {
            const tempPrimaryType = bytesToHex(randomBytes(32));

            recursiveTypes = getEthTypesFromInputDocHelper(
              value[0],
              tempPrimaryType
            ).get(tempPrimaryType);

            firstElementTypesHash = bytesToHex(
              sha256(JSON.stringify(recursiveTypes))
            );
          }

          // Check if all elements in the array are of the same type
          for (const arrayEntry of value) {
            if (arrayFirstType !== typeof arrayEntry) {
              throw new Error('Array elements of different types found');
            }

            if (arrayFirstType === 'object') {
              const tempPrimaryType = bytesToHex(randomBytes(32));

              recursiveTypes = getEthTypesFromInputDocHelper(
                arrayEntry,
                tempPrimaryType
              ).get(tempPrimaryType);

              const arrayEntryTypesHash = bytesToHex(
                sha256(JSON.stringify(recursiveTypes))
              );

              if (arrayEntryTypesHash !== firstElementTypesHash) {
                throw new Error('Array elements of different types found');
              }
            }
          }

          switch (arrayFirstType) {
            case 'boolean':
              types.push({ name: key, type: 'bool[]' });
              continue;
            case 'number':
            case 'bigint':
              types.push({ name: key, type: 'uint256[]' });
              continue;
            case 'string':
              types.push({ name: key, type: 'string[]' });
              continue;
            case 'object': {
              const typeName = useHashing
                ? firstElementTypesHash
                : key.charAt(0).toUpperCase() + key.substring(1);
              types.push({ name: key, type: `${typeName}[]` });
              output.set(firstElementTypesHash!, recursiveTypes!);
              continue;
            }
            default:
              throw new Error('Array with elements of unknown type found');
          }
        }

        const tempPrimaryType = bytesToHex(randomBytes(32));
        const recursiveTypes = getEthTypesFromInputDocHelper(
          value,
          tempPrimaryType
        ).get(tempPrimaryType);

        const hash = bytesToHex(sha256(JSON.stringify(recursiveTypes)));

        const typeName = useHashing
          ? hash
          : key.charAt(0).toUpperCase() + key.substring(1);
        types.push({ name: key, type: typeName });
        output.set(useHashing ? hash : typeName, recursiveTypes!);
        continue;
      }
      default:
        throw new Error('Unsupported type');
    }
  }

  output.set(primaryType, types);
  return output;
}
