import hre from 'hardhat'
import { fxPortalTestnets } from '../utils/maticBridge'

async function Root() {

	const { checkPointManager, fxRoot } = fxPortalTestnets

	await hre.run("verify:verify", {
    address:"0xC89498663Ff36F3c3Ed735979dF5574471819263", 
    constructorArguments: [
      checkPointManager,
			fxRoot
    ],
  });
}

async function Child() {

	const { fxChild } = fxPortalTestnets

	await hre.run("verify:verify", {
    address:"0xBa2b61ca39dd6a5D7a135d4B5D3aadDec2B472da", 
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