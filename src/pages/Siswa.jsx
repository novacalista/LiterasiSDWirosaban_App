import { useState } from 'react';
import { Search, Plus, X, Check } from 'lucide-react';
import { getSiswa, saveSiswa, generateId } from '../services/dummyData';
import { Input, Button, StudentCard } from '../components';

export default function Siswa() {
  const [siswaList, setSiswaList] = useState(getSiswa);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [form, setForm] = useState({ namaSiswa: '', nis: '', kelas: '', alamat: '' });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const filtered = siswaList.filter(s =>
    s.namaSiswa.toLowerCase().includes(search.toLowerCase()) ||
    s.nis.includes(search)
  );

  const resetForm = () => {
    setForm({ namaSiswa: '', nis: '', kelas: '', alamat: '' });
    setErrors({});
    setEditData(null);
  };

  const openAdd = () => { resetForm(); setShowForm(true); };

  const openEdit = (s) => {
    setForm({ namaSiswa: s.namaSiswa, nis: s.nis, kelas: s.kelas, alamat: s.alamat || '' });
    setEditData(s);
    setErrors({});
    setShowForm(true);
  };

  const validate = () => {
    const errs = {};
    if (!form.namaSiswa.trim()) errs.namaSiswa = 'Nama siswa wajib diisi';
    if (!form.nis.trim()) errs.nis = 'NIS wajib diisi';
    if (!form.kelas.trim()) errs.kelas = 'Kelas wajib diisi';
    if (form.nis.trim()) {
      const dup = siswaList.find(s => s.nis === form.nis.trim() && (!editData || s.idSiswa !== editData.idSiswa));
      if (dup) errs.nis = 'NIS sudah terdaftar';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    let updated;
    if (editData) {
      updated = siswaList.map(s =>
        s.idSiswa === editData.idSiswa
          ? { ...s, namaSiswa: form.namaSiswa.trim(), nis: form.nis.trim(), kelas: form.kelas.trim(), alamat: form.alamat.trim() }
          : s
      );
    } else {
      const newSiswa = {
        idSiswa: generateId('S'),
        namaSiswa: form.namaSiswa.trim(),
        nis: form.nis.trim(),
        kelas: form.kelas.trim(),
        alamat: form.alamat.trim(),
        statusAktif: true,
      };
      updated = [...siswaList, newSiswa];
    }
    saveSiswa(updated);
    setSiswaList(updated);
    setShowForm(false);
    setSuccessMsg(editData ? 'Data siswa berhasil diperbarui' : 'Data siswa berhasil ditambahkan');
    setTimeout(() => setSuccessMsg(''), 3000);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold text-primary">Data Siswa</h1>

      {successMsg && (
        <div className="bg-success-light border border-success/30 rounded-lg p-3 text-center">
          <p className="text-sm font-bold text-success">{successMsg}</p>
        </div>
      )}

      <Input
        icon={Search}
        placeholder="Cari Nama atau NIS..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <Search size={32} className="mx-auto text-text-muted mb-2" />
          <p className="text-sm text-text-muted">
            {search ? 'Siswa tidak ditemukan' : 'Belum ada data siswa'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((s) => (
            <StudentCard key={s.idSiswa} siswa={s} onView={setViewData} onEdit={openEdit} />
          ))}
        </div>
      )}

      <button
        onClick={openAdd}
        className="fixed bottom-20 right-4 w-12 h-12 bg-primary rounded-full shadow-floating flex items-center justify-center text-white hover:bg-primary-dark transition-colors z-40"
        aria-label="Tambah Siswa"
      >
        <Plus size={22} />
      </button>

      {(showForm || viewData) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-surface w-full max-w-[390px] rounded-t-xl sm:rounded-xl p-5 max-h-[85vh] overflow-y-auto">
            {viewData ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-text-primary">Detail Siswa</h2>
                  <button onClick={() => setViewData(null)} className="text-text-muted"><X size={20} /></button>
                </div>
                <div className="space-y-3">
                  <div><span className="text-[11px] text-text-muted">Nama</span><p className="text-sm font-semibold">{viewData.namaSiswa}</p></div>
                  <div><span className="text-[11px] text-text-muted">NIS</span><p className="text-sm font-semibold">{viewData.nis}</p></div>
                  <div><span className="text-[11px] text-text-muted">Kelas</span><p className="text-sm font-semibold">{viewData.kelas}</p></div>
                  <div><span className="text-[11px] text-text-muted">Alamat</span><p className="text-sm font-semibold">{viewData.alamat || '-'}</p></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-text-primary">{editData ? 'Edit Siswa' : 'Tambah Siswa Baru'}</h2>
                  <button onClick={() => { setShowForm(false); resetForm(); }} className="text-text-muted"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input placeholder="Nama Lengkap" value={form.namaSiswa} onChange={(e) => setForm({...form, namaSiswa: e.target.value})} error={errors.namaSiswa} />
                  <Input placeholder="NIS" value={form.nis} onChange={(e) => setForm({...form, nis: e.target.value})} error={errors.nis} />
                  <Input placeholder="Kelas (contoh: 5A)" value={form.kelas} onChange={(e) => setForm({...form, kelas: e.target.value})} error={errors.kelas} />
                  <Input placeholder="Alamat (opsional)" value={form.alamat} onChange={(e) => setForm({...form, alamat: e.target.value})} />
                  <Button variant="positive" fullWidth type="submit">
                    <Check size={16} className="inline mr-1" /> {editData ? 'Simpan Perubahan' : 'Tambah Siswa'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
