import { useState } from 'react'
import './App.css'
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'; 
import { UnsafeBurnerWalletAdapter} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton, WalletConnectButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Airdrop } from './Airdrop';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  // create your own rpc url --> using alchemy

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/6KFRUky2-NajzzLMRiKU5"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton></WalletMultiButton>
          <WalletDisconnectButton></WalletDisconnectButton>
          <div>
            Hi there from main page.
          </div>
          <Airdrop></Airdrop>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
