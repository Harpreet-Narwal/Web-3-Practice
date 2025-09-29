import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import {Wallet, HDNodeWallet} from "ethers"


export function EthWallet({mnemonic}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddesses] = useState([]);

    return (
        <div>
            <button onClick={ async function() {
                const seed = await mnemonicToSeed(mnemonic);
                const derivedPath = `m/44'/60'/${currentIndex}'/0'`;
                const hdNode = HDNodeWallet.fromSeed(seed);
                const child = hdNode.derivePath(derivedPath);
                const privateKey = child.privateKey;
                const wallet = new Wallet(privateKey);
                setCurrentIndex(currentIndex + 1);
                setAddesses([...addresses, wallet.address]);
            }}>
                Add ETH Wallet
            </button>

            {addresses.map(p => <div>
                    Eth - {p}
                </div>
            )}
        </div>
    )
}

