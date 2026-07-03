import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Eye, EyeOff } from 'lucide-react';
import { login, isAuthenticated } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  if (isAuthenticated()) {
    navigate('/beranda', { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setAuthError('');

    const errs = {};
    if (!username.trim()) errs.username = 'Username wajib diisi';
    if (!password.trim()) errs.password = 'Password wajib diisi';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const result = login(username.trim(), password);
    if (result.success) {
      navigate('/beranda', { replace: true });
    } else {
      setAuthError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
            <Book size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-primary">
            Literasi Membaca
          </h1>
          <p className="text-sm text-text-secondary mt-1">SDN Wirosaban</p>
        </div>

        <div className="bg-surface rounded-lg border border-border shadow-soft p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all ${
                  errors.username ? 'border-danger' : 'border-border'
                } bg-surface text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-[3px] focus:ring-primary/12`}
              />
              {errors.username && <p className="text-[11px] text-danger mt-1">{errors.username}</p>}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all pr-10 ${
                  errors.password ? 'border-danger' : 'border-border'
                } bg-surface text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-[3px] focus:ring-primary/12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-[11px] text-danger mt-1">{errors.password}</p>}
            </div>

            {authError && (
              <p className="text-xs text-danger">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white text-sm font-bold py-3 rounded-md hover:bg-primary-dark transition-colors active:bg-primary-dark"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
