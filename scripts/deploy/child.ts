import { run, ethers } from "hardhat";
import { Contract, ContractFactory } from 'ethers';

import { fxPortalTestnets } from "../../utils/maticBridge"
import { chainlinkVarsMumbai } from "../../utils/chainlink" 

async function main() {
  await run("compile");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${await deployer.getAddress()}`)

  // Deploy Child to Matic || Mumbai
  const { fxChild } = fxPortalTestnets;
  const { vrfCoordinator, linkTokenAddress, keyHash, fees } = chainlinkVarsMumbai

  const VRFChildTunnel_Factory: ContractFactory = await ethers.getContractFactory("VRFChildTunnel");
  const vrfChildTunnel: Contract = await VRFChildTunnel_Factory.deploy(
    fxChild,
    vrfCoordinator,
    linkTokenAddress,
    keyHash,
    fees
  );

  console.log("Deployed VRFChildTunnel at: ", vrfChildTunnel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });