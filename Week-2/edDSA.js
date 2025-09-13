// import * as ed from "@noble/ed25519"

// async function main(){

//     const privateKey = ed.utils.randomSecretKey();
//     console.log("Private Key : " + Buffer.from(privateKey).toString("hex"));
//     let str = "hello world";

//     const message = new TextEncoder().encode(str);
//     console.log("--------------------------------")
//     // console.log("Message: " + Buffer.from(message).toString("base64"));


//     const pubKey = await ed.getPublicKeyAsync(privateKey);
//     console.log("--------------------------------")
//     console.log("Public Key : "  + pubKey);

//     const signature = await ed.signAsync(message, privateKey);
//     console.log("--------------------------------")
//     console.log("Signature: " + signature);

//     const isValid = await ed.verifyAsync(signature, message, pubKey);
    
//     console.log("--------------------------------")
//     console.log("isValid: " + isValid);

//     const decodedMessage = new TextDecoder().decode(message);
//     console.log(decodedMessage);

// }

// main();


// USING Solana lib:

import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

const keypair = Keypair.generate();

const publicKey = keypair.publicKey.toString();

const secretKey = keypair.secretKey;

console.log("Public Key: " + publicKey);

console.log("Private Key: " + secretKey);

const message = new TextEncoder().encode("hello world");

const signature = nacl.sign.detached(message, secretKey);
console.log(signature);

const result = nacl.sign.detached.verify(message, signature, keypair.publicKey.toBytes());

console.log(result);

