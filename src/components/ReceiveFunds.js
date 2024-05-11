import React from 'react';
import QRCode from 'qrcode.react';
import { Wallet } from 'ethers';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import '../Style/receive.css';

const ReceiveFunds = ({ address }) => {
  const privateKey = localStorage.getItem('privateKey');
  const wallet = new Wallet(privateKey);
  return (
    <div className='receive'>
        <Link to="/wallet-display" className="backButtonrec">
          <FaTimes />
        </Link>
      <p>Your Address (For Receiving Funds):</p>
      <p>{wallet.address}</p>
      <div className='qr'>
        <QRCode value={wallet.address} size={256} level="H" />
      </div>
    </div>
  );
};

export default ReceiveFunds;
