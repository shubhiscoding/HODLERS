import React, { useState } from 'react';
import { Wallet } from 'ethers'; // Import Wallet from ethers
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route from react-router-dom
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';
import WalletDisplay from './components/WalletDisplay';
import SendFunds from './components/SendFunds';
import ReceiveFunds from './components/ReceiveFunds';
import './App.css';
const App = () => {
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState(""); // Add privateKey state
  if(localStorage.getItem('privateKey') && (!privateKey || privateKey.length<=0)){
    setPrivateKey(localStorage.getItem('privateKey'));
  }
  let wallet;
  if(privateKey && privateKey.length>0 && window.location.pathname === '/'){
    wallet = new Wallet(privateKey);
    window.location.href = "/wallet-display";
  }
  const handleCreateWallet = (newAddress) => {
    setPrivateKey(localStorage.getItem('privateKey'));
    setAddress(wallet.address);
  };

  const handleImportWallet = (importedAddress) => {
    const privateKey = localStorage.getItem('privateKey');
    const wallet = new Wallet(privateKey);
    setAddress(wallet.address);
  };

  return (
    <Router>
      <div className="wallet-container">
        <h1>HODLERS</h1>
        {privateKey && privateKey.length>0 &&
        <button id='logout' onClick={() => {
          localStorage.removeItem('privateKey');
          window.location.href = '/';
        }}>Log Out</button>
        }
        <Routes>
          <Route path="/" element={!address ? (
            <div className="initial-actions">
              <div className='greets'>
                <h3>Welcome HODLERS!</h3>
                <p>How would you like to access your wallet?</p>
              </div>
              <CreateWallet onCreate={handleCreateWallet} />
            </div>
          ) : (
            <div className="wallet-content">
              <WalletDisplay address={address} />
              <SendFunds address={address} />
              <ReceiveFunds address={address} />
            </div>
          )} />
          <Route path="/import-wallet" element={<ImportWallet onImport={handleImportWallet} />} />
          <Route path="/wallet-display" element={<WalletDisplay address={address} />} />
          <Route path="/send-funds" element={<SendFunds address={address} />} />
          <Route path="/receive-funds" element={<div><style>{`div {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      padding: 2rem;
                    }`}</style> <ReceiveFunds address={address} /></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
