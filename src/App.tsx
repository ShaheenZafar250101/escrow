import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Transactions from './pages/Transactions';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: 'Noman Murtaza',
    email: 'nomanmurtaza95@gmail.com'
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Transactions />
        )}
      </main>

      {isLoggedIn && <Footer />}
    </div>
  );
}
