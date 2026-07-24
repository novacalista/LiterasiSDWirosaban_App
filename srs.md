# Software Requirements Specification (SRS)

## SILAS — Sistem Informasi Literasi Membaca Siswa SD Negeri Wirosaban

---

## 1. Ikhtisar Proyek

**Nama Aplikasi:** SILAS (Sistem Informasi Literasi Membaca Siswa)

**Asal Sekolah:** SD Negeri Wirosaban

**Jenis Aplikasi:** Aplikasi web berbasis mobile-first

**Platform:** Web (browser), dioptimalkan untuk lebar 390px

**Teknologi Utama:** React, Vite, Tailwind CSS, Supabase

SILAS adalah aplikasi web yang dirancang untuk membantu petugas perpustakaan SD Negeri Wirosaban dalam mengelola kegiatan literasi membaca siswa. Aplikasi ini menyediakan fitur pencatatan aktivitas membaca, pengelolaan data siswa dan buku, serta pembuatan laporan literasi secara cepat dan terstruktur.

---

## 2. Tujuan

1. Memudahkan petugas perpustakaan dalam mencatat aktivitas membaca siswa secara digital.
2. Mengelola data siswa dan katalog buku perpustakaan secara terpusat.
3. Menyediakan dashboard (beranda) dengan statistik KPI yang relevan untuk pemantauan literasi.
4. Menghasilkan laporan kegiatan literasi yang dapat dicetak.
5. Menggantikan pencatatan manual dengan sistem digital yang lebih cepat, rapi, dan akurat.

---

## 3. Cakupan

### Yang Termasuk

- Autentikasi login sederhana (petugas perpustakaan)
- Dashboard beranda dengan statistik KPI dan aksi cepat
- Manajemen data siswa (CRUD: tambah, lihat, edit)
- Pencatatan aktivitas membaca siswa
- Katalog buku dengan pencarian dan filter kategori
- Laporan literasi dengan grafik dan fitur cetak
- Penyimpanan data via Supabase (database utama) dengan fallback ke localStorage

### Yang Tidak Termasuk

- Login untuk siswa atau orang tua
- Backend server kustom (menggunakan Supabase sebagai BaaS)
- Autentikasi Supabase (menggunakan autentikasi localStorage dummy)
- Multi-sekolah atau multi-peran
- Unggah file, OCR, pemindai barcode/QR
- Pembuatan PDF (menggunakan dialog cetak browser)
- Notifikasi email/SMS
- Pencarian buku dari database eksternal
- Sistem manajemen konten (CMS)

---

## 4. Pemangku Kepentingan (Stakeholders)

| Pemangku Kepentingan | Peran | Kebutuhan Utama |
|---|---|---|
| Petugas Perpustakaan SDN Wirosaban | Pengguna utama | Pencatatan aktivitas, pengelolaan data, cetak laporan |
| Guru / Kepala Sekolah | Pengguna laporan | Melihat statistik literasi siswa |
| Siswa | Subjek data | Tidak berinteraksi langsung dengan aplikasi |
| Pengembang Tim | Pembangun | Mengembangkan, memelihara, dan mengembangkan aplikasi |

---

## 5. Kebutuhan Fungsional

### 5.1 Autentikasi (UC-001)

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| FR-001 | Login | Pengguna dapat masuk menggunakan username dan password |
| FR-002 | Validasi Login | Sistem menampilkan pesan error jika field kosong atau kredensial salah |
| FR-003 | Logout | Pengguna dapat keluar dari sesi dan kembali ke halaman login |
| FR-004 | Proteksi Rute | Halaman yang dilindungi tidak dapat diakses tanpa sesi aktif |

### 5.2 Dashboard / Beranda (UC-002)

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| FR-005 | Tampilkan KPI | Menampilkan jumlah siswa aktif, buku terbaca minggu ini, dan rata-rata durasi baca |
| FR-006 | Aksi Cepat | Menyediakan tombol shortcut ke Catat Aktivitas dan Tambah Siswa Baru |
| FR-007 | Aktivitas Terkini | Menampilkan hingga 5 aktivitas membaca terbaru |
| FR-008 | Pengumuman | Menampilkan kartu pengumuman literasi |

### 5.3 Manajemen Siswa (UC-003)

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| FR-009 | Lihat Daftar Siswa | Menampilkan semua siswa dalam bentuk kartu |
| FR-010 | Cari Siswa | Mencari siswa berdasarkan nama atau NIS (case-insensitive) |
| FR-011 | Detail Siswa | Menampilkan detail siswa dalam modal bottom-sheet |
| FR-012 | Tambah Siswa | Menambah siswa baru via formulir modal (Nama, NIS, Kelas, Alamat) |
| FR-013 | Edit Siswa | Mengedit data siswa yang sudah ada |
| FR-014 | Validasi Siswa | Nama wajib diisi, NIS wajib diisi dan unik, kelas wajib diisi |
| FR-015 | Pintasan Tambah | Tombol "Tambah Siswa Baru" di Beranda membuka halaman Siswa dengan modal otomatis |

### 5.4 Pencatatan Aktivitas (UC-004)

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| FR-016 | Formulir Aktivitas | Menyediakan formulir: pilih siswa, pilih buku, tanggal, durasi, status, catatan |
| FR-017 | Validasi Aktivitas | Semua field wajib diisi kecuali catatan; tanggal tidak boleh masa depan; durasi > 0 |
| FR-018 | Simpan Aktivitas | Menyimpan aktivitas dan menampilkan pesan sukses |
| FR-019 | Auto-redirect | Setelah berhasil, otomatis kembali ke Beranda dalam 1.5 detik |
| FR-020 | Efek Silang | Menyimpan aktivitas menambah jumlah dibaca pada buku terkait |
| FR-021 | Peringatan Kosong | Menampilkan banner peringatan jika tidak ada data siswa atau buku |

### 05.5 Katalog Buku (UC-005)

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| FR-022 | Daftar Buku | Menampilkan buku dalam grid 2 kolom dengan kartu buku |
| FR-023 | Pencarian Buku | Mencari buku berdasarkan judul atau penulis |
| FR-024 | Filter Kategori | Filter chip: Semua, Fiksi, Sains, Sejarah, Umum |
| FR-025 | Buku Populer | Menampilkan 3 buku yang paling sering dibaca |
| FR-026 | Tambah Buku | Menambah buku baru via formulir modal (Judul, Penulis, Kategori, Catatan) |
| FR-027 | Validasi Buku | Judul wajib diisi, penulis wajib diisi, kategori wajib dipilih |

### 5.6 Laporan Literasi (UC-006)

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| FR-028 | KPI Laporan | Menampilkan 4 kartu statistik: Total Laporan, Total Durasi, Siswa Aktif, Koleksi Terbaca |
| FR-029 | Grafik Bulanan | Menampilkan grafik batang aktivitas 6 bulan terakhir |
| FR-030 | Buku Terfavorit | Menampilkan buku dengan jumlah aktivitas terbanyak |
| FR-031 | Cetak Laporan | Membuka dialog cetak browser untuk mencetak laporan |

---

## 6. Kebutuhan Non-Fungsional

| ID | Kategori | Kebutuhan |
|---|---|---|
| NFR-001 | Responsivitas | Dioptimalkan untuk mobile (390px), tampilan centered pada desktop |
| NFR-002 | Performa | Aplikasi harus dimuat dalam waktu < 3 detik pada koneksi normal |
| NFR-003 | Ketersediaan | Berfungsi offline dengan localStorage sebagai fallback |
| NFR-004 | Aksesibilitas | Menggunakan semantic HTML, label form, dan kontras warna yang memadai |
| NFR-005 | Konsistensi UI | Mengikuti design system yang ditetapkan (warna, tipografi, spasi) |
| NFR-006 | Keamanan Data | Data disimpan di Supabase dengan enkripsi HTTPS |
| NFR-007 | Kode Bersih | Mengikuti convention penamaan yang konsisten (camelCase JS, snake_case DB) |
| NFR-008 | Build | Dapat di-build dan di-deploy ke Vercel tanpa konfigurasi tambahan |

---

## 7. Ringkasan Use Case

| UC | Nama | Aktor | Rute | Dokumen |
|---|---|---|---|---|
| UC-001 | Login | Petugas | `/login` | [userflow_uc_001.md](user_flows/userflow_uc_001.md) |
| UC-002 | Beranda (Dashboard) | Petugas | `/beranda` | [userflow_uc_002.md](user_flows/userflow_uc_002.md) |
| UC-003 | Data Siswa | Petugas | `/siswa` | [userflow_uc_003.md](user_flows/userflow_uc_003.md) |
| UC-004 | Catat Aktivitas | Petugas | `/catat-aktivitas` | [userflow_uc_004.md](user_flows/userflow_uc_004.md) |
| UC-005 | Katalog Buku | Petugas | `/buku` | [userflow_uc_005.md](user_flows/userflow_uc_005.md) |
| UC-006 | Laporan Literasi | Petugas | `/laporan` | [userflow_uc_006.md](user_flows/userflow_uc_006.md) |

---

## 8. Fitur Sistem

### 8.1 Tampilan Umum

- **Header Aplikasi (AppHeader):** Logo, nama sekolah, tombol logout
- **Navigasi Bawah (BottomNav):** 5 item — Beranda, Siswa, FAB Catat Aktivitas, Buku, Laporan
- **Layout Autentikasi:** AppHeader + konten halaman + BottomNav
- **Container:** `max-w-[390px] mx-auto`, background `#F7F8FC`

### 8.2 Halaman Login

- Form username dan password
- Toggle show/hide password
- Tombol "Masuk" full-width
- Pesan error inline

### 8.3 Halaman Beranda

- Judul "Perpustakaan" dengan subtitle motivasi
- 3 kartu statistik: Siswa Aktif, Buku Terbaca, Rata-rata Durasi
- 2 kartu aksi cepat: Catat Aktivitas, Tambah Siswa Baru
- Kartu pengumuman
- Daftar 5 aktivitas terkini

### 8.4 Halaman Data Siswa

- Pencarian berdasarkan nama atau NIS
- Daftar siswa dengan kartu (nama, NIS, badge kelas, tombol lihat/edit)
- FAB untuk menambah siswa
- Modal detail, tambah, dan edit siswa

### 8.5 Halaman Catat Aktivitas

- Dropdown pilih siswa (hanya aktif) dan pilih buku
- Input tanggal (max hari ini) dan durasi menit
- Toggle status: Masih Baca / Selesai
- Input catatan (opsional)
- Banner peringatan jika data kosong

### 8.6 Halaman Katalog Buku

- Pencarian berdasarkan judul atau penulis
- Filter chip kategori: Semua, Fiksi, Sains, Sejarah, Umum
- Bagian "Paling Sering Dibaca" (top 3)
- Bagian "Koleksi Buku" (grid 2 kolom)
- FAB untuk menambah buku
- Modal tambah buku

### 8.7 Halaman Laporan Literasi

- Tombol cetak di pojok kanan atas
- 4 kartu KPI dalam grid 2x2
- Grafik batang 6 bulan terakhir
- Kartu "Buku Terfavorit"

---

## 9. Peran Pengguna

| Peran | Kode | Kemampuan |
|---|---|---|
| Petugas Perpustakaan | `petugas` | Login, mengelola siswa, mencatat aktivitas, mengelola buku, melihat dan mencetak laporan |

---

## 10. Aturan Bisnis

| ID | Aturan |
|---|---|
| BR-001 | Setiap siswa memiliki NIS unik yang tidak boleh duplikat |
| BR-002 | Aktivitas membaca harus terkait dengan satu siswa aktif dan satu buku yang ada |
| BR-003 | Tanggal aktivitas tidak boleh melebihi tanggal hari ini |
| BR-004 | Durasi membaca harus bernilai positif (lebih dari 0 menit) |
| BR-005 | Status aktivitas hanya bisa "Masih Baca" atau "Selesai" |
| BR-006 | Menyimpan aktivitas secara otomatis menambah jumlah dibaca pada buku terkait |
| BR-007 | Siswa baru secara otomatis tersedia di dropdown pilih siswa pada halaman Catat Aktivitas |
| BR-008 | Buku baru secara otomatis tersedia di dropdown pilih buku pada halaman Catat Aktivitas |
| BR-009 | Setelah berhasil menyimpan aktivitas, pengguna diarahkan ke Beranda dalam 1.5 detik |

---

## 11. Asumsi

1. Pengguna memiliki akses internet untuk mengakses aplikasi yang di-deploy di Vercel.
2. Database Supabase tersedia dan dapat diakses oleh aplikasi.
3. Data awal (siswa, buku, aktivitas) sudah ter-seed ke dalam database saat pertama kali aplikasi dijalankan.
4. Pengguna menggunakan browser modern yang mendukung ES2020+ dan CSS Grid/Flexbox.
5. Aplikasi hanya digunakan oleh satu pengguna (petugas) pada satu waktu.

---

## 12. Kendala (Constraints)

1. Aplikasi hanya berjalan di browser — tidak ada aplikasi native mobile.
2. Tidak ada autentikasi server-side — kata sandi disimpan secara hardcoded.
3. Data persistence bergantung pada ketersediaan Supabase; tanpa Supabase, data hanya tersimpan di localStorage.
4. Tidak ada dukungan multi-bahasa — hanya Bahasa Indonesia.
5. Cetak laporan bergantung pada fitur cetak bawaan browser (tidak ada ekspor PDF).
6. Tidak ada pagination — semua data dimuat sekaligus.

---

## 13. Kebutuhan Data

### 13.1 Entitas Utama

| Entitas | Tabel Supabase | Keterangan |
|---|---|---|
| Siswa | `students` | Data siswa SDN Wirosaban |
| Buku | `books` | Katalog buku perpustakaan |
| Aktivitas Membaca | `reading_activities` | Catatan aktivitas membaca siswa |

### 13.2 Skema Database

#### Tabel `students`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id_siswa` | TEXT (PK) | Pengenal unik siswa |
| `nama_siswa` | TEXT NOT NULL | Nama lengkap siswa |
| `nis` | TEXT NOT NULL UNIQUE | Nomor Induk Siswa |
| `kelas` | TEXT NOT NULL | Kelas (contoh: 5A, 6B) |
| `alamat` | TEXT DEFAULT '' | Alamat siswa |
| `status_aktif` | BOOLEAN DEFAULT true | Status keaktifan |
| `created_at` | TIMESTAMP WITH TIME ZONE | Waktu pembuatan record |

#### Tabel `books`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id_buku` | TEXT (PK) | Pengenal unik buku |
| `judul_buku` | TEXT NOT NULL | Judul buku |
| `penulis` | TEXT NOT NULL | Nama penulis |
| `kategori` | TEXT NOT NULL | Kategori: Fiksi, Sains, Sejarah, Umum |
| `cover_url` | TEXT DEFAULT '' | URL gambar sampul buku |
| `jumlah_dibaca` | INTEGER DEFAULT 0 | Jumlah kali buku dibaca |
| `catatan` | TEXT DEFAULT '' | Catatan atau deskripsi buku |
| `created_at` | TIMESTAMP WITH TIME ZONE | Waktu pembuatan record |

#### Tabel `reading_activities`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id_aktivitas` | TEXT (PK) | Pengenal unik aktivitas |
| `id_siswa` | TEXT NOT NULL (FK) | Referensi ke tabel students |
| `id_buku` | TEXT NOT NULL (FK) | Referensi ke tabel books |
| `tanggal` | DATE NOT NULL | Tanggal aktivitas membaca |
| `durasi_baca` | INTEGER NOT NULL | Durasi membaca dalam menit |
| `status` | TEXT NOT NULL | "Selesai" atau "Masih Baca" |
| `catatan` | TEXT DEFAULT '' | Catatan tambahan |
| `created_at` | TIMESTAMP WITH TIME ZONE | Waktu pembuatan record |

### 13.3 Keys localStorage (Fallback)

| Key | Tipe | Keterangan |
|---|---|---|
| `literasi_auth` | Object | Sesi autentikasi dummy |
| `literasi_siswa` | Array | Daftar siswa |
| `literasi_buku` | Array | Daftar buku |
| `literasi_aktivitas` | Array | Daftar aktivitas membaca |

---

## 14. Referensi

| Dokumen | Lokasi |
|---|---|
| User Flows | [user_flows/](user_flows/index.md) |
| UC-001 — Login | [userflow_uc_001.md](user_flows/userflow_uc_001.md) |
| UC-002 — Beranda | [userflow_uc_002.md](user_flows/userflow_uc_002.md) |
| UC-003 — Data Siswa | [userflow_uc_003.md](user_flows/userflow_uc_003.md) |
| UC-004 — Catat Aktivitas | [userflow_uc_004.md](user_flows/userflow_uc_004.md) |
| UC-005 — Katalog Buku | [userflow_uc_005.md](user_flows/userflow_uc_005.md) |
| UC-006 — Laporan Literasi | [userflow_uc_006.md](user_flows/userflow_uc_006.md) |
| Design System | [design_system.md](design_system.md) |
| Arsitektur Informasi | [information_architecture.md](information_architecture.md) |
| Catatan Implementasi | [implementation_notes.md](implementation_notes.md) |
