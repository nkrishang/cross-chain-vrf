import dotenv from 'dotenv'
dotenv.config()

import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "hardhat-abi-exporter";
import "@nomiclabs/hardhat-etherscan";

import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  matic: 137,
  mumbai: 80001,
};

// Ensure that we have all the environment variables we need.
let testPrivateKey: string = process.env.TEST_PRIVATE_KEY || "";
let alchemyKey: string = process.env.ALCHEMY_KEY || "";
let etherscanKey: string = process.env.ETHERSCAN_API_KEY || "";

function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  if (!alchemyKey) {
    throw new Error("Missing ALCHEMY_KEY");
  }
  let nodeUrl = (chainIds[network] == 137 || chainIds[network] == 80001) 
    ? `https://polygon-${network}.g.alchemy.com/v2/${alchemyKey}` 
    :  `https://eth-${network}.alchemyapi.io/v2/${alchemyKey}`;

  return {
    chainId: chainIds[network],
    url: nodeUrl,
    accounts: [`${testPrivateKey}`],
  };
}

const config: HardhatUserConfig = {
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.7.3",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  abiExporter: {
    flat: true,
  },
  etherscan: {
    apiKey: etherscanKey,
  },
};

if (testPrivateKey) {
  config.networks = {
    mainnet: createTestnetConfig("mainnet"),
    rinkeby: createTestnetConfig("rinkeby"),
    matic: createTestnetConfig("matic"),
    mumbai: createTestnetConfig("mumbai")
  };
}

export default config
