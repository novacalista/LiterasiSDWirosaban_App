import { useState, useMemo } from 'react';
import { Printer, BookOpen, Clock, Users, Book, TrendingUp } from 'lucide-react';
import { getAktivitas, getSiswa, getBuku } from '../services/dummyData';
import { ReportCard, Button } from '../components';

function getFavBook(bukuList, aktivitas) {
  if (bukuList.length === 0 || aktivitas.length === 0) return null;
  const counts = {};
  aktivitas.forEach(a => { counts[a.idBuku] = (counts[a.idBuku] || 0) + 1; });
  const maxId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  return bukuList.find(b => b.idBuku === maxId) || null;
}

function getMonthlyChartData(aktivitas) {
  const monthMap = {};
  aktivitas.forEach(a => {
    const month = a.tanggal.substring(0, 7);
    monthMap[month] = (monthMap[month] || 0) + 1;
  });
  const entries = Object.entries(monthMap).sort();
  if (entries.length === 0) return [];
  return entries.slice(-6).map(([month, count]) => ({
    month,
    label: month.split('-')[1] + '/' + month.split('-')[0].slice(2),
    count,
  }));
}

function getSiswaAktifCount(aktivitas) {
  return new Set(aktivitas.map(a => a.idSiswa)).size;
}

function getKoleksiTerbacaCount(aktivitas) {
  return new Set(aktivitas.map(a => a.idBuku)).size;
}

export default function Laporan() {
  const [printError, setPrintError] = useState('');
  const aktivitas = getAktivitas();
  const siswaList = getSiswa();
  const bukuList = getBuku();

  const handlePrint = () => {
    setPrintError('');
    try { window.print(); }
    catch (_) { setPrintError('Fitur cetak tidak tersedia pada browser ini'); }
  };

  const totalAktivitas = aktivitas.length;
  const totalDurasiMenit = aktivitas.reduce((sum, a) => sum + a.durasiBaca, 0);
  const totalDurasiJam = (totalDurasiMenit / 60).toFixed(1);
  const siswaAktif = getSiswaAktifCount(aktivitas);
  const totalSiswa = siswaList.filter(s => s.statusAktif).length;
  const koleksiTerbaca = getKoleksiTerbacaCount(aktivitas);
  const totalBuku = bukuList.length;
  const koleksiPersen = totalBuku > 0 ? Math.round((koleksiTerbaca / totalBuku) * 100) : 0;
  const favBook = useMemo(() => getFavBook(bukuList, aktivitas), [bukuList, aktivitas]);
  const chartData = useMemo(() => getMonthlyChartData(aktivitas), [aktivitas]);

  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  const kpiData = [
    { label: 'Total Laporan', value: totalAktivitas, icon: BookOpen, iconBg: 'bg-primary-light', iconColor: 'text-primary' },
    { label: 'Total Durasi Kolektif', value: `${totalDurasiJam} Jam`, icon: Clock, iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
    { label: 'Siswa Aktif', value: `${siswaAktif} / ${totalSiswa}`, icon: Users, iconBg: 'bg-success-light', iconColor: 'text-success' },
    { label: 'Koleksi Terbaca', value: `${koleksiPersen}%`, icon: Book, iconBg: 'bg-warning-light', iconColor: 'text-warning' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Laporan Literasi</h1>
          <p className="text-xs text-text-secondary mt-0.5 leading-4">
            Ringkasan aktivitas membaca siswa SDN Wirosaban
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Button onClick={handlePrint}>
            <Printer size={16} className="inline mr-1" /> Cetak
          </Button>
          {printError && <p className="text-[11px] text-danger">{printError}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {kpiData.map((kpi) => (
          <ReportCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="bg-surface border border-border rounded-lg p-4 shadow-soft">
        <h2 className="text-sm font-bold text-text-primary mb-3">Laporan Bulan Ini</h2>
        {chartData.length === 0 ? (
          <div className="py-6 text-center">
            <TrendingUp size={28} className="mx-auto text-text-muted mb-2" />
            <p className="text-xs text-text-muted">Belum ada data laporan</p>
          </div>
        ) : (
          <div className="flex items-end gap-2 h-28">
            {chartData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-text-primary">{d.count}</span>
                <div
                  className="w-full bg-primary rounded-t-md transition-all"
                  style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: '4px' }}
                />
                <span className="text-[9px] text-text-muted">{d.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-primary rounded-lg p-4 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={18} className="text-white/80" />
          <h2 className="text-sm font-bold text-white">Buku Terfavorit</h2>
        </div>
        {favBook ? (
          <div className="flex items-start gap-3">
            <div className={`w-14 h-14 rounded-md bg-gradient-to-br ${
              favBook.kategori === 'Fiksi' ? 'from-pink-400 to-purple-500' :
              favBook.kategori === 'Sains' ? 'from-cyan-400 to-blue-500' :
              'from-amber-400 to-orange-500'
            } flex items-center justify-center shrink-0`}>
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-white">{favBook.judulBuku}</p>
              <p className="text-[11px] text-white/80">{favBook.penulis} - {favBook.kategori}</p>
              <p className="text-xs text-yellow-300 mt-1">{favBook.jumlahDibaca} kali dibaca</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/70">Belum ada buku terfavorit</p>
        )}
      </div>
    </div>
  );
}
