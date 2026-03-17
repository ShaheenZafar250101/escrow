import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, User, LogOut, ExternalLink, Globe, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userName?: string;
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogin, onLogout, userName, userEmail }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const menus = [
    {
      id: 'consumer',
      label: 'Consumer',
      items: [
        { title: 'Learn More', desc: 'How to use Escrow.com' },
        { title: 'Benefits', desc: 'See the advantages of using Escrow' },
        { title: 'Fees', desc: 'Low transparent fees' },
      ]
    },
    {
      id: 'broker',
      label: 'Broker',
      items: [
        { title: 'Learn More', desc: 'Learn how broker Escrow works' },
        { title: 'Become a Broker', desc: 'Act as a trusted third party' },
        { title: 'Fees', desc: 'Low transparent fees' },
      ]
    },
    {
      id: 'business',
      label: 'Business',
      items: [
        { title: 'Learn More', desc: 'How Escrow works for your business' },
        { title: 'Become a Partner', desc: 'Grow your business and revenue' },
        { title: 'Benefits', desc: 'See the advantages of using Escrow' },
        { title: 'Fees', desc: 'Low transparent fees' },
        { title: 'Escrow Pay', desc: 'Simplest way to add escrow payments' },
        { title: 'Escrow Offer', desc: 'Allow negotiation for your transactions' },
        { title: 'Escrow Buttons', desc: 'Create a button for Escrow transaction' },
        { title: 'Escrow API', desc: 'Get all benefits of Escrow via API' },
      ]
    },
    {
      id: 'developer',
      label: 'Developer',
      items: [
        { title: 'API Documentation', desc: 'Integrate Escrow into your app' },
        { title: 'Developer Tools', desc: 'Resources for building with Escrow' },
      ]
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        { title: 'What is Escrow?', desc: 'Learn how Escrow.com works' },
        { title: 'Fees', desc: 'Low transparent fees' },
        { title: 'Contact Us', desc: 'Get in touch with us' },
        { title: 'Call Us', desc: '+1-415-801-2270' },
        { title: 'Help Desk', desc: 'Find answers to FAQs' },
        { title: 'About Us', desc: 'Learn about our company' },
      ]
    }
  ];

  return (
    <nav className="bg-[#003b5c] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveMenu(null)}>
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mr-2">
              <div className="w-5 h-5 border-2 border-[#003b5c] rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-[#3bb75e]"></div>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">ESCROW<span className="text-[#3bb75e]">.COM</span></span>
            <span className="text-[10px] ml-1 opacity-60">TM</span>
          </div>

          {/* Nav Links */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-6">
              {menus.map((menu) => (
                <div 
                  key={menu.id}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(menu.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="flex items-center text-sm font-medium hover:text-[#3bb75e] transition-colors py-5">
                    {menu.label} <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${activeMenu === menu.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-sm font-medium border-b-2 border-[#3bb75e] py-5">My Transactions</button>
              <button className="text-sm font-medium hover:text-[#3bb75e] transition-colors py-5">My Integrations</button>
              <button className="text-sm font-medium hover:text-[#3bb75e] transition-colors py-5">Help</button>
              <button className="text-sm font-medium hover:text-[#3bb75e] transition-colors py-5">Contact Us</button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 cursor-pointer hover:text-[#3bb75e]" />
          
          {!isLoggedIn ? (
            <>
              <button onClick={onLogin} className="text-sm font-medium hover:text-[#3bb75e]">Login</button>
              <button className="text-sm font-medium hover:text-[#3bb75e]">Signup &rarr;</button>
            </>
          ) : (
            <>
              <button className="bg-[#3bb75e] hover:bg-[#34a354] text-white px-4 py-2 rounded font-bold text-sm transition-colors">
                Start New Transaction
              </button>
              <div className="relative flex items-center" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 group"
                >
                  <div className="w-10 h-10 min-w-[40px] flex-shrink-0 aspect-square bg-[#007bff] rounded-full flex items-center justify-center text-lg font-bold group-hover:ring-2 group-hover:ring-white transition-all overflow-hidden">
                    {userName?.charAt(0) || 'A'}
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-3 w-72 bg-white rounded-lg shadow-2xl text-gray-800 overflow-hidden z-[60]"
                    >
                      <div className="p-6 flex items-center space-x-4">
                        <div className="w-16 h-16 min-w-[64px] flex-shrink-0 aspect-square bg-[#007bff] rounded-full flex items-center justify-center text-xl font-bold text-white overflow-hidden">
                          {userName?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{userName || 'Abida Shaheen'}</h3>
                          <p className="text-sm text-gray-500">{userEmail || 'ounzee.3@gmail.com'}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-100">
                        <button className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center justify-between text-[#007bff] font-medium">
                          My Profile
                          <ChevronDown className="-rotate-90 w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            onLogout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-6 py-4 hover:bg-gray-50 text-[#007bff] font-medium border-t border-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dropdown Menus */}
      <AnimatePresence>
        {activeMenu && !isLoggedIn && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 w-full bg-[#003b5c] border-t border-white/10 overflow-hidden shadow-2xl"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-4 py-10">
              <div className="grid grid-cols-3 gap-8 mb-10">
                {menus.find(m => m.id === activeMenu)?.items.map((item, idx) => (
                  <div key={idx} className="cursor-pointer group">
                    <h4 className="font-bold text-sm mb-1 group-hover:text-[#3bb75e] transition-colors">{item.title}</h4>
                    <p className="text-xs text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="border border-white/20 rounded-lg p-6 flex items-center justify-between bg-white/5">
                <div>
                  <h4 className="font-bold text-sm mb-1">Start A Transaction With Escrow</h4>
                  <p className="text-xs text-gray-300">Sell, buy or broker anything from domain names to vehicles</p>
                </div>
                <button className="bg-[#3bb75e] hover:bg-[#34a354] text-white px-6 py-2 rounded font-bold text-sm transition-colors">
                  Get Started Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
