import React, {useEffect, useMemo } from 'react';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, PublicKey, SystemProgram, Transaction , LAMPORTS_PER_SOL} from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ed25519 } from '@noble/curves/ed25519'
import bs58 from 'bs58';

import { useState } from 'react'



function App() {
  const endpoint = "https://mainnet.helius-rpc.com/?api-key=b04d7878-63a6-45a2-bfe5-9c7fcd38c539" // slight security issues


  return (
    <>
    {/*<div>
       <b>
      <button onClick={() =>{
        if(window.backpack){
          setWallets(w => [...w, "backpack"])
        }
        if(window.solflare){
          setWallets(w => [...w, "solflare"]);
        }
        if(window.phantom){
          setWallets(w => [...w, "phantom"]);
        }
      }}>Connect with your wallet</button>
    </b>
    <div>
      {wallets.map(wallet => <button>{wallet}</button>)}
    </div> 
    </div>*/}

      {/* Boiler Plate */}
      {/* Context provider */}
      <ConnectionProvider endpoint={endpoint}> 
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Topbar />
            <Portfolio />
            <Send/>
            <br/>
            <SignMessage />
            {/* App's components go here, nested within the context providers */}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

      </>
  )
}

function Send(){

  const {publicKey, sendTransaction} = useWallet();
  const {connection} = useConnection();


  return <>
    <input id='address' type='text' placeholder='Wallet Address' />
    <input id='amount' type='text' placeholder='Amount'/>
    <button onClick={async () =>{ 

      const addressvalue = (document.getElementById("adddress") as HTMLElement).value;
      const amountValue = (document.getElementById("amount") as HTMLElement).value;

      const trasaction  = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: new PublicKey(addressvalue),
          lamports: amountValue * LAMPORTS_PER_SOL
        })
      )
      await sendTransaction(trasaction, connection)
    }}>Send SOL</button>
  </>
}


function SignMessage(){
  const { publicKey, signMessage } = useWallet();


  async function onClick(){
    if(!publicKey) throw new Error('Wallet not connected!');
    if(!signMessage) throw new Error('Wallet does not support message signin!');

    const message = (document.getElementById("message") as HTMLElement).value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid')

    alert('success', `Message signature: ${bs58.encode(signature)}`);
  }

  return <div>
    <input id='message' type='text' placeholder='Message'></input>
    <button onClick={onClick}>Sign Message</button>
  </div>
}

function Topbar(){

  const {publicKey} = useWallet();

  return <div style={{display:"flex", justifyContent:"flex-end"}}>
    { !publicKey && <WalletMultiButton />}
    {publicKey &&  <WalletDisconnectButton />}
  </div>

}

function Portfolio(){
  const {publicKey} = useWallet();
  const {connection} = useConnection();
  const [balance, setBalance] = useState<null | number>(null);

  useEffect(() =>{
    if(publicKey){
      connection.getBalance(publicKey)
      .then(balance => setBalance(balance))
    };
  }, [publicKey])  

  return <div>
    Address - {publicKey?.toString()}
    <br/>
    SOL Balance - {balance !== null ? balance / 1000_000_000 : 'Loading...'}
  </div>

}


export default App
