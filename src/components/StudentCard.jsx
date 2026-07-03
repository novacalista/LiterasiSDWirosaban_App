import { Eye, Edit2 } from 'lucide-react';
import Badge from './Badge';
import Button from './Button';

export default function StudentCard({ siswa, onView, onEdit }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-3 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-primary truncate">{siswa.namaSiswa}</p>
          <p className="text-[11px] text-text-muted">NIS: {siswa.nis}</p>
        </div>
        <Badge variant="kelas" className="shrink-0 ml-2">{siswa.kelas}</Badge>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Button variant="secondary" size="sm" onClick={() => onView(siswa)}>
          <Eye size={12} className="inline mr-1" /> Lihat
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onEdit(siswa)}>
          <Edit2 size={12} className="inline mr-1" /> Edit
        </Button>
      </div>
    </div>
  );
}
