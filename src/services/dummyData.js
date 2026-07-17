import { isSupabaseConfigured } from './supabaseClient';
import {
  supabaseGetSiswa, supabaseAddSiswa, supabaseUpdateSiswa, supabaseSaveSiswa as supabaseSaveAllSiswa,
  supabaseGetBuku, supabaseAddBuku, supabaseUpdateBuku, supabaseSaveBuku as supabaseSaveAllBuku,
  supabaseGetAktivitas, supabaseAddAktivitas, supabaseSaveAktivitas as supabaseSaveAllAktivitas,
  supabaseSeedData,
} from './supabaseService';

const STORAGE_KEYS = {
  SISWA: 'literasi_siswa',
  BUKU: 'literasi_buku',
  AKTIVITAS: 'literasi_aktivitas',
};

const dummySiswa = [
  { idSiswa: 'S001', namaSiswa: 'Ahmad Fauzi', nis: '2024001', kelas: '5A', alamat: 'Wirowinangun', statusAktif: true },
  { idSiswa: 'S002', namaSiswa: 'Siti Nurhaliza', nis: '2024002', kelas: '5A', alamat: 'Sariharjo', statusAktif: true },
  { idSiswa: 'S003', namaSiswa: 'Budi Santoso', nis: '2024003', kelas: '5B', alamat: 'Tirtonirmolo', statusAktif: true },
  { idSiswa: 'S004', namaSiswa: 'Dewi Lestari', nis: '2024004', kelas: '6A', alamat: 'Banguntapan', statusAktif: true },
  { idSiswa: 'S005', namaSiswa: 'Eko Prasetyo', nis: '2024005', kelas: '6B', alamat: 'Jambidan', statusAktif: true },
  { idSiswa: 'S006', namaSiswa: 'Fitri Handayani', nis: '2024006', kelas: '4A', alamat: 'Singosaren', statusAktif: true },
  { idSiswa: 'S007', namaSiswa: 'Gilang Ramadhan', nis: '2024007', kelas: '4B', alamat: 'Baturetno', statusAktif: true },
  { idSiswa: 'S008', namaSiswa: 'Hana Safira', nis: '2024008', kelas: '5A', alamat: 'Wirowinangun', statusAktif: true },
];

const dummyBuku = [
  { idBuku: 'B001', judulBuku: 'Petualangan Si Kancil', penulis: 'Rudi Hartono', kategori: 'Fiksi', coverUrl: '', jumlahDibaca: 12 },
  { idBuku: 'B002', judulBuku: 'Ensiklopedia Sains untuk Anak', penulis: 'Prof. Bambang', kategori: 'Sains', coverUrl: '', jumlahDibaca: 8 },
  { idBuku: 'B003', judulBuku: 'Sejarah Kerajaan Nusantara', penulis: 'Sri Wahyuni', kategori: 'Sejarah', coverUrl: '', jumlahDibaca: 5 },
  { idBuku: 'B004', judulBuku: 'Dongeng Sebelum Tidur', penulis: 'Maya Indah', kategori: 'Fiksi', coverUrl: '', jumlahDibaca: 15 },
  { idBuku: 'B005', judulBuku: 'Planet dan Bintang', penulis: 'Dr. Anton', kategori: 'Sains', coverUrl: '', jumlahDibaca: 6 },
  { idBuku: 'B006', judulBuku: 'Pahlawan Nasional Indonesia', penulis: 'Dwi Susanto', kategori: 'Sejarah', coverUrl: '', jumlahDibaca: 9 },
  { idBuku: 'B007', judulBuku: 'Si Kancil dan Buaya', penulis: 'Rudi Hartono', kategori: 'Fiksi', coverUrl: '', jumlahDibaca: 11 },
  { idBuku: 'B008', judulBuku: 'Tubuh Manusia', penulis: 'Dr. Anita', kategori: 'Sains', coverUrl: '', jumlahDibaca: 7 },
  { idBuku: 'B009', judulBuku: 'Jenderal Soedirman', penulis: 'Nugroho', kategori: 'Sejarah', coverUrl: '', jumlahDibaca: 4 },
  { idBuku: 'B010', judulBuku: 'Kumpulan Cerita Rakyat', penulis: 'Tim Pustaka', kategori: 'Fiksi', coverUrl: '', jumlahDibaca: 10 },
];

const dummyAktivitas = [
  { idAktivitas: 'A001', idSiswa: 'S001', idBuku: 'B001', tanggal: '2026-06-28', durasiBaca: 30, status: 'Selesai', catatan: 'Membaca dengan lancar' },
  { idAktivitas: 'A002', idSiswa: 'S002', idBuku: 'B002', tanggal: '2026-06-28', durasiBaca: 25, status: 'Selesai', catatan: '' },
  { idAktivitas: 'A003', idSiswa: 'S003', idBuku: 'B004', tanggal: '2026-06-29', durasiBaca: 20, status: 'Masih Baca', catatan: 'Sampai halaman 15' },
  { idAktivitas: 'A004', idSiswa: 'S004', idBuku: 'B006', tanggal: '2026-06-29', durasiBaca: 35, status: 'Selesai', catatan: 'Sangat antusias' },
  { idAktivitas: 'A005', idSiswa: 'S001', idBuku: 'B007', tanggal: '2026-06-30', durasiBaca: 15, status: 'Masih Baca', catatan: '' },
  { idAktivitas: 'A006', idSiswa: 'S005', idBuku: 'B003', tanggal: '2026-06-30', durasiBaca: 40, status: 'Selesai', catatan: '' },
  { idAktivitas: 'A007', idSiswa: 'S006', idBuku: 'B005', tanggal: '2026-07-01', durasiBaca: 20, status: 'Selesai', catatan: '' },
  { idAktivitas: 'A008', idSiswa: 'S007', idBuku: 'B008', tanggal: '2026-07-01', durasiBaca: 30, status: 'Masih Baca', catatan: 'Baru mulai' },
];

// --- localStorage fallback ---

function localStorageGetData(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function localStorageSetData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageGetSiswa() {
  return localStorageGetData(STORAGE_KEYS.SISWA) || [];
}

function localStorageSaveSiswa(siswaList) {
  localStorageSetData(STORAGE_KEYS.SISWA, siswaList);
}

function localStorageGetBuku() {
  return localStorageGetData(STORAGE_KEYS.BUKU) || [];
}

function localStorageSaveBuku(bukuList) {
  localStorageSetData(STORAGE_KEYS.BUKU, bukuList);
}

function localStorageGetAktivitas() {
  return localStorageGetData(STORAGE_KEYS.AKTIVITAS) || [];
}

function localStorageSaveAktivitas(aktivitasList) {
  localStorageSetData(STORAGE_KEYS.AKTIVITAS, aktivitasList);
}

function localStorageInitDummyData() {
  if (!localStorage.getItem(STORAGE_KEYS.SISWA)) {
    localStorageSetData(STORAGE_KEYS.SISWA, dummySiswa);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BUKU)) {
    localStorageSetData(STORAGE_KEYS.BUKU, dummyBuku);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AKTIVITAS)) {
    localStorageSetData(STORAGE_KEYS.AKTIVITAS, dummyAktivitas);
  }
}

// --- Exported async functions (Supabase first, localStorage fallback) ---

export async function initDummyData() {
  localStorageInitDummyData();
  if (isSupabaseConfigured()) {
    try {
      await supabaseSeedData(dummySiswa, dummyBuku, dummyAktivitas);
    } catch (err) {
      console.error('Supabase seed data error:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });
    }
  }
}

export async function getSiswa() {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetSiswa();
    } catch (_) {}
  }
  return localStorageGetSiswa();
}

export async function saveSiswa(siswaList) {
  if (isSupabaseConfigured()) {
    try {
      await supabaseSaveAllSiswa(siswaList);
      localStorageSaveSiswa(siswaList);
      return true;
    } catch (err) {
      console.error('Gagal menyimpan ke Supabase:', err);
      localStorageSaveSiswa(siswaList);
      return false;
    }
  }
  localStorageSaveSiswa(siswaList);
  return true;
}

export async function addSiswa(newSiswa) {
  if (isSupabaseConfigured()) {
    try {
      await supabaseAddSiswa(newSiswa);
      localStorageSaveSiswa([...localStorageGetSiswa(), newSiswa]);
      return true;
    } catch (err) {
      console.error('Supabase insert student error:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });
      console.log('Insert payload:', newSiswa);
      localStorageSaveSiswa([...localStorageGetSiswa(), newSiswa]);
      return false;
    }
  }
  localStorageSaveSiswa([...localStorageGetSiswa(), newSiswa]);
  return true;
}

export async function updateSiswa(updatedSiswa) {
  if (isSupabaseConfigured()) {
    try {
      await supabaseUpdateSiswa(updatedSiswa);
      const list = localStorageGetSiswa();
      localStorageSaveSiswa(list.map(s => s.idSiswa === updatedSiswa.idSiswa ? updatedSiswa : s));
      return true;
    } catch (err) {
      console.error('Supabase update student error:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });
      const list = localStorageGetSiswa();
      localStorageSaveSiswa(list.map(s => s.idSiswa === updatedSiswa.idSiswa ? updatedSiswa : s));
      return false;
    }
  }
  const list = localStorageGetSiswa();
  localStorageSaveSiswa(list.map(s => s.idSiswa === updatedSiswa.idSiswa ? updatedSiswa : s));
  return true;
}

export async function getBuku() {
  if (isSupabaseConfigured()) {
    try {
      const data = await supabaseGetBuku();
      if (data.length > 0) {
        localStorageSaveBuku(data);
      }
      return data;
    } catch (err) {
      console.error('Supabase fetch buku error:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });
    }
  }
  const local = localStorageGetBuku();
  return local;
}

export async function saveBuku(bukuList) {
  if (isSupabaseConfigured()) {
    try {
      await supabaseSaveAllBuku(bukuList);
      localStorageSaveBuku(bukuList);
      return true;
    } catch (err) {
      console.error('Supabase save buku error:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });
      localStorageSaveBuku(bukuList);
      return false;
    }
  }
  localStorageSaveBuku(bukuList);
  return true;
}

export async function addBuku(newBuku) {
  if (isSupabaseConfigured()) {
    try {
      await supabaseAddBuku(newBuku);
      localStorageSaveBuku([...localStorageGetBuku(), newBuku]);
      return true;
    } catch (err) {
      console.error('Supabase insert buku error:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });
      console.log('Insert buku payload:', newBuku);
      localStorageSaveBuku([...localStorageGetBuku(), newBuku]);
      return false;
    }
  }
  localStorageSaveBuku([...localStorageGetBuku(), newBuku]);
  return true;
}

export async function updateBuku(updatedBuku) {
  const list = localStorageGetBuku();
  localStorageSaveBuku(list.map(b => b.idBuku === updatedBuku.idBuku ? updatedBuku : b));
  if (isSupabaseConfigured()) {
    try {
      await supabaseUpdateBuku(updatedBuku);
    } catch (_) {}
  }
}

export async function getAktivitas() {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetAktivitas();
    } catch (_) {}
  }
  return localStorageGetAktivitas();
}

export async function addAktivitas(aktivitas) {
  const list = localStorageGetAktivitas();
  list.unshift(aktivitas);
  localStorageSaveAktivitas(list);

  const bukuList = localStorageGetBuku();
  const idx = bukuList.findIndex(b => b.idBuku === aktivitas.idBuku);
  if (idx !== -1) {
    bukuList[idx].jumlahDibaca = (bukuList[idx].jumlahDibaca || 0) + 1;
    localStorageSaveBuku(bukuList);
  }

  if (isSupabaseConfigured()) {
    try {
      await supabaseAddAktivitas(aktivitas);
    } catch (_) {}
  }
}

export async function saveAktivitas(aktivitasList) {
  localStorageSaveAktivitas(aktivitasList);
  if (isSupabaseConfigured()) {
    try {
      await supabaseSaveAllAktivitas(aktivitasList);
    } catch (_) {}
  }
}

export function generateId(prefix) {
  const now = Date.now();
  const rand = Math.floor(Math.random() * 1000);
  return `${prefix}${now}${rand}`;
}
