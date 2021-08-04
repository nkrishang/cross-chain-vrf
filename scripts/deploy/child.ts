import { run, ethers } from "hardhat";
import { Contract, ContractFactory } from 'ethers';

import { fxPortalTestnets } from "../../utils/maticBridge"

async function main() {
  await run("compile");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${await deployer.getAddress()}`)

  // Deploy Child to Matic || Mumbai
  const { fxChild, fxERC1155Mumbai } = fxPortalTestnets;

  const FxERC1155ChildTunnel_Factory: ContractFactory = await ethers.getContractFactory("FxERC1155ChildTunnel");
  const childTunnel: Contract = await FxERC1155ChildTunnel_Factory.deploy(fxChild, fxERC1155Mumbai);

  console.log("Deployed FxERC1155ChildTunnel at: ", childTunnel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });