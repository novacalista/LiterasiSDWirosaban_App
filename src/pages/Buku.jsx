import { useState } from 'react';
import { Search, BookOpen, TrendingUp, Plus, X, Check } from 'lucide-react';
import { getBuku, saveBuku, generateId } from '../services/dummyData';
import { Input, Button, BookCard, Badge } from '../components';

const categories = ['Semua', 'Fiksi', 'Sains', 'Sejarah'];
const bookCategoryOptions = ['Fiksi', 'Sains', 'Sejarah'];

export default function Buku() {
  const [bukuList, setBukuList] = useState(getBuku);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ judulBuku: '', penulis: '', kategori: '' });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const sortedByRead = [...bukuList].sort((a, b) => b.jumlahDibaca - a.jumlahDibaca);
  const topBooks = sortedByRead.slice(0, 3);

  const filtered = bukuList.filter(b => {
    const matchSearch = b.judulBuku.toLowerCase().includes(search.toLowerCase()) ||
                        b.penulis.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'Semua' || b.kategori === activeCategory;
    return matchSearch && matchCategory;
  });

  const resetForm = () => {
    setForm({ judulBuku: '', penulis: '', kategori: '' });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!form.judulBuku.trim()) errs.judulBuku = 'Judul buku wajib diisi';
    if (!form.penulis.trim()) errs.penulis = 'Penulis wajib diisi';
    if (!form.kategori) errs.kategori = 'Kategori wajib dipilih';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newBuku = {
      idBuku: generateId('B'),
      judulBuku: form.judulBuku.trim(),
      penulis: form.penulis.trim(),
      kategori: form.kategori,
      coverUrl: '',
      jumlahDibaca: 0,
    };

    const updated = [...bukuList, newBuku];
    saveBuku(updated);
    setBukuList(updated);
    setShowForm(false);
    setSuccessMsg('Data buku berhasil ditambahkan');
    setTimeout(() => setSuccessMsg(''), 3000);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-primary">Katalog Buku</h1>
        <p className="text-xs text-text-secondary mt-0.5">Jelajahi koleksi buku perpustakaan</p>
      </div>

      {successMsg && (
        <div className="bg-success-light border border-success/30 rounded-lg p-3 text-center">
          <p className="text-sm font-bold text-success">{successMsg}</p>
        </div>
      )}

      <Input
        icon={Search}
        placeholder="Cari judul buku atau penulis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-primary-light text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {bukuList.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <BookOpen size={32} className="mx-auto text-text-muted mb-2" />
          <p className="text-sm text-text-muted">Belum ada data buku</p>
        </div>
      ) : (
        <>
          {topBooks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-warning" />
                <h2 className="text-base font-bold text-text-primary">Paling Sering Dibaca</h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {topBooks.map((b, i) => (
                  <div key={b.idBuku} className="relative">
                    <BookCard buku={b} compact />
                    {i === 0 && (
                      <Badge variant="popular" className="absolute top-1 left-1">
                        Popular
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-base font-bold text-text-primary mb-3">Koleksi Buku</h2>
            {filtered.length === 0 ? (
              <div className="bg-surface border border-border rounded-lg p-8 text-center">
                <Search size={32} className="mx-auto text-text-muted mb-2" />
                <p className="text-sm text-text-muted">Buku tidak ditemukan</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((b) => (
                  <BookCard key={b.idBuku} buku={b} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <button
        onClick={() => { resetForm(); setShowForm(true); }}
        className="fixed bottom-20 right-4 w-12 h-12 bg-primary rounded-full shadow-floating flex items-center justify-center text-white hover:bg-primary-dark transition-colors z-40"
        aria-label="Tambah Buku"
      >
        <Plus size={22} />
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-surface w-full max-w-[390px] rounded-t-xl sm:rounded-xl p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-text-primary">Tambah Buku Baru</h2>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="text-text-muted"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input placeholder="Judul Buku" value={form.judulBuku} onChange={(e) => setForm({...form, judulBuku: e.target.value})} error={errors.judulBuku} />
              <Input placeholder="Penulis" value={form.penulis} onChange={(e) => setForm({...form, penulis: e.target.value})} error={errors.penulis} />
              <div>
                <select
                  value={form.kategori}
                  onChange={(e) => setForm({...form, kategori: e.target.value})}
                  className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all ${
                    errors.kategori ? 'border-danger' : 'border-border'
                  } bg-surface text-text-primary focus:border-primary focus:ring-[3px] focus:ring-primary/12`}
                >
                  <option value="">-- Pilih Kategori --</option>
                  {bookCategoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.kategori && <p className="text-[11px] text-danger mt-1">{errors.kategori}</p>}
              </div>
              <Button variant="positive" fullWidth type="submit">
                <Check size={16} className="inline mr-1" /> Simpan
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
