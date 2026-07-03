import Badge from './Badge';

export default function ActivityCard({ aktivitas, siswa, buku }) {
  const isSelesai = aktivitas.status === 'Selesai';

  return (
    <div className="bg-surface border border-border rounded-lg p-3 shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-primary truncate">
            {siswa?.namaSiswa || 'Unknown'}
          </p>
          <p className="text-[11px] text-text-secondary truncate mt-0.5">
            {buku?.judulBuku || 'Unknown'}
          </p>
        </div>
        <Badge variant={isSelesai ? 'success' : 'warning'} className="shrink-0 ml-2">
          {aktivitas.status}
        </Badge>
      </div>
      <div className="flex items-center gap-3 mt-2 text-[11px] text-text-muted">
        <span>{aktivitas.tanggal}</span>
        <span className="w-1 h-1 rounded-full bg-text-muted" />
        <span>{aktivitas.durasiBaca} menit</span>
      </div>
    </div>
  );
}
