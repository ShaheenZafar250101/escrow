import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('nomanmurtaza95@gmail.com');
  const [password, setPassword] = useState('Admin@1234');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'nomanmurtaza95@gmail.com' && password === 'Admin@1234') {
      onLogin();
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f8f9fa] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-[1120px]">
          <div className="bg-white rounded shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden">
            <form onSubmit={handleLogin} className="py-20 px-[147px]">
              <h2 className="text-2xl font-bold text-[#333] mb-8 text-center">Login to Escrow.com</h2>
              
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <fieldset className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Please enter your email address<span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div className="h-5 w-[1px] bg-gray-200 ml-3"></div>
                    </div>
                    <input 
                      name="username" 
                      id="username" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-14 pr-4 py-3 border border-gray-300 rounded focus:ring-[#3bb75e] focus:border-[#3bb75e] text-gray-900 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Please enter your password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                      <div className="h-5 w-[1px] bg-gray-200 ml-3"></div>
                    </div>
                    <input 
                      name="password" 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-14 pr-4 py-3 border border-gray-300 rounded focus:ring-[#3bb75e] focus:border-[#3bb75e] text-gray-900 text-sm transition-all"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="mt-6 mb-6 flex justify-center">
                <div className="w-full max-w-[300px] h-[65px] bg-[#f9f9f9] border border-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400 font-medium">
                  Cloudflare Turnstile Verification Placeholder
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button 
                  type="submit"
                  className="w-full bg-[#3bb75e] hover:bg-[#34a354] text-white py-3 rounded font-bold transition-colors text-sm uppercase tracking-wider shadow-sm"
                >
                  Secure Login
                </button>
                <div className="text-center">
                  <a href="#" className="text-sm text-[#007bff] hover:underline transition-all">Recover your password</a>
                </div>
              </div>
            </form>

            <div className="px-[147px] pb-20">
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <span className="relative px-4 bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest">- OR -</span>
              </div>

              <button className="w-full border-2 border-[#3bb75e] text-[#3bb75e] hover:bg-[#3bb75e]/5 py-3 rounded font-bold transition-colors text-sm uppercase tracking-wider">
                Register an Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <nav className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#3bb75e] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#3bb75e] transition-colors">Licenses and Complaints</a>
            <a href="#" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#3bb75e] transition-colors">Legal</a>
          </nav>
          <p className="text-[11px] text-gray-400">Copyright © 1999-2026 Escrow.com, Inc. All rights reserved</p>
        </div>
      </footer>
    </main>
  );
};

export default Login;
