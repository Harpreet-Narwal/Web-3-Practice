import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {generateMnemonic} from "bip39";
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';

function App() {
  const [mnemonics, setMnemonics] = useState("");

  return (
    <>
      <button onClick={() =>{
        const mn = generateMnemonic();
        setMnemonics(mn);
      }}>
        Create Seed Phrase
      </button>

      <div className='mnemonic-grid'>
        {mnemonics.split(" ").map((word, index) =>(
          <span key={index} className='mnemonic-word'> 
            {index+1}.{word}
          </span>
        ))}
      </div>

      <div>
        <SolanaWallet></SolanaWallet>
      </div>
      <div>
        <EthWallet></EthWallet>
      </div>

    </>
  )
}

export default App
