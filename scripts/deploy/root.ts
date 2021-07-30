import { run, ethers } from "hardhat";
import { Contract, ContractFactory } from 'ethers';

import { fxPortalTestnets } from "../../utils/maticBridge" 

async function main() {
  await run("compile");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${await deployer.getAddress()}`)

  // Deploy Root to Mainnet || Goerli
  const { checkPointManager, fxRoot } = fxPortalTestnets;

  const VRFRootTunnel_Factory: ContractFactory = await ethers.getContractFactory("VRFRootTunnel");
  const vrfRootTunnel: Contract = await VRFRootTunnel_Factory.deploy(checkPointManager, fxRoot)

  console.log("Deployed VRFRootTunnel at: ", vrfRootTunnel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });