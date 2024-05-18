/* Why is the private key of the 0th account exposed? */
import { ethers, formatEther, parseEther } from "ethers";

const alice = "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec"
const k_alice = "0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd"

const bob = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const signer = await provider.getSigner();

const a_wallet = new ethers.Wallet(k_alice, provider);

async function send(to: string, amt: string) {
    const txRequest = {
	    from: alice,
	    to: to,
	    value: parseEther(amt),
     }

  // When sending a transaction, the value is in wei, so parseEther
  // converts ether to wei.
  const txResponse = await a_wallet.sendTransaction(txRequest);

  // Often you may wish to wait until the transaction is mined
  const receipt = await txResponse.wait();

  return receipt
}

var abalance = await provider.getBalance(alice);
console.log(`alice: ${formatEther(abalance)}`);

var bbalance = await provider.getBalance(bob);
console.log(`bob: ${formatEther(bbalance)}`);


console.log("transacting")
await send(bob,"1.0")

abalance = await provider.getBalance(alice);
console.log(`alice: ${formatEther(abalance)}`);

bbalance = await provider.getBalance(bob);
console.log(`bob: ${formatEther(bbalance)}`);
