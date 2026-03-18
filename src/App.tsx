import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Transactions from './pages/Transactions';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState({
    name: 'Noman Murtaza',
    email: 'nomanmurtaza95@gmail.com'
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
        userName={user.name}
        userEmail={user.email}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/login" 
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/" 
            element={isLoggedIn ? <Transactions /> : <Navigate to="/login" state={{ from: location }} replace />} 
          />
          <Route 
            path="/transaction/:transactionId" 
            element={isLoggedIn ? <Transactions /> : <Navigate to="/login" state={{ from: location }} replace />} 
          />
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {isLoggedIn && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
