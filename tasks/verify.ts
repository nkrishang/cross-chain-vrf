import hre from 'hardhat'

import { chainlinkVarsMumbai } from '../utils/chainlink'
import { fxPortalTestnets } from '../utils/maticBridge'

async function Root() {

	const { checkPointManager, fxRoot } = fxPortalTestnets

	await hre.run("verify:verify", {
    address:"0x8faD543dEecf009a37f24De9926e288c3C384adD", 
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
    address:"0x4d475d62A03386F14949aeadB86e1Bcb506A2AE8", 
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