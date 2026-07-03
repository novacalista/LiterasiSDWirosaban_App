import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/authService';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import Login from './pages/Login';
import Beranda from './pages/Beranda';
import Siswa from './pages/Siswa';
import CatatAktivitas from './pages/CatatAktivitas';
import Buku from './pages/Buku';
import Laporan from './pages/Laporan';

function RootRedirect() {
  return isAuthenticated() ? <Navigate to="/beranda" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <AuthenticatedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/siswa" element={<Siswa />} />
        <Route path="/catat-aktivitas" element={<CatatAktivitas />} />
        <Route path="/buku" element={<Buku />} />
        <Route path="/laporan" element={<Laporan />} />
      </Route>
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
