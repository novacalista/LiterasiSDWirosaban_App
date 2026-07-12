import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import Badge from './Badge';

const categoryColors = {
  Fiksi: 'from-pink-400 to-purple-500',
  Sains: 'from-cyan-400 to-blue-500',
  Sejarah: 'from-amber-400 to-orange-500',
};

export default function BookCard({ buku, compact = false }) {
  const [imgError, setImgError] = useState(false);
  const showImage = buku.coverUrl && !imgError;

  const cover = (iconSize) =>
    showImage ? (
      <img
        src={buku.coverUrl}
        alt={buku.judulBuku}
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
    ) : (
      <div className={`w-full h-full bg-gradient-to-br ${categoryColors[buku.kategori] || 'from-primary to-primary-dark'} flex items-center justify-center`}>
        <BookOpen size={iconSize} className="text-white/80" />
      </div>
    );

  if (compact) {
    return (
      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-soft">
        <div className="h-20">{cover(20)}</div>
        <div className="p-2">
          <p className="text-[11px] font-bold text-text-primary truncate">{buku.judulBuku}</p>
          <p className="text-[10px] text-text-muted truncate">{buku.penulis}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-soft">
      <div className="h-24">{cover(24)}</div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Badge variant="category">{buku.kategori}</Badge>
        </div>
        <p className="text-sm font-bold text-text-primary leading-5 line-clamp-2">{buku.judulBuku}</p>
        <p className="text-[11px] text-text-muted mt-1">{buku.penulis}</p>
      </div>
    </div>
  );
}
