import { getSupabase } from './supabaseClient';

const mapRowToSiswa = (row) => ({
  idSiswa: row.id_siswa,
  namaSiswa: row.nama_siswa,
  nis: row.nis,
  kelas: row.kelas,
  alamat: row.alamat || '',
  statusAktif: row.status_aktif,
});

const mapSiswaToRow = (s) => ({
  id_siswa: s.idSiswa,
  nama_siswa: s.namaSiswa,
  nis: s.nis,
  kelas: s.kelas,
  alamat: s.alamat || '',
  status_aktif: s.statusAktif,
});

const mapRowToBuku = (row) => ({
  idBuku: row.id_buku,
  judulBuku: row.judul_buku,
  penulis: row.penulis,
  kategori: row.kategori,
  coverUrl: row.cover_url || '',
  jumlahDibaca: row.jumlah_dibaca || 0,
  catatan: row.catatan || '',
});

const mapBukuToRow = (b) => ({
  id_buku: b.idBuku,
  judul_buku: b.judulBuku,
  penulis: b.penulis,
  kategori: b.kategori,
  cover_url: b.coverUrl || '',
  jumlah_dibaca: b.jumlahDibaca || 0,
  catatan: b.catatan || '',
});

const mapRowToAktivitas = (row) => ({
  idAktivitas: row.id_aktivitas,
  idSiswa: row.id_siswa,
  idBuku: row.id_buku,
  tanggal: row.tanggal,
  durasiBaca: row.durasi_baca,
  status: row.status,
  catatan: row.catatan || '',
});

const mapAktivitasToRow = (a) => ({
  id_aktivitas: a.idAktivitas,
  id_siswa: a.idSiswa,
  id_buku: a.idBuku,
  tanggal: a.tanggal,
  durasi_baca: a.durasiBaca,
  status: a.status,
  catatan: a.catatan || '',
});

export async function supabaseGetSiswa() {
  const sb = getSupabase();
  const { data, error } = await sb.from('students').select('*').order('nama_siswa');
  if (error) throw error;
  return (data || []).map(mapRowToSiswa);
}

export async function supabaseSaveSiswa(siswaList) {
  const sb = getSupabase();
  const { error: delError } = await sb.from('students').delete().neq('id_siswa', '_');
  if (delError) throw delError;
  if (siswaList.length === 0) return;
  const rows = siswaList.map(mapSiswaToRow);
  const { error } = await sb.from('students').insert(rows);
  if (error) throw error;
}

export async function supabaseAddSiswa(newSiswa) {
  const sb = getSupabase();
  const { error } = await sb.from('students').insert(mapSiswaToRow(newSiswa));
  if (error) throw error;
}

export async function supabaseUpdateSiswa(updatedSiswa) {
  const sb = getSupabase();
  const { error } = await sb.from('students').update(mapSiswaToRow(updatedSiswa)).eq('id_siswa', updatedSiswa.idSiswa);
  if (error) throw error;
}

export async function supabaseGetBuku() {
  const sb = getSupabase();
  const { data, error } = await sb.from('books')
    .select('id_buku, judul_buku, penulis, kategori, cover_url, jumlah_dibaca, catatan')
    .order('judul_buku');
  if (error) throw error;
  return (data || []).map(mapRowToBuku);
}

export async function supabaseSaveBuku(bukuList) {
  const sb = getSupabase();
  const { error: delError } = await sb.from('books').delete().neq('id_buku', '_');
  if (delError) throw delError;
  if (bukuList.length === 0) return;
  const rows = bukuList.map(mapBukuToRow);
  const { error } = await sb.from('books').insert(rows);
  if (error) throw error;
}

export async function supabaseAddBuku(newBuku) {
  const sb = getSupabase();
  const { error } = await sb.from('books').insert(mapBukuToRow(newBuku));
  if (error) throw error;
}

export async function supabaseUpdateBuku(updatedBuku) {
  const sb = getSupabase();
  const { error } = await sb.from('books').update(mapBukuToRow(updatedBuku)).eq('id_buku', updatedBuku.idBuku);
  if (error) throw error;
}

export async function supabaseGetAktivitas() {
  const sb = getSupabase();
  const { data, error } = await sb.from('reading_activities').select('*').order('tanggal', { ascending: false });
  if (error) throw error;
  return (data || []).map(mapRowToAktivitas);
}

export async function supabaseAddAktivitas(aktivitas) {
  const sb = getSupabase();
  const { error } = await sb.from('reading_activities').insert(mapAktivitasToRow(aktivitas));
  if (error) throw error;
  const { error: incError } = await sb.rpc('increment_book_read_count', { p_id_buku: aktivitas.idBuku });
  if (incError) {
    const { data: buku } = await sb.from('books').select('jumlah_dibaca').eq('id_buku', aktivitas.idBuku).single();
    if (buku) {
      await sb.from('books').update({ jumlah_dibaca: (buku.jumlah_dibaca || 0) + 1 }).eq('id_buku', aktivitas.idBuku);
    }
  }
}

export async function supabaseSaveAktivitas(aktivitasList) {
  const sb = getSupabase();
  const { error: delError } = await sb.from('reading_activities').delete().neq('id_aktivitas', '_');
  if (delError) throw delError;
  if (aktivitasList.length === 0) return;
  const rows = aktivitasList.map(mapAktivitasToRow);
  const { error } = await sb.from('reading_activities').insert(rows);
  if (error) throw error;
}

export async function supabaseSeedData(dummySiswa, dummyBuku, dummyAktivitas) {
  const sb = getSupabase();
  const { count: siswaCount } = await sb.from('students').select('*', { count: 'exact', head: true });
  if (siswaCount === 0) {
    const { error } = await sb.from('students').insert(dummySiswa.map(mapSiswaToRow));
    if (error) throw error;
  }
  const { count: bukuCount } = await sb.from('books').select('*', { count: 'exact', head: true });
  if (bukuCount === 0) {
    const { error } = await sb.from('books').insert(dummyBuku.map(mapBukuToRow));
    if (error) throw error;
  }
  const { count: aktivitasCount } = await sb.from('reading_activities').select('*', { count: 'exact', head: true });
  if (aktivitasCount === 0) {
    const { error } = await sb.from('reading_activities').insert(dummyAktivitas.map(mapAktivitasToRow));
    if (error) throw error;
  }
}
