import { run, ethers } from "hardhat";
import { Contract, ContractFactory } from 'ethers';

import { fxPortalTestnets } from "../../utils/maticBridge"

async function main() {
  await run("compile");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${await deployer.getAddress()}`)

  // Deploy Child to Matic || Mumbai
  const { fxChild } = fxPortalTestnets;

  const FxStateChildTunnel_Factory: ContractFactory = await ethers.getContractFactory("FxStateChildTunnel");
  const childTunnel: Contract = await FxStateChildTunnel_Factory.deploy(fxChild);

  console.log("Deployed FxStateChildTunnel at: ", childTunnel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });