# Cross Chain VRF

Use Chainlink VRF on Polygon (Matic) for contracts on Ethereum mainnet.

The contracts use Polygon's [FX portal](https://github.com/fx-portal/contracts) to pass messages between Ethereum and Polygon. The messages passed between the chains is requests for random numbers (from Ethereum to Polygon) and random numbers derived from Chainlink VRF on Polygon that fulfill those requests (from Polygon to Etheruem).

## Deployments

### Goerli
`FxERC1155ChildTunnel.sol`: [0xC89498663Ff36F3c3Ed735979dF5574471819263](https://goerli.etherscan.io/address/0xC89498663Ff36F3c3Ed735979dF5574471819263#code)

### Mumbai
`FxStateChildTunnel.sol`: [0x394F760b187Ca06431F10DC24400ae5c8fa645f0](https://mumbai.polygonscan.com/address/0x394F760b187Ca06431F10DC24400ae5c8fa645f0#code)

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

- Run the following (e.g. verifying `FxStateRootTunnel.sol` on goerli)

```bash
npx hardhat run tasks/verify.ts --network goerli
```

Smart contract code in `/contracts`, tasks in `/tasks` and scripts in `/scripts`
