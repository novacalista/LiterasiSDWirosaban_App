import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Plus, Book, Megaphone, TrendingUp } from 'lucide-react';
import { getSiswa, getBuku, getAktivitas } from '../services/dummyData';
import { StatCard, ActivityCard } from '../components';

function getWeeklyActivities(aktivitas) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return aktivitas.filter(a => new Date(a.tanggal) >= startOfWeek);
}

function getAverageDuration(aktivitas) {
  if (aktivitas.length === 0) return 0;
  const total = aktivitas.reduce((sum, a) => sum + a.durasiBaca, 0);
  return Math.round(total / aktivitas.length);
}

function getSiswaMap(siswaList) {
  const map = {};
  siswaList.forEach(s => { map[s.idSiswa] = s; });
  return map;
}

function getBukuMap(bukuList) {
  const map = {};
  bukuList.forEach(b => { map[b.idBuku] = b; });
  return map;
}

export default function Beranda() {
  const navigate = useNavigate();
  const siswaList = getSiswa().filter(s => s.statusAktif);
  const bukuList = getBuku();
  const aktivitas = getAktivitas();

  const activeSiswa = siswaList.length;
  const weeklyActivities = getWeeklyActivities(aktivitas);
  const weeklyBookCount = new Set(weeklyActivities.map(a => a.idBuku)).size;
  const avgDuration = getAverageDuration(aktivitas);
  const recentAktivitas = aktivitas.slice(0, 5);

  const siswaMap = getSiswaMap(siswaList);
  const bukuMap = getBukuMap(bukuList);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-primary">Perpustakaan</h1>
        <p className="text-xs text-text-secondary mt-0.5 leading-4">
          Semangat membantu siswa menjelajahi jendela dunia hari ini!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Users} value={activeSiswa} label="Siswa Aktif" />
        <StatCard icon={BookOpen} value={weeklyBookCount} label={<>Buku Terbaca<br />Minggu Ini</>} />
        <StatCard icon={Clock} value={`${avgDuration} mnt`} label={<>Rata-rata<br />Durasi Baca</>} />
      </div>

      <div>
        <h2 className="text-base font-bold text-text-primary mb-3">Aksi Cepat</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/catat-aktivitas')}
            className="bg-primary text-white rounded-lg p-4 text-left shadow-soft hover:bg-primary-dark transition-colors"
          >
            <BookOpen size={20} className="mb-2" />
            <p className="text-sm font-bold">Catat Aktivitas</p>
            <p className="text-[11px] text-white/80 leading-4">Catat kegiatan membaca siswa</p>
          </button>
          <button
            onClick={() => navigate('/siswa')}
            className="bg-secondary text-white rounded-lg p-4 text-left shadow-soft hover:bg-secondary-dark transition-colors"
          >
            <Plus size={20} className="mb-2" />
            <p className="text-sm font-bold">Tambah Siswa Baru</p>
            <p className="text-[11px] text-white/80 leading-4">Tambahkan data siswa baru</p>
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-3 shadow-soft">
        <div className="flex items-start gap-2">
          <Megaphone size={16} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-text-primary">Pengumuman</p>
            <p className="text-[11px] text-text-secondary leading-4 mt-0.5">
              Program literasi bulan ini: Ajak siswa membaca minimal 15 menit setiap hari untuk mendapatkan sertifikat literasi!
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-base font-bold text-text-primary mb-3">Aktivitas Terkini</h2>
        {recentAktivitas.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <TrendingUp size={32} className="mx-auto text-text-muted mb-2" />
            <p className="text-sm text-text-muted">Belum ada data aktivitas membaca</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentAktivitas.map((a) => (
              <ActivityCard
                key={a.idAktivitas}
                aktivitas={a}
                siswa={siswaMap[a.idSiswa]}
                buku={bukuMap[a.idBuku]}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-primary rounded-lg p-4 text-white text-center shadow-soft">
        <Book size={24} className="mx-auto mb-2" />
        <p className="text-sm font-bold">"Buku adalah jendela dunia"</p>
        <p className="text-[11px] text-white/80 mt-1">Ayo tingkatkan literasi siswa SDN Wirosaban!</p>
      </div>
    </div>
  );
}
