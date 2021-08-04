import { run, ethers } from "hardhat";
import { Contract, ContractFactory } from 'ethers';

import { fxPortalTestnets } from "../../utils/maticBridge" 

async function main() {
  await run("compile");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${await deployer.getAddress()}`)

  // Deploy Root to Mainnet || Goerli
  const { checkPointManager, fxRoot, fxERC1155Goerli } = fxPortalTestnets;

  const FxERC1155RootTunnel_Factory: ContractFactory = await ethers.getContractFactory("FxERC1155RootTunnel");
  const rootTunnel: Contract = await FxERC1155RootTunnel_Factory.deploy(checkPointManager, fxRoot, fxERC1155Goerli)

  console.log("Deployed FxERC1155RootTunnel at: ", rootTunnel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });