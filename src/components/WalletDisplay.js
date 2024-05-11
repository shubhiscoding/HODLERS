import React, { useState, useEffect } from 'react';
import { Wallet, providers } from 'ethers'; // Import providers from ethers
import '../Style/display.css';

const WalletDisplay = ({ address }) => {
  const [currentProvider, setCurrentProvider] = useState('Ethereum');
  const [Address, setAddress] = useState(null);
  const [Balance, setBalance] = useState(null);
  const [Symbol, setSymbol] = useState(null);
  useEffect(() => {
    const getAddressAndBalance = async () => {
      try {
        const privateKey = localStorage.getItem('privateKey');
        const wallet = new Wallet(privateKey);
        let decimals = 1;
        // Set the provider based on the selected blockchain network
        let provider;
        if (currentProvider === 'Ethereum') {
          provider = providers.getDefaultProvider(); // Default Ethereum provider
          decimals = 18;
          setSymbol('ETH');
        } else if (currentProvider === 'Binance Smart Chain') {
          provider = new providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
          decimals = 18;
          setSymbol('BNB');
        } else if (currentProvider === 'Sepolia ETH') {
            provider = new providers.JsonRpcProvider('https://rpc.sepolia.ethpandaops.io');
            decimals = 18;
            setSymbol('ETH');
        } else if (currentProvider === 'Meter Testnet') {
            provider = new providers.JsonRpcProvider('https://rpctest.meter.io/');
            decimals = 18;
            setSymbol('MTR');
        }
        // You can add more else-if conditions for other blockchain networks
        const connectedWallet = wallet.connect(provider);
        setAddress(connectedWallet.address);
        const balance = await connectedWallet.getBalance()/10**decimals;
        console.log('Balance:', balance);
        setBalance((balance).toFixed(4));
      } catch (error) {
        console.error('Error fetching Address and Balance:', error);
      }
    };

    getAddressAndBalance();
  }, [currentProvider]); // Add currentProvider as a dependency for useEffect

  const handleProviderChange = (event) => {
    setCurrentProvider(event.target.value);
  };

  return (
    <div className='displayWallet'>
      <label htmlFor="providerSelect">Select Blockchain Network:</label>
      <select id="providerSelect" value={currentProvider} onChange={handleProviderChange}>
        <option value="Ethereum">Ethereum</option>
        <option value="Binance Smart Chain">Binance Smart Chain</option>
        <option value="Sepolia ETH">Sepolia ETH</option>
        <option value="Meter Testnet">Meter Testnet</option>
        {/* Add more options for other blockchain networks */}
      </select>
      <p>{Address}</p>
      <h1>{Balance && Balance.toString()} {Symbol}</h1>
      <div className='buttons'>
        <button onClick={function(){
          window.location.href = '/send-funds';
        }}>Send Funds</button>
        <button id='receivebtn' onClick={function(){
          window.location.href = '/receive-funds';
        }}>Receive Funds</button>
      </div>
    </div>
  );
};

export default WalletDisplay;
