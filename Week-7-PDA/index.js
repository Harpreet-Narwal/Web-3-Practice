// // const { getAssociatedTokenAddress } = require("@solana/spl-token");
// // const {PublicKey} = require("@solana/web3.js")

// // async function main(){
// //     const address = await getAssociatedTokenAddress(
// //         new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
// //         new PublicKey("83xLLxgfCZszQg2UYwVAPYLZsDUv7xzz466B1VgTN7kt")
// //     );
// //     console.log(address.toBase58());
// // }

// // main();


// const { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
// const { getTokenBalance, getAssociatedTokenAddress, unpackAccount } = require("@solana/spl-token")

// const connection = new Connection("https://api.mainnet-beta.solana.com");

// // how would you send this jeypair (public Key) 1 SOL of an airdrop
// // can you airdrop on mainnet? no...
// // can you airdrop on devnet? yes

// // async function main(){
    // [197,14,210,32,55,209,108,246,20,218,186,70,222,91,145,248,176,44,206,219,199,79,106,112,60,189,216,2,172,104,9,141,78,69,53,164,186,161,44,133,184,139,114,244,232,111,191,192,91,4,192,220,14,68,161,10,56,93,108,219,180,149,225,145]
// //     const kp = Keypair.fromSecretKey(new Uint8Array([197,14,210,32,55,209,108,246,20,218,186,70,222,91,145,248,176,44,206,219,199,79,106,112,60,189,216,2,172,104,9,141,78,69,53,164,186,161,44,133,184,139,114,244,232,111,191,192,91,4,192,220,14,68,161,10,56,93,108,219,180,149,225,145]));
// //     const connection = new Connection("https://api.mainnet-beta.solana.com");
// //     // connection.requestAirdrop(kp.publicKey, LAMPORTS_PER_SOL * 0.1);

// //     const balance = await connection.getBalance(kp.publicKey); // 1 SOL
// //     console.log("Balance is: " + balance);
// // }

// async function getTokenBalance(publicKey, mintAddress){
    
//     // const ataAddress = await getAssociatedTokenAddress(mintAddress, publicKey);
//     // console.log(address.toBase58());
//     // public key -> 32 bytes/32 * 8 bits
//     // PDA --> No private Key...
//     const [ataAddress, bump] = await PublicKey.findProgramAddressSync(
//         [publicKey.toBuffer(), new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").toBuffer(), mintAddress.toBuffer()],
//         new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
//     );


//     const accountData = await connection.getAccountInfo(ataAddress);
//     console.log(accountData.data);
//     const innerData = unpackAccount(ataAddress, accountData);
//     console.log(innerData.amount);

// }   

// getTokenBalance(new PublicKey(), new PublicKey());
// // owner -> Token program.
// // main();



const { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const {Connection, Keypair, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL} = require("@solana/web3.js");

const connection = new Connection("https://api.devnet.solana.com");
const kp = Keypair.fromSecretKey(new Uint8Array([197,14,210,32,55,209,108,246,20,218,186,70,222,91,145,248,176,44,206,219,199,79,106,112,60,189,216,2,172,104,9,141,78,69,53,164,186,161,44,133,184,139,114,244,232,111,191,192,91,4,192,220,14,68,161,10,56,93,108,219,180,149,225,145]))


// NORMAL DATA ACCOUNT: NOT A PDA...
// async function main() {
//     const newAccountKepPair = Keypair.generate();

//     const transaction = new Transaction().add(
//         SystemProgram.createAccount({
//             fromPubkey: kp.publicKey,
//             newAccountPubkey: newAccountKepPair.publicKey,
//             lamports: 0.1 * LAMPORTS_PER_SOL,
//             space: 165,
//             programId: TOKEN_PROGRAM_ID
//         })
//     )

//     // transaction.recentBlockhash = await connection.getLatestBlockhash();

//     await connection.sendTransaction(transaction, [kp, newAccountKepPair]);
//     console.log(newAccountKepPair.publicKey.toBase58());
// }

// main();


// PDA: 
async function main() {
    const newAccountKepPair = Keypair.generate();
    const [randomPda] = PublicKey.findProgramAddressSync([], ASSOCIATED_TOKEN_PROGRAM_ID);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: kp.publicKey,
            newAccountPubkey: randomPda,
            lamports: 0.1 * LAMPORTS_PER_SOL,
            space: 165,
            programId: TOKEN_PROGRAM_ID
        })
    )

    // transaction.recentBlockhash = await connection.getLatestBlockhash();

    await connection.sendTransaction(transaction, [kp]);
    console.log(newAccountKepPair.publicKey.toBase58());
}

main();


// CPI: Cross program invocation --> Enable program sigin
// atp can cpi into System Program meaning it assumes that we signed on behave of the PDA and able to generate it/ create it.


//Sytem Program: Creating Accounts, Transferring sol, changing owner, changing space
// Token Program: Transfer(mint_adddress, sol, other_ata), delegate, freeze, unfreeze, changeMintAuthority
// Associated token Program: create, create_idemponet
