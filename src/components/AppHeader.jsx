import { useNavigate } from 'react-router-dom';
import { LogOut, Book } from 'lucide-react';
import { logout } from '../services/authService';

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center">
          <Book size={14} className="text-primary" />
        </div>
        <span className="text-sm font-bold text-primary">SDN Wirosaban</span>
      </div>
      <button onClick={handleLogout} className="text-text-muted hover:text-danger transition-colors" aria-label="Logout">
        <LogOut size={18} />
      </button>
    </header>
  );
}
