import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, Copy, Info, HelpCircle, ArrowLeft, Clock, FileText, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  created: string;
  amount: string;
  currency: string;
  role: string;
  status: string;
  statusColor: string;
  buyer?: string;
  seller?: string;
  inspectionPeriod?: string;
  escrowFee?: string;
  disbursementFee?: string;
  subtotal?: string;
  total?: string;
  history?: { date: string; action: string }[];
}

const TransactionDetail: React.FC<{ transaction: Transaction; onBack: () => void }> = ({ transaction, onBack }) => {
  return (
    <div className="bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Concierge Notice */}
            <div className="bg-white border border-blue-200 rounded-lg p-4 flex items-start space-x-3 shadow-sm">
              <div className="p-2 bg-blue-50 rounded-full">
                <Info className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-[#225cab] text-sm">The Concierge Service may be applied to this transaction</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Escrow.com may assist in the safe and secure transfer of the domain name. 
                  Contact <span className="text-[#2f80ed]">concierge@escrow.com</span> to avail the <span className="text-[#08f]">Concierge</span> service.
                </p>
              </div>
            </div>

            {/* Transaction Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-medium text-[#225cab]">{transaction.title}</h2>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    Transaction #{transaction.id} 
                    <button className="ml-2 hover:text-gray-800" title="Copy ID">
                      <Copy className="w-3 h-3" />
                    </button>
                    
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                <span className="font-medium text-gray-800">{transaction.buyer}</span> is buying a <span className="font-medium text-gray-800">domain name</span> from <span className="font-medium text-gray-800">
                  {transaction.seller?.includes('(') ? (
                    <>
                      {transaction.seller.split('(')[0]}
                      <span className="text-[#2f80ed]">({transaction.seller.split('(')[1]}</span>
                    </>
                  ) : (
                    transaction.seller
                  )}
                </span>. 
                The <span className="font-medium text-gray-800">inspection period</span> for this transaction is <span className="font-medium text-gray-800">{transaction.inspectionPeriod}</span>.
              </p>

              <div className="mb-8">
                <span className={`inline-flex items-center px-3 py-1 rounded-full ${transaction.status === 'Cancelled' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-600'} text-xs font-medium`}>
                  <div className={`w-2 h-2 rounded-full ${transaction.statusColor} mr-2`}></div>
                  {transaction.status}
                </span>
              </div>

              <div className="border border-blue-100 bg-blue-50/30 rounded-lg p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-medium text-[#225cab] mb-2">
                    {transaction.status === 'Cancelled' ? 'This transaction has been cancelled.' : 'This transaction has been completed.'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {transaction.status === 'Cancelled' ? 'No action is required from you for now.' : 'Funds have been disbursed to the seller.'}
                  </p>
                </div>
                
                {/* Shield Watermark */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.05] pointer-events-none select-none">
                  <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 20C100 20 160 40 160 100C160 160 100 180 100 180C100 180 40 160 40 100C40 40 100 20 100 20Z" stroke="#225cab" strokeWidth="12"/>
                    <rect x="110" y="65" width="60" height="15" fill="#225cab" />
                    <rect x="110" y="92.5" width="60" height="15" fill="#225cab" />
                    <rect x="110" y="120" width="60" height="15" fill="#225cab" />
                    <path d="M110 80C90 80 80 90 80 100C80 110 90 120 110 120" stroke="#3bb75e" strokeWidth="12" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-[#225cab]" />
                <h3 className="font-medium text-[#225cab]">Item details</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm text-gray-800">{transaction.title}</div>
                    <div className="text-xs text-gray-500">{transaction.subtitle}</div>
                  </div>
                  <div className="font-medium text-sm text-gray-800">{transaction.subtotal || transaction.amount}</div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">{transaction.subtotal || transaction.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Escrow fee</span>
                    <span className={transaction.escrowFee === '$0' || transaction.escrowFee === '$0.00' ? 'text-gray-800' : 'text-red-500'}>
                      {transaction.escrowFee || '-$0.00'}
                    </span>
                  </div>
                  {transaction.disbursementFee && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Disbursement fee</span>
                      <span className="text-red-500">{transaction.disbursementFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    <span className="font-medium text-gray-800">Total (USD)</span>
                    <span className="font-medium text-gray-800">{transaction.total || transaction.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* History */}
            <div className="bg-[#eef7fe] border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="w-5 h-5 text-[#225cab]" />
                <h3 className="font-medium text-[#225cab]">History</h3>
              </div>
              <div className="space-y-6">
                {transaction.history?.map((event, idx) => (
                  <div key={idx} className="relative border-l-2 border-gray-100 pb-2 last:pb-0">
                    <div className="text-[11px] font-bold text-black-400 uppercase tracking-wider">{event.date}</div>
                    <div className="text-sm text-gray-700 mt-1">{event.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-[#eef7fe] border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-[#225cab]" />
                <h3 className="font-medium text-[#225cab]">Frequently asked questions</h3>
              </div>
              <button className="text-sm text-[#225cab] hover:underline">Need more help?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const tabs = ['All', 'Action Required', 'Open', 'Closed'];
  const navigate = useNavigate();
  const { transactionId } = useParams();

  const allTransactions: Transaction[] = [
    {
      id: '10142567',
      title: 'Royal Star',
      subtitle: 'Domain',
      created: 'Jan 22, 2026',
      amount: '$1,100.00',
      currency: 'USD',
      role: 'Buyer',
      status: 'Closed',
      statusColor: 'bg-green-500',
      buyer: 'Noman Murtaza (You)',
      seller: 'Ahmed Khan (ahmedkhan2001agency@gmail.com)',
      inspectionPeriod: '1 calendar day',
      escrowFee: '$0',
      subtotal: '$1,100.00',
      total: '$1,100.00',
      history: [
        { date: 'Jan 22, 2026, 8:45 PM GMT+5', action: 'Requested by seller' },
        { date: 'Jan 22, 2026, 8:15 PM GMT+5', action: 'Both parties have accepted the offer, awaiting buyer payment.' },
        { date: 'Jan 22, 2026, 6:30 PM GMT+5', action: 'Buyer has agreed to the terms of this transaction.' },
        { date: 'Jan 22, 2026, 5:49 PM GMT+5', action: 'Seller initiates the transaction' }
      ]
    }
  ];

  useEffect(() => {
    if (transactionId) {
      const transaction = allTransactions.find(t => t.id === transactionId);
      if (transaction) {
        setSelectedTransaction(transaction);
      } else {
        setSelectedTransaction(null);
      }
    } else {
      setSelectedTransaction(null);
    }
  }, [transactionId]);

  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/transactions/${transaction.id}`);
  };

  const handleBack = () => {
    navigate('/transaction');
  };

  const filteredTransactions = allTransactions.filter(t => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Action Required') return t.status === 'Action Required';
    if (activeTab === 'Open') return t.status === 'Open';
    if (activeTab === 'Closed') return t.status === 'Closed' || t.status === 'Cancelled';
    return true;
  });

  if (selectedTransaction) {
    return <TransactionDetail transaction={selectedTransaction} onBack={handleBack} />;
  }
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-6">
        <h1 className="text-4xl font-medium text-[#225cab] mb-10">My Transactions</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-10">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === tab ? 'text-[#225cab]' : 'text-gray-500 hover:text-[#225cab]'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#225cab]"></div>}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[400px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search transaction"
                className="block w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded focus:ring-[#3bb75e] focus:border-[#3bb75e] text-sm"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <span className="text-sm text-gray-500">You are viewing <span className="font-medium text-gray-800">{filteredTransactions.length}</span> transaction{filteredTransactions.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f3f4f9] text-[10px] font-medium text-gray-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-800">
                  <div className="flex items-center">
                    ID 
                    <div className="ml-2 flex flex-col space-y-[-4px]">
                      <ChevronDown className="w-2 h-2 rotate-180" />
                      <ChevronDown className="w-2 h-2" />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-800">
                  <div className="flex items-center">
                    TRANSACTION TITLE
                    <div className="ml-2 flex flex-col space-y-[-4px]">
                      <ChevronDown className="w-2 h-2 rotate-180" />
                      <ChevronDown className="w-2 h-2" />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-800">
                  <div className="flex items-center">
                    CREATED
                    <div className="ml-2 flex flex-col space-y-[-4px]">
                      <ChevronDown className="w-2 h-2 rotate-180" />
                      <ChevronDown className="w-2 h-2" />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-800">
                  <div className="flex items-center">
                    AMOUNT
                    <div className="ml-2 flex flex-col space-y-[-4px]">
                      <ChevronDown className="w-2 h-2 rotate-180" />
                      <ChevronDown className="w-2 h-2" />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-800">
                  <div className="flex items-center">
                    ROLE
                    <div className="ml-2 flex flex-col space-y-[-4px]">
                      <ChevronDown className="w-2 h-2 rotate-180" />
                      <ChevronDown className="w-2 h-2" />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-800">
                  <div className="flex items-center">
                    STATUS
                    <div className="ml-2 flex flex-col space-y-[-4px]">
                      <ChevronDown className="w-2 h-2 rotate-180" />
                      <ChevronDown className="w-2 h-2" />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    onClick={() => handleTransactionClick(transaction)}
                    className="hover:bg-gray-50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-8 text-sm font-medium text-gray-800">
                      <div className="flex items-center group/id">
                        {transaction.id}
                        <a 
                          href={`https://www.escrow.com/transaction/${transaction.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-2 opacity-0 group-hover/id:opacity-100 transition-opacity text-[#007bff]"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <div className="font-medium text-sm text-gray-800">{transaction.title}</div>
                      <div className="text-xs text-gray-500">{transaction.subtitle}</div>
                    </td>
                    <td className="px-6 py-8 text-sm text-gray-800">{transaction.created}</td>
                    <td className="px-6 py-8">
                      <div className="font-medium text-sm text-gray-800">{transaction.amount}</div>
                      <div className="text-[10px] text-gray-500 font-medium">{transaction.currency}</div>
                    </td>
                    <td className="px-6 py-8 text-sm text-gray-800">{transaction.role}</td>
                    <td className="px-6 py-8">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium whitespace-nowrap">
                        <div className={`w-2 h-2 rounded-full ${transaction.statusColor} mr-2`}></div>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-white">
              <div className="relative w-64 h-40 mb-8">
                {/* Handshake Illustration */}
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  {/* Left Person Silhouette */}
                  <circle cx="70" cy="35" r="12" fill="#4a5568" />
                  <path d="M45 100 L 45 65 Q 45 50 60 50 L 80 50 Q 95 50 95 65 L 95 100" fill="#4a5568" />
                  
                  {/* Right Person Silhouette */}
                  <circle cx="130" cy="35" r="12" fill="#e2e8f0" />
                  <path d="M105 100 L 105 65 Q 105 50 120 50 L 140 50 Q 155 50 155 65 L 155 100" fill="#e2e8f0" />
                  
                  {/* Handshake connection */}
                  <path d="M85 85 L 115 85" stroke="#4a5568" strokeWidth="10" strokeLinecap="round" />
                  
                  {/* Dollar Circle Overlay */}
                  <circle cx="100" cy="55" r="20" fill="#3bb75e" stroke="white" strokeWidth="3" />
                  <text x="100" y="62" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="sans-serif">$</text>
                </svg>
              </div>
              <p className="text-lg font-medium text-[#225cab] max-w-md mx-auto">
                There's nothing here yet. Click below to start a new transaction.
              </p>
              <button className="mt-6 px-8 py-3 bg-[#3bb75e] text-white font-medium rounded hover:bg-[#34a353] transition-colors shadow-sm">
                Start a New Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
