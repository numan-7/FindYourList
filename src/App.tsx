import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import './index.css';
import Nav from './components/Nav';
import { useUser } from './hooks/useUser';

const App: React.FC = () => {
  const { user, handleLogout } = useUser();

  useEffect(() => {
    document.title = "find your film";
  }, []);

  return (
    <BrowserRouter>
      <Nav 
        handleLogout={handleLogout} 
        user={user} 
      />
      <Routes>
        <Route path="/" element={<Home userId={user?.userId || ''} />} />
        {user ? (
          <Route path="/watchlist" element={<Watchlist userId={user.userId} />} />
        ) : (
          <Route path="*" element={<div>You must be logged in to view this page.</div>} /> 
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
