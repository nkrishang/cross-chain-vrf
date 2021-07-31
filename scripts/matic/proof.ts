import { MaticPOSClient } from '@maticnetwork/maticjs'
import dotenv from 'dotenv'
dotenv.config()

async function main() {

  try {
    // let alchemyKey: string = process.env.ALCHEMY_KEY || "";
    // console.log('getting client: ', alchemyKey)
    
    const maticPOSClient = new MaticPOSClient({
        maticProvider: "https://rpc-mumbai.matic.today", // replace if using mainnet
        parentProvider: "https://rpc.slock.it/goerli", // replace if using mainnet
    });

    console.log('generating proof')
    const proof = await (maticPOSClient as any).posRootChainManager
    .customPayload(
      "0xc0404e98034978893d53f5524eb7b51a5317b9db5061d7d538fdbe528f0a156c", // replace with txn hash of sendMessageToRoot
      "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036" // SEND_MESSAGE_EVENT_SIG, do not change
    )
    
    console.log("Proof:", proof);
  } catch(err) {
    console.log(err)
  }
  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });