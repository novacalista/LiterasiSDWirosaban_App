import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { getSiswa, getBuku, addAktivitas, generateId } from '../services/dummyData';
import { Input, Button } from '../components';

export default function CatatAktivitas() {
  const navigate = useNavigate();
  const [siswaList, setSiswaList] = useState([]);
  const [bukuList, setBukuList] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    Promise.all([getSiswa(), getBuku()]).then(([siswa, buku]) => {
      setSiswaList(siswa.filter(s => s.statusAktif));
      setBukuList(buku);
    });
  }, []);

  const [form, setForm] = useState({
    idSiswa: '', idBuku: '', tanggal: today, durasiBaca: '', status: 'Masih Baca', catatan: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const canSubmit = siswaList.length > 0 && bukuList.length > 0;

  const validate = () => {
    const errs = {};
    if (!form.idSiswa) errs.idSiswa = 'Siswa wajib dipilih';
    if (!form.idBuku) errs.idBuku = 'Buku wajib dipilih';
    if (!form.tanggal) errs.tanggal = 'Tanggal wajib diisi';
    if (form.tanggal > today) errs.tanggal = 'Tanggal tidak boleh melebihi hari ini';
    if (!form.durasiBaca) errs.durasiBaca = 'Durasi wajib diisi';
    else if (Number(form.durasiBaca) <= 0) errs.durasiBaca = 'Durasi harus lebih dari 0 menit';
    if (!form.status) errs.status = 'Status wajib dipilih';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    await addAktivitas({
      idAktivitas: generateId('A'),
      idSiswa: form.idSiswa,
      idBuku: form.idBuku,
      tanggal: form.tanggal,
      durasiBaca: Number(form.durasiBaca),
      status: form.status,
      catatan: form.catatan,
    });

    setSuccess(true);
    setForm({ idSiswa: '', idBuku: '', tanggal: today, durasiBaca: '', status: 'Masih Baca', catatan: '' });
    setErrors({});
    setTimeout(() => navigate('/beranda'), 1500);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-primary">Catat Aktivitas</h1>
        <p className="text-xs text-text-secondary mt-0.5 leading-4">
          Yuk, masukkan progres membaca siswa hari ini untuk meningkatkan literasi sekolah!
        </p>
      </div>

      {success && (
        <div className="bg-success-light border border-success/30 rounded-lg p-3 text-center">
          <p className="text-sm font-bold text-success">Aktivitas membaca berhasil disimpan</p>
          <p className="text-[11px] text-text-secondary mt-1">Mengalihkan ke Beranda...</p>
        </div>
      )}

      {!canSubmit && (
        <div className="bg-warning-light border border-warning/30 rounded-lg p-3 text-center">
          <p className="text-sm font-semibold text-[#92400E]">
            {siswaList.length === 0 && bukuList.length === 0
              ? 'Belum ada data siswa dan buku. Silakan tambah data terlebih dahulu.'
              : siswaList.length === 0
                ? 'Belum ada data siswa. Silakan tambah siswa terlebih dahulu.'
                : 'Belum ada data buku. Silakan tambah buku terlebih dahulu.'}
          </p>
        </div>
      )}

      <div className="bg-surface border border-border rounded-lg shadow-soft p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-text-secondary uppercase block mb-1">Pilih Siswa</label>
            {siswaList.length === 0 ? (
              <div className="w-full h-[42px] px-3 rounded-md border border-border bg-surface/50 flex items-center">
                <span className="text-sm text-text-muted">Belum ada data siswa</span>
              </div>
            ) : (
              <select
                value={form.idSiswa}
                onChange={(e) => setForm({...form, idSiswa: e.target.value})}
                className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all ${
                  errors.idSiswa ? 'border-danger' : 'border-border'
                } bg-surface text-text-primary focus:border-primary focus:ring-[3px] focus:ring-primary/12`}
              >
                <option value="">-- Pilih Siswa --</option>
                {siswaList.map(s => (
                  <option key={s.idSiswa} value={s.idSiswa}>{s.namaSiswa} - {s.kelas}</option>
                ))}
              </select>
            )}
            {errors.idSiswa && <p className="text-[11px] text-danger mt-1">{errors.idSiswa}</p>}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-text-secondary uppercase block mb-1">Pilih Buku</label>
            {bukuList.length === 0 ? (
              <div className="w-full h-[42px] px-3 rounded-md border border-border bg-surface/50 flex items-center">
                <span className="text-sm text-text-muted">Belum ada data buku</span>
              </div>
            ) : (
              <select
                value={form.idBuku}
                onChange={(e) => setForm({...form, idBuku: e.target.value})}
                className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all ${
                  errors.idBuku ? 'border-danger' : 'border-border'
                } bg-surface text-text-primary focus:border-primary focus:ring-[3px] focus:ring-primary/12`}
              >
                <option value="">-- Pilih Buku --</option>
                {bukuList.map(b => (
                  <option key={b.idBuku} value={b.idBuku}>{b.judulBuku} - {b.penulis}</option>
                ))}
              </select>
            )}
            {errors.idBuku && <p className="text-[11px] text-danger mt-1">{errors.idBuku}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-text-secondary uppercase block mb-1">Tanggal</label>
              <input
                type="date"
                value={form.tanggal}
                max={today}
                onChange={(e) => setForm({...form, tanggal: e.target.value})}
                className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all ${
                  errors.tanggal ? 'border-danger' : 'border-border'
                } bg-surface text-text-primary focus:border-primary focus:ring-[3px] focus:ring-primary/12`}
              />
              {errors.tanggal && <p className="text-[11px] text-danger mt-1">{errors.tanggal}</p>}
            </div>
            <div>
              <label className="text-[11px] font-semibold text-text-secondary uppercase block mb-1">Durasi (menit)</label>
              <input
                type="number"
                min="1"
                value={form.durasiBaca}
                onChange={(e) => setForm({...form, durasiBaca: e.target.value})}
                placeholder="0"
                className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all ${
                  errors.durasiBaca ? 'border-danger' : 'border-border'
                } bg-surface text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-[3px] focus:ring-primary/12`}
              />
              {errors.durasiBaca && <p className="text-[11px] text-danger mt-1">{errors.durasiBaca}</p>}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-text-secondary uppercase block mb-1">Status Selesai</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForm({...form, status: 'Masih Baca'})}
                className={`flex-1 h-[42px] rounded-md text-sm font-bold transition-all ${
                  form.status === 'Masih Baca'
                    ? 'bg-warning-light text-[#92400E] border-2 border-warning'
                    : 'bg-surface text-text-secondary border border-border'
                }`}
              >
                Masih Baca
              </button>
              <button
                type="button"
                onClick={() => setForm({...form, status: 'Selesai'})}
                className={`flex-1 h-[42px] rounded-md text-sm font-bold transition-all ${
                  form.status === 'Selesai'
                    ? 'bg-success-light text-success border-2 border-success'
                    : 'bg-surface text-text-secondary border border-border'
                }`}
              >
                Selesai
              </button>
            </div>
            {errors.status && <p className="text-[11px] text-danger mt-1">{errors.status}</p>}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-text-secondary uppercase block mb-1">Catatan (opsional)</label>
            <Input
              type="textarea"
              placeholder="Catatan tambahan..."
              value={form.catatan}
              onChange={(e) => setForm({...form, catatan: e.target.value})}
              rows={2}
            />
          </div>

          <Button type="submit" fullWidth disabled={!canSubmit}>
            Simpan Aktivitas
          </Button>
        </form>
      </div>

      <div className="bg-warning-light border border-warning/30 rounded-lg p-3 flex items-start gap-2">
        <Info size={16} className="text-warning shrink-0 mt-0.5" />
        <p className="text-[11px] text-text-secondary leading-4">
          Tips Hari Ini: Pastikan siswa mencatat durasi minimal 15 menit per hari untuk mendapatkan lencana Pembaca Setia.
        </p>
      </div>
    </div>
  );
}
