// components in react, are very similar to creating your own HTML tag

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";

// The useWallet 'Hook' 'provides' the wallet variable inside the Airdrop 'Component'
// Beacuse I wrapped the Airdrop component inside the Wallet provider

// export function Airdrop(){
// // hoos in react

//     const wallet = useWallet();
//     const [lamports, SetLamports] = useState(0);
//     const { connection } = useConnection();

//     async function sendAirdropToUser(){
//        await connection.requestAirdrop(wallet.publicKey, lamports * 1e9);
       
//        alert("airdropped sol");
//     }
 

//     return <div>
//         <input type="text" placeholder="Amount" value={lamports} onChange={(e) => {
//             SetLamports(e.target.value)
//         }}></input>
//         <button onClick={sendAirdropToUser}>Send Airdrop</button>
//     </div>
// }

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }

    return <div>
        <br/><br/>
        <input id="amount" type="text" placeholder="Amount" />
        <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
}