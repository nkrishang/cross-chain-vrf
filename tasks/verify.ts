import hre from 'hardhat'

import { chainlinkVarsMumbai } from '../utils/chainlink'
import { fxPortalTestnets } from '../utils/maticBridge'

async function Root() {

	const { checkPointManager, fxRoot } = fxPortalTestnets

	await hre.run("verify:verify", {
    address:"", 
    constructorArguments: [
        checkPointManager,
				fxRoot
    ],
  });
}

async function Child() {

	const { fxChild } = fxPortalTestnets
	const { vrfCoordinator, linkTokenAddress, keyHash, fees } = chainlinkVarsMumbai

	await hre.run("verify:verify", {
    address:"", 
    constructorArguments: [
      fxChild,
			vrfCoordinator,
    	linkTokenAddress,
    	keyHash,
    	fees
    ],
  });
}

async function verify() {
  await Root()
  await Child()
}

verify()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })