import hre from 'hardhat'
import { fxPortalTestnets } from '../utils/maticBridge'

async function Root() {

	const { checkPointManager, fxRoot, fxERC1155Goerli } = fxPortalTestnets

	await hre.run("verify:verify", {
    address:"0x394F760b187Ca06431F10DC24400ae5c8fa645f0", 
    constructorArguments: [
      checkPointManager,
			fxRoot,
      fxERC1155Goerli
    ],
  });
}

async function Child() {

	const { fxChild, fxERC1155Mumbai } = fxPortalTestnets

	await hre.run("verify:verify", {
    address:"0x95ffd2FE01cccA6FD935432345570a532ab35E96", 
    constructorArguments: [
      fxChild,
      fxERC1155Mumbai
    ],
  });
}

async function verify() {
  await Root()
//   await Child()
}

verify()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })