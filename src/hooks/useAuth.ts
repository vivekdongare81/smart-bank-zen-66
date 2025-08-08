import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/lib/storage';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.isLoggedIn) {
      navigate('/auth');
    }
  }, [navigate]);
};

export const useAuth = () => {
  return getCurrentUser();
};