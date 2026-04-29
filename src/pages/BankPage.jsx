import Modal from '../components/Modal.jsx';
import { useState } from 'react';

const BankPage = () => {
    const [transitionVisible, setTransitionVisible] = useState(false);
	

    const handleViewTransaction = () => {
        setTransitionVisible(!transitionVisible);
    };

	const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null; 

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-orange-50 p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<header className="bg-white rounded-2xl shadow-lg p-6 mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Bank Dashboard</h1>
					<p className="text-gray-600 mt-2">Manage your finances with ease</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Sidebar - Account Actions */}
					<div className="lg:col-span-1 space-y-6">
						{/* Balance Card */}
						<div className="bg-linear-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
							<h2 className="text-lg font-semibold mb-2">Current Balance</h2>
							<p className="text-4xl font-bold">${userInfo?.accountBalance || 0}</p>
							<p className="text-green-100 mt-2">Available funds</p>
						</div>

						{/* Quick Actions */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
							
							<div className="space-y-4">
								<div className="border-2 border-green-200 rounded-xl p-4 hover:border-green-400 transition-colors">
									<div className="flex items-center justify-between">
										<div>
											<h4 className="font-semibold text-gray-800">Deposit</h4>
											<p className="text-sm text-gray-600">Add funds to your account</p>
										</div>
										
										<Modal action_type="deposit" />
									</div>
								</div>

								<div className="border-2 border-red-400 rounded-xl p-4 hover:border-red-500 transition-colors">
									<div className="flex items-center justify-between">
										<div>
											<h4 className="font-semibold text-gray-800">Withdraw</h4>
											<p className="text-sm text-gray-600">Take money from your account</p>
										</div>
										<Modal action_type="withdraw" />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content - Transaction History */}
					<div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
                            <button 
                            onClick={handleViewTransaction}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                                {transitionVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {transitionVisible ? <div className="bg-white rounded-2xl shadow-lg p-6">
							<div className="space-y-4">
								{/* Transaction Items */}
								{userInfo.transactions.map((transactions, index) => {
									return (
										<div key={index} className={transactions.type === "deposit" ? "border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg" : "border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"}>
											<div className="flex items-center justify-between">
												<div>
													<p className="font-semibold text-gray-800">{transactions.type}</p>
													<p className="text-sm text-gray-600">{transactions.date}</p>
												</div>
												<p className={transactions.type === "deposit" ? "text-xl font-bold text-green-600" : "text-xl font-bold text-red-600"}>{transactions.type === "deposit" ? "+" : "-"}{transactions.amount}</p>
											</div>
										</div>
									)
								})}
							</div>
						</div> : ""}
						
					</div>
				</div>
			</div>
		</div>
  )
}

export default BankPage