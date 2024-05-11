import React from 'react';
import QRCode from 'qrcode.react';
import { Wallet } from 'ethers';

const ReceiveFunds = ({ address }) => {
  const privateKey = localStorage.getItem('privateKey');
  const wallet = new Wallet(privateKey);
  return (
    <div className='receive'>
      <p>Your Address (For Receiving Funds):</p>
      <p>{wallet.address}</p>
      <QRCode value={wallet.address} size={256} level="H" />
    </div>
  );
};

export default ReceiveFunds;
