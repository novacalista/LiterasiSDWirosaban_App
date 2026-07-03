import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import BottomNav from './BottomNav';

export default function AuthenticatedLayout() {
  return (
    <div className="mobile-container min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 content-padding content-pb">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
