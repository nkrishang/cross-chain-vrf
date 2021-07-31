import hre from 'hardhat'
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

	await hre.run("verify:verify", {
    address:"", 
    constructorArguments: [
      fxChild
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