import React, { useState } from "react";
import { ethers, utils, providers } from "ethers";
import '../Style/send.css';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const SendFunds = ({ address }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("Ethereum"); // Default network
  const [paymentStatus, setPaymentStatus] = useState(""); // Add state for payment status
  const [txnHashUrl, setTxnHashUrl] = useState(""); // Add state for transaction hash URL
  const sendFunds = async () => {
    try {
      // Replace with secure storage retrieval of private key
      const privateKey = localStorage.getItem("privateKey"); // Replace with secure storage

      if (!privateKey) {
        throw new Error("No private key found");
      }

      let providerUrl;
      if (network === "Ethereum") {
        providerUrl = "https://rpc-testnet.morphl2.io"; // Ethereum testnet URL
        setTxnHashUrl("https://etherscan.io/tx/"); // Ropsten Etherscan URL
      } else if (network === "Binance Smart Chain") {
        providerUrl = "https://bsc-dataseed.binance.org/"; // BSC testnet URL
        setTxnHashUrl("https://testnet.bscscan.com/tx/"); // BSC testnet URL
      } else if (network === "Sepolia ETH") {
        providerUrl = "https://rpc.sepolia.ethpandaops.io"; // Sepolia ETH URL
        setTxnHashUrl("https://sepolia.etherscan.io/tx/"); // Sepolia Etherscan URL
      } else if (network === "Meter Testnet") {
        providerUrl = "https://rpctest.meter.io/"; // Meter testnet URL
        setTxnHashUrl("https://scan.testnet.meter.io/tx/"); // Meter testnet URL
      }
      let pdr = new ethers.providers.JsonRpcProvider(providerUrl);
      if(network === "Etherium"){
        pdr = providers.getDefaultProvider();
      }
      const provider = pdr;
      console.log("provider: ", provider);
      const wallet = new ethers.Wallet(privateKey);
      const signer = wallet.connect(provider);

      setPaymentStatus("Simulating transaction...");
      const tx = await signer.sendTransaction({
        to: recipient,
        value: utils.parseEther(amount),
      });
      if(recipient)
      console.log("Sending funds to ", recipient, " ...")
      setPaymentStatus("Sending funds to " + recipient + " ...");
      console.log("Transaction hash:", tx.hash);
      // Simulate transaction for demonstration (replace with actual provider interaction for real sending)
      await tx.wait();
      console.log("Transaction successful!");
      setPaymentStatus("Transaction successful! ");
      setTxnHashUrl(txnHashUrl + tx.hash);
      // Clear input fields after simulation
      setRecipient("");
      setAmount("");
    } catch (error) {
      console.error("Error sending funds:", error);
      if(error.message.includes("insufficient funds")){
        setPaymentStatus("Error sending funds: Insufficient funds");
      }else if(error.message.includes("invalid address") ||  error.message.includes("network does not support ENS")){
        setPaymentStatus("Error sending funds: Invalid recipient address");
      }else{
        setPaymentStatus("Error sending funds: Please try again later!");
      }
      // Handle errors appropriately (display error message to user)
    }
  };

  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <div className="SendFunds">
      <div>
        <Link to="/wallet-display" className="backButton">
          <FaTimes />
        </Link>
      </div>
      <div className="form">
      <label htmlFor="networkSelect">Select Blockchain Network:</label>
      <select id="networkSelect" value={network} onChange={handleNetworkChange}>
        <option value="Ethereum">Ethereum</option>
        <option value="Binance Smart Chain">Binance Smart Chain</option>
        <option value="Sepolia ETH">Sepolia ETH</option>
        {/* Add more options for other networks */}
      </select>
      </div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {paymentStatus && <p style={{color: 'red'}}>{paymentStatus}</p>}
      {paymentStatus.includes("Transaction successful! ") && txnHashUrl && <a href={txnHashUrl} target="blank">View On Explorer</a>}
      <div className="btns">
      <button onClick={sendFunds}>Send Funds</button>
      </div>
    </div>
  );
};

export default SendFunds;
