import React, {useEffect, useMemo } from 'react';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
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
            {/* App's components go here, nested within the context providers */}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

      </>
  )
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
    {publicKey?.toString()}
    <br></br>
    SOL Balance: {balance !== null ? balance / 1000_000_000 : 'Loading...'}
  </div>

}


export default App
