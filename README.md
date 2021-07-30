# Cross Chain VRF

Use Chainlink VRF on Polygon (Matic) for contracts on Ethereum mainnet.

The contracts use Polygon's [FX portal](https://github.com/fx-portal/contracts) to pass messages between Ethereum and Polygon. The messages passed between the chains is requests for random numbers (from Ethereum to Polygon) and random numbers derived from Chainlink VRF on Polygon that fulfill those requests (from Polygon to Etheruem).

Clone the repository.

```bash
git clone https://github.com/nkrishang/cross-chain-vrf.git
```

Install the dependencies. 

```bash
yarn install
```

Smart contract code in `/contracts`, tests in `/test` and scripts in `/scripts`
