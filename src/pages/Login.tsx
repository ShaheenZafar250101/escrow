import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('nomanmurtaza95@gmail.com');
  const [password, setPassword] = useState('Admin@1234');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'nomanmurtaza95@gmail.com' && password === 'Admin@1234') {
      onLogin();
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8f9fa] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[650px] bg-white rounded-lg shadow-sm border border-gray-200 p-12 mb-12">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-10">Login to Escrow.com</h1>
        
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded flex items-center text-sm">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Please enter your email address<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:ring-[#3bb75e] focus:border-[#3bb75e] text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Please enter your password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:ring-[#3bb75e] focus:border-[#3bb75e] text-gray-900"
              />
            </div>
          </div>

          <button 
            onClick={handleLogin}
            className="w-full bg-[#3bb75e] hover:bg-[#34a354] text-white py-3 rounded font-bold transition-colors"
          >
            Secure Login
          </button>

          <div className="text-center">
            <a href="#" className="text-sm text-[#007bff] hover:underline">Recover your password</a>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
            <span className="text-xs text-gray-400 font-bold">- OR -</span>
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
          </div>

          <button className="w-full border border-[#3bb75e] text-[#3bb75e] hover:bg-[#3bb75e]/5 py-3 rounded font-bold transition-colors">
            Register an Account
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center space-x-6 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
        <a href="#" className="hover:text-[#3bb75e]">Privacy Policy</a>
        <span className="opacity-20">|</span>
        <a href="#" className="hover:text-[#3bb75e]">Licenses and Complaints</a>
        <span className="opacity-20">|</span>
        <a href="#" className="hover:text-[#3bb75e]">Legal</a>
      </div>
      <p className="text-[10px] text-gray-400 mt-4">Copyright © 1999-2026 Escrow.com, Inc. All rights reserved</p>
    </div>
  );
};

export default Login;
