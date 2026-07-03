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

function getData(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function initDummyData() {
  if (!localStorage.getItem(STORAGE_KEYS.SISWA)) {
    setData(STORAGE_KEYS.SISWA, dummySiswa);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BUKU)) {
    setData(STORAGE_KEYS.BUKU, dummyBuku);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AKTIVITAS)) {
    setData(STORAGE_KEYS.AKTIVITAS, dummyAktivitas);
  }
}

export function getSiswa() {
  return getData(STORAGE_KEYS.SISWA) || [];
}

export function saveSiswa(siswaList) {
  setData(STORAGE_KEYS.SISWA, siswaList);
}

export function getBuku() {
  return getData(STORAGE_KEYS.BUKU) || [];
}

export function saveBuku(bukuList) {
  setData(STORAGE_KEYS.BUKU, bukuList);
}

export function getAktivitas() {
  return getData(STORAGE_KEYS.AKTIVITAS) || [];
}

export function saveAktivitas(aktivitasList) {
  setData(STORAGE_KEYS.AKTIVITAS, aktivitasList);
}

export function addAktivitas(aktivitas) {
  const list = getAktivitas();
  list.unshift(aktivitas);
  saveAktivitas(list);

  const bukuList = getBuku();
  const idx = bukuList.findIndex(b => b.idBuku === aktivitas.idBuku);
  if (idx !== -1) {
    bukuList[idx].jumlahDibaca = (bukuList[idx].jumlahDibaca || 0) + 1;
    saveBuku(bukuList);
  }
}

export function generateId(prefix) {
  const now = Date.now();
  const rand = Math.floor(Math.random() * 1000);
  return `${prefix}${now}${rand}`;
}
