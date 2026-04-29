import { useState } from 'react'
import { userInfo } from '../data/data.js'
import toast from 'react-hot-toast';
import moment from 'moment';

const Modal = ({ action_type, onTransactionComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setAmount('');
  };

  // local storage
  const getInfo = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  };
  
  const handleDeposit = (e) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const info = getInfo();
    info.accountBalance += parseFloat(amount);
    info.transactions.push({
      id: Date.now(),
      type: "deposit",
      amount: parseFloat(amount),
      date: moment().format("MMMM D, YYYY"),
      description: "Deposit"
    });
    
    // Save to localStorage
    localStorage.setItem("userInfo", JSON.stringify(info));
    toast.success("Deposit successful");
    onTransactionComplete?.();

    closeModal();
  }

  const handleWithdraw = (e) => {
    e.preventDefault();
    console.log("Withdraw clicked");
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (userInfo.accountBalance < parseFloat(amount)) {
      toast.error("Insufficient balance");
      return;
    }
    
    const info = getInfo();
    info.accountBalance -= parseFloat(amount);
    info.transactions.push({
      id: Date.now(),
      type: "withdrawal",
      amount: parseFloat(amount),
      date: moment().format("MMMM D, YYYY"),
      description: "Withdrawal"
    });
    
    // Save to localStorage
    localStorage.setItem("userInfo", JSON.stringify(info));
    console.log("Withdraw successful", userInfo.accountBalance);
    toast.success("Withdraw successful");
    onTransactionComplete?.();

    closeModal();
  }

  // Deposit Modal Button
  const depositButton = (
    <button className='cursor-pointer' onClick={openModal}>
      <div className="bg-green-100 p-3 rounded-full">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
    </button>
  );

  // Withdraw Modal Button
  const withdrawButton = (
    <button className='cursor-pointer' onClick={openModal}>
      <div className="bg-red-100 p-3 rounded-full">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </div>
    </button>
  );

  // Deposit Modal Content
  const depositModal = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-800">Add the amount you want to deposit!</h3>
        <form onSubmit={handleDeposit}>
          <input 
            type="number" 
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border outline-none border-gray-300 rounded-lg" 
            step="0.01"
            min="0"
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button 
              type='submit' 
              className='bg-green-700 hover:bg-green-800 cursor-pointer text-white px-4 py-2 rounded-lg transition-colors'
            >
              Deposit
            </button>
            <button 
              type="button"
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-lg transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Withdraw Modal Content
  const withdrawModal = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-800">Enter the amount you want to withdraw!</h3>
        <form onSubmit={handleWithdraw}>
          <input 
            type="number" 
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border outline-none border-gray-300 rounded-lg" 
            step="0.01"
            min="0"
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button 
              type='submit' 
              className='bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-lg transition-colors'
            >
              Withdraw
            </button>
            <button 
              type="button"
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-lg transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {action_type === "deposit" && depositButton}
      {action_type === "withdraw" && withdrawButton}
      
      {isOpen && action_type === "deposit" && depositModal}
      {isOpen && action_type === "withdraw" && withdrawModal}
    </>
  );
}

export default Modal;
