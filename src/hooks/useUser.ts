import { useEffect, useState } from 'react';
import { fetchUserInfo, logoutUser } from '../services/authService';
import { User } from '../interfaces/UserInterface';

interface UseUserResult {
  user: User | null;
  loading: boolean;
  handleLogout: () => void;
}

export const useUser = (): UseUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token)
        .then((data) => {
          if (data) {
            setUser({
              userId: data.userId,
              username: data.username,
              email: data.email,
            });
          }
        })
        .catch((error) => console.error('Error fetching user info:', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); 
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      await logoutUser();
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };
  return { user, loading, handleLogout };
};
