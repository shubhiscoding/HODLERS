import React, { useState } from 'react';
import { Wallet } from 'ethers';
import '../Style/import.css';
const ImportWallet = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const importWallet = () => {
    let greets = document.getElementsByClassName('greets');
    if(greets.length>0)
    greets[0].style.display = 'none';
    try {
      if(seedPhrase && privateKey){
        throw new Error('Please enter either private key or seed phrase');
      }
      let walletTemp;
      if(privateKey){
        walletTemp = new Wallet(privateKey);
      }
      if(seedPhrase){
         walletTemp = Wallet.fromMnemonic(seedPhrase);
      }
      const wallet = walletTemp;
      // Validate the imported wallet
      if (!wallet.address) {
        throw new Error('Invalid private key or Seed Phrase');
      }

      setAddress(wallet.address);

      // Securely store the private key in browser extension storage (not shown here)
      localStorage.setItem('privateKey', wallet.privateKey); // Replace with secure storage

      // Display the imported address (replace with UI element)
      console.log('Imported Address:', wallet.address);
      window.location.href = '/wallet-display';
    } catch (error) {
      console.error('Error importing wallet:', error);
      setError(error.message);
      // Handle errors appropriately (display error message to user)
    }
  };

  return (
    <div id='importWallet'>
      <label htmlFor="privateKeyInput">Enter Private Key:</label>
      <input
        type="text"
        id="privateKeyInput"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />
      <h2> OR </h2>
      <label htmlFor="SeedPhraseInput">Enter Seed Phrase:</label>
      <input
        type="text"
        id="SeedPhraseInput"
        value={seedPhrase}
        onChange={(e) => setSeedPhrase(e.target.value)}
      />
      <button onClick={importWallet}>Import Wallet</button>
      {address && <p>Imported Address: {address}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImportWallet;
