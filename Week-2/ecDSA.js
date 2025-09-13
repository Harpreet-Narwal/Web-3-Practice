// USING ETHER:

import {ethers} from "ethers";

const wallet = ethers.Wallet.createRandom(); // Generate Random Wallet

// Extract the public and private keys
const publicKey = wallet.address;
const privateKey = wallet.privateKey;

console.log("Public Key(Address) :", publicKey);
console.log("Private Key: ", privateKey);

//Message to sign
const message = "hello world";

const signature = await wallet.signMessage(message);
console.log("Signature : ", signature);

// Verify the signature:

const recoveredAddress = ethers.verifyMessage(message, signature);

console.log("Recovered Address: ", recoveredAddress );
console.log("Signature is Valid: " , recoveredAddress === publicKey);
