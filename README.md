# eip-712-types-generation

This package serves to generate a Types object compatible with EIP-712 ( https://w3c-ccg.github.io/ethereum-eip712-signature-2021-spec/ )

## Usage

Import `getEthTypesFromInputDoc` into your project and pass in the `message` that you intend to sign using EIP-712. This will return an object that can be used as the `types` object passed into `eth_signTypedDatav4`

## Developing

### Commands

- `pnpm install` - Install dependencies
- `pnpm build` - Build the project
- `pnpm test` - Run tests
- `pnpm lint` - Lint the project
- `pnpm lint:fix` - Fix linting issues

### Tools used

- Node.js
- Pnpm
- TypeScript
- Tsup
- Vitest
- Biome
