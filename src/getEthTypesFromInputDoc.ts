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

// Given an Input Document, generate the corresponding EIP-712 types
function getEthTypesFromInputDocHelper(
  input: unknown,
  primaryType: string,
  forceInt256 = false
): Map<string, TypedDataField[]> {
  const output = new Map<string, TypedDataField[]>();
  const types = new Array<TypedDataField>();

  const entries = Object.entries(input);

  for (const [key, value] of entries) {
    const valueType = typeof value;
    switch (valueType) {
      case 'boolean':
        types.push({ name: key, type: 'bool' });
        continue;
      case 'number':
      case 'bigint':
        types.push({
          name: key,
          type: (value as any) < 0 || forceInt256 ? 'int256' : 'uint256',
        });
        continue;
      case 'string':
        types.push({ name: key, type: 'string' });
        continue;
      case 'object': {
        if (Array.isArray(value)) {
          if (value.length === 0) throw new Error('Array with length 0 found');
          const arrayFirstType = typeof value[0];

          let recursiveTypes: Map<string, TypedDataField[]> | null = null;
          let firstElementTypesHash: string | null = null;

          // Objects nested in arrays will only have int256 number type
          if (arrayFirstType === 'object') {
            if (Array.isArray(value[0])) {
              // TODO: Add support for nested arrays
              throw new Error('Nested arrays not supported yet');
            }

            const tempPrimaryType = bytesToHex(randomBytes(32));

            recursiveTypes = getEthTypesFromInputDocHelper(
              value[0],
              tempPrimaryType,
              true // We force int256 for nested objects in arrays
            );

            const primaryTypes = recursiveTypes.get(tempPrimaryType);
            const typeName = bytesToHex(sha256(JSON.stringify(primaryTypes)));

            // Set new type name that is the hash of the types
            recursiveTypes.set(typeName, primaryTypes);

            // Remove the temporary primary type
            recursiveTypes.delete(tempPrimaryType);

            firstElementTypesHash = typeName;
          }

          let anyValueNegative = false;

          // Check if all elements in the array are of the same type
          for (const arrayEntry of value) {
            const arrayEntryType = typeof arrayEntry;
            if (arrayFirstType !== arrayEntryType) {
              throw new Error('Array elements of different types found');
            }

            if (
              !anyValueNegative &&
              (arrayEntryType === 'number' || arrayEntryType === 'bigint')
            ) {
              if (arrayEntry < 0) {
                anyValueNegative = true;
              }
            }

            if (arrayFirstType === 'object') {
              const tempPrimaryType = bytesToHex(randomBytes(32));

              const tempRecursiveTypes = getEthTypesFromInputDocHelper(
                arrayEntry,
                tempPrimaryType,
                true // We force int256 for nested objects in arrays
              );

              const primaryTypes = tempRecursiveTypes.get(tempPrimaryType);

              const typeName = bytesToHex(sha256(JSON.stringify(primaryTypes)));

              // Set new type name that is the hash of the types
              tempRecursiveTypes.set(typeName, primaryTypes);

              // Remove the temporary primary type
              tempRecursiveTypes.delete(tempPrimaryType);

              const arrayEntryTypesHash = bytesToHex(
                sha256(JSON.stringify(primaryTypes))
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
              types.push({
                name: key,
                type:
                  anyValueNegative || forceInt256 ? 'int256[]' : 'uint256[]',
              });
              continue;
            case 'string':
              types.push({ name: key, type: 'string[]' });
              continue;
            case 'object': {
              types.push({ name: key, type: `${firstElementTypesHash}[]` });

              for (const [k, v] of recursiveTypes) {
                output.set(k, v);
              }

              continue;
            }
            default:
              throw new Error('Array with elements of unsupported type found');
          }
        }

        const tempPrimaryType = bytesToHex(randomBytes(32));
        const recursiveTypes = getEthTypesFromInputDocHelper(
          value,
          tempPrimaryType
        );

        const primaryTypes = recursiveTypes.get(tempPrimaryType);
        const typeName = bytesToHex(sha256(JSON.stringify(primaryTypes)));

        // Set new type name that is the hash of the types
        recursiveTypes.set(typeName, primaryTypes);

        // Remove the temporary primary type
        recursiveTypes.delete(tempPrimaryType);

        types.push({ name: key, type: typeName });

        for (const [k, v] of recursiveTypes) {
          output.set(k, v);
        }

        continue;
      }
      default:
        throw new Error('Unsupported type found');
    }
  }

  output.set(primaryType, types);

  return output;
}
