# Cross Chain VRF

Use Chainlink VRF on Polygon (Matic) for contracts on Ethereum mainnet.

The contracts use Polygon's [FX portal](https://github.com/fx-portal/contracts) to pass messages between Ethereum and Polygon. The messages passed between the chains is requests for random numbers (from Ethereum to Polygon) and random numbers derived from Chainlink VRF on Polygon that fulfill those requests (from Polygon to Etheruem).

## Deployments

### Goerli
`VRFRootTunnel.sol`: [0x8faD543dEecf009a37f24De9926e288c3C384adD](https://goerli.etherscan.io/address/0x8faD543dEecf009a37f24De9926e288c3C384adD#code)

### Mumbai
`VRFChildTunnel.sol`: [0x4d475d62A03386F14949aeadB86e1Bcb506A2AE8](https://mumbai.polygonscan.com/address/0x4d475d62A03386F14949aeadB86e1Bcb506A2AE8#code)

## Run locally

Clone the repository.

```bash
git clone https://github.com/nkrishang/cross-chain-vrf.git
```

Install the dependencies. 

```bash
yarn install
```

Deploy the project

```bash
npx hardhat run scripts/deploy/root.ts --network goerli
```

```bash
npx hardhat run scripts/deploy/child.ts --network mumbai
```

Verify the deployed contracts:

- In your `hardhat.config.ts` set the Etherscan API key to verify contracts on Ethereum mainnet or goerli, and the Polygonscan API key
to verify contracts on matic or mumbai.

- Run the following (e.g. verifying `VRFRootTunnel.sol` on goerli)

```bash
npx hardhat run tasks/verify.ts --network goerli
```

Smart contract code in `/contracts`, tasks in `/tasks` and scripts in `/scripts`
