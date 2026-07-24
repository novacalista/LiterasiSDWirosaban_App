# Arsitektur Informasi

## SILAS — Sistem Informasi Literasi Membaca Siswa SDN Wirosaban

---

## 1. Sitemap

```
/ (root)
├── /login                          ← Halaman login (publik)
│
└── [Protected] ───────────────────── ← Memerlukan autentikasi
    ├── /beranda                    ← Dashboard utama
    ├── /siswa                      ← Manajemen data siswa
    ├── /catat-aktivitas            ← Formulir pencatatan aktivitas
    ├── /buku                       ← Katalog buku
    └── /laporan                    ← Laporan literasi
```

---

## 2. Struktur Navigasi

### Navigasi Bawah (BottomNav)

| Posisi | Item | Rute | Ikon | Keterangan |
|---|---|---|---|---|
| 1 | Beranda | `/beranda` | `Home` | Dashboard utama |
| 2 | Siswa | `/siswa` | `Users` | Data siswa |
| 3 | **FAB** | `/catat-aktivitas` | `Plus` | Tombol aksi cepat (terangkat) |
| 4 | Buku | `/buku` | `BookOpen` | Katalog buku |
| 5 | Laporan | `/laporan` | `BarChart3` | Laporan literasi |

### Header Aplikasi (AppHeader)

| Elemen | Aksi |
|---|---|
| Logo + "SDN Wirosaban" | Tidak diklik |
| Tombol Logout | Panggil `logout()`, navigasi ke `/login` |

---

## 3. Hierarki Layar

### Tanpa Autentikasi

| Layar | Rute | Keterangan |
|---|---|---|
| Login | `/login` | Form username + password, tombol Masuk |

### Dengan Autentikasi

| Layar | Rute | Keterangan |
|---|---|---|
| Beranda | `/beranda` | KPI, aksi cepat, pengumuman, aktivitas terkini |
| Data Siswa | `/siswa` | Daftar siswa, pencarian, modal tambah/edit |
| Catat Aktivitas | `/catat-aktivitas` | Formulir pencatatan aktivitas membaca |
| Katalog Buku | `/buku` | Grid buku, pencarian, filter, modal tambah buku |
| Laporan Literasi | `/laporan` | KPI laporan, grafik, buku terfavorit, cetak |

### Modal / Overlay

| Modal | Lokasi | Elemen |
|---|---|---|
| Detail Siswa | `/siswa` | Read-only: nama, NIS, kelas, alamat |
| Tambah Siswa | `/siswa` | Form: nama, NIS, kelas, alamat (opsional) |
| Edit Siswa | `/siswa` | Form: nama, NIS, kelas, alamat (opsional), pre-populated |
| Tambah Buku | `/buku` | Form: judul, penulis, kategori, catatan (opsional) |

---

## 4. Aliran Data (Data Flow)

### Alur Umum

```
┌─────────────────────────────────────────────────────────┐
│                     main.jsx                            │
│                                                         │
│  initDummyData()                                        │
│    ├── Seed ke localStorage (jika kosong)               │
│    └── Seed ke Supabase (jika terkonfigurasi & kosong)  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   dummyData.js                          │
│          (Data Access Layer — Async)                    │
│                                                         │
│  getSiswa()    → Supabase → localStorage                │
│  getBuku()     → Supabase → localStorage                │
│  getAktivitas() → Supabase → localStorage               │
│  addSiswa()    → Supabase → localStorage                │
│  addBuku()     → Supabase → localStorage                │
│  addAktivitas() → Supabase → localStorage (+ inc baca)  │
│  updateSiswa() → Supabase → localStorage                │
│  updateBuku()  → Supabase → localStorage                │
│  saveSiswa()   → Supabase (bulk) → localStorage         │
│  saveBuku()    → Supabase (bulk) → localStorage         │
└─────────────────────────────────────────────────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
     ┌────────────┐ ┌──────────┐ ┌────────────┐
     │supabase    │ │localStorage│ │ authService│
     │Service.js  │ │(fallback)  │ │(auth dummy)│
     └────────────┘ └──────────┘ └────────────┘
            │
            ▼
     ┌────────────────┐
     │ supabaseClient │
     │ .js            │
     │ (VITE_SUPA_*)  │
     └────────────────┘
```

### Alur Autentikasi

```
Login.jsx
  │
  ├── Input username + password
  │
  ├── login(username, password) → authService.js
  │     ├── Cocok dengan hardcoded dummy → session disimpan ke localStorage
  │     └── Tidak cocok → pesan error
  │
  ├── Sukses → navigate('/beranda', { replace: true })
  │
  └── ProtectedRoute
        ├── isAuthenticated() → true → render children
        └── isAuthenticated() → false → <Navigate to="/login" />
```

### Alur Pencatatan Aktivitas

```
CatatAktivitas.jsx
  │
  ├── useEffect → Promise.all([getSiswa(), getBuku()])
  │     └── Isi dropdown "Pilih Siswa" dan "Pilih Buku"
  │
  ├── Pilih siswa, buku, tanggal, durasi, status, catatan
  │
  ├── handleSubmit()
  │     └── addAktivitas({...})
  │           ├── Simpan aktivitas baru
  │           ├── Tambah jumlah dibaca pada buku (+1)
  │           └── Simpan ke Supabase / localStorage
  │
  ├── Pesan sukses: "Aktivitas membaca berhasil disimpan"
  │
  └── Auto-redirect ke /beranda (1.5 detik)
```

---

## 5. Hubungan Antar Halaman

| Dari | Ke | Mekanisme | Keterangan |
|---|---|---|---|
| Login | Beranda | `navigate()` + redirect | Setelah login berhasil |
| Beranda | Catat Aktivitas | `navigate('/catat-aktivitas')` | Klik "Catat Aktivitas" (aksi cepat) atau FAB |
| Beranda | Siswa | `navigate('/siswa', { state: { openAdd: true } })` | Klik "Tambah Siswa Baru" (aksi cepat) |
| Siswa | Siswa | Auto-open modal | Mendeteksi `state.openAdd` pada mount |
| Catat Aktivitas | Beranda | `navigate('/beranda')` | Auto-redirect setelah simpan (1.5 detik) |
| AppHeader Logout | Login | `navigate('/login')` | Setelah logout |
| Semua halaman terlindungi | Login | `<Navigate to="/login" />` | Jika tidak terautentikasi |

---

## 6. Entitas Utama

### 6.1 Siswa (`Student`)

```
Student {
  idSiswa: string        // PK, format: "S{timestamp}{random}"
  namaSiswa: string      // Nama lengkap
  nis: string            // Nomor Induk Siswa, unik
  kelas: string          // Contoh: "5A", "6B"
  alamat: string         // Alamat (opsional)
  statusAktif: boolean   // true = aktif
}
```

**Relasi:**
- Satu siswa memiliki banyak aktivitas membaca (one-to-many)

### 6.2 Buku (`Book`)

```
Book {
  idBuku: string         // PK, format: "B{timestamp}{random}"
  judulBuku: string      // Judul buku
  penulis: string        // Nama penulis
  kategori: string       // "Fiksi" | "Sains" | "Sejarah" | "Umum"
  coverUrl: string       // URL gambar sampul (opsional)
  jumlahDibaca: number   // Jumlah kali dibaca (counter)
  catatan: string        // Deskripsi atau catatan (opsional)
}
```

**Relasi:**
- Satu buku memiliki banyak aktivitas membaca (one-to-many)

### 6.3 Aktivitas Membaca (`ReadingActivity`)

```
ReadingActivity {
  idAktivitas: string    // PK, format: "A{timestamp}{random}"
  idSiswa: string        // FK → Student.idSiswa
  idBuku: string         // FK → Book.idBuku
  tanggal: string        // Format: "YYYY-MM-DD"
  durasiBaca: number     // Dalam menit
  status: string         // "Selesai" | "Masih Baca"
  catatan: string        // Catatan tambahan (opsional)
}
```

**Relasi:**
- Aktivitas terkait ke satu siswa (many-to-one)
- Aktivitas terkait ke satu buku (many-to-one)

### Diagram Relasi

```
┌──────────────┐       ┌────────────────────┐       ┌──────────────┐
│   students   │       │ reading_activities │       │    books     │
├──────────────┤       ├────────────────────┤       ├──────────────┤
│ id_siswa (PK)│◄──────│ id_siswa (FK)      │       │ id_buku (PK) │
│ nama_siswa   │       │ id_buku (FK)       │──────►│ judul_buku   │
│ nis (UNIQUE) │       │ id_aktivitas (PK)  │       │ penulis      │
│ kelas        │       │ tanggal            │       │ kategori     │
│ alamat       │       │ durasi_baca        │       │ cover_url    │
│ status_aktif │       │ status             │       │ jumlah_dibaca│
│ created_at   │       │ catatan            │       │ catatan      │
└──────────────┘       │ created_at         │       │ created_at   │
                       └────────────────────┘       └──────────────┘
        1 : N                       N : 1
```

---

## 7. Entitas Pendukung

### Autentikasi (`Auth`)

```
Auth {
  username: string       // "petugas"
  password: string       // "literasi123"
  nama: string           // "Petugas Perpustakaan"
}
```

Disimpan di localStorage key `literasi_auth`. Tidak terhubung ke Supabase Auth.

### localStorage Keys

| Key | Entitas | Format |
|---|---|---|
| `literasi_auth` | Sesi login | `{ username, nama }` |
| `literasi_siswa` | Daftar siswa | `Student[]` |
| `literasi_buku` | Daftar buku | `Book[]` |
| `literasi_aktivitas` | Daftar aktivitas | `ReadingActivity[]` |
