import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Wallet, utils } from 'ethers';
import '../Style/create.css';

const CreateWallet = () => {
  let greets = document.getElementsByClassName('greets');
  if(greets.length>0)
  greets[0].style.display = 'none';
  const [mnemonic, setMnemonic] = useState('');
  const [walletadd, setAddress] = useState('');
  const [warning, setWarning] = useState(false);
  const [copy, setCopy] = useState('');
  const [create, setCreate] = useState(false);
  const createWallet = async () => {
    setCreate(true);
    const mnemonicPhrase = utils.randomBytes(32);
    try {
      const wallet = Wallet.fromMnemonic(
        utils.entropyToMnemonic(mnemonicPhrase)
      );
      setMnemonic(wallet.mnemonic.phrase);

      // Securely store the private key in browser extension storage (not shown here)
      localStorage.setItem('privateKey', wallet.privateKey); // Replace with secure storage
      // Display the generated address (replace with UI element)
      console.log('Address:', wallet.address);
      setAddress(wallet.address);
      setWarning(true);
      let createbtn = document.getElementById('createbtn');
      createbtn.style.display = 'none';
      
      let importbtn = document.getElementById('importbtn');
      importbtn.style.display = 'none';
    } catch (error) {
      console.error('Error creating wallet:', error);
    } 
  };
  
  const handleCopySeed = () => {
    const seedPhrase = mnemonic; // Replace with your seed phrase state variable
    navigator.clipboard.writeText(seedPhrase)
      .then(() => {
        console.log("Seed phrase copied to clipboard");
        setCopy('Seed Phrase is Copied To Your Clipboard!');
        // setMnemonic("Seed Phrase is Copied To Your Clipboard!");
      })
      .catch(err => {
        console.error("Error copying seed phrase:", err);
      });
  };

  return (
    <div id='createWallet'>
      <div id='texts'>
        {walletadd && <p> You wallet address: {walletadd}</p>}
        {warning && <p style={{ color: 'red' }}>Please store your seed phrase & Private Key securely in a safe location and never share it with anyone.</p>}
        {mnemonic && <p id='seed'>{mnemonic}</p>}
        {copy && <p style={{color:'red'}}>{copy}</p>}
        {mnemonic && <button id='copyKeys' onClick={handleCopySeed}>Copy</button>}
      </div>
      <div id='buttons'>
        <button id='createbtn' onClick={createWallet}>Create Wallet</button>
        <button id='importbtn' onClick={function(){
          window.location.href = '/import-wallet';
        }}>Import Wallet</button>
        {create && <button onClick={function(){
          alert('Your seed phrase has been generated, copy it to your clipboard. And Please store it securely in a safe location and never share it with anyone.');
          window.location.href = '/wallet-display';}}>
            Next
        </button>}
      </div>
    </div>
  );
};

export default CreateWallet;
