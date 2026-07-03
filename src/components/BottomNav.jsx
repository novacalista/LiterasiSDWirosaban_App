import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, BookOpen, BarChart3 } from 'lucide-react';

const navItems = [
  { label: 'Beranda', icon: Home, path: '/beranda' },
  { label: 'Siswa', icon: Users, path: '/siswa' },
  null,
  { label: 'Buku', icon: BookOpen, path: '/buku' },
  { label: 'Laporan', icon: BarChart3, path: '/laporan' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[390px] mx-auto relative">
        <div className="flex items-center justify-around h-16 bg-surface rounded-t-xl shadow-nav px-2">
          {navItems.map((item) => {
            if (item === null) {
              return (
                <div key="center" className="relative flex items-center justify-center w-16">
                  <button
                    onClick={() => navigate('/catat-aktivitas')}
                    className="absolute -top-5 w-14 h-14 bg-primary rounded-full shadow-floating flex items-center justify-center text-white active:bg-primary-dark transition-colors"
                    aria-label="Catat Aktivitas"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              );
            }
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 min-w-0 transition-colors`}
              >
                <Icon size={20} className={isActive ? 'text-primary' : 'text-text-muted'} />
                <span className={`text-[10px] font-semibold leading-[14px] ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
