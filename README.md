# Sistem Informasi Literasi Membaca Siswa SDN Wirosaban

Frontend prototype for managing student literacy reading activities at SD Negeri Wirosaban library. Built as a mobile-first web application for demo purposes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS 3 | Styling and design system |
| React Router DOM | Client-side routing |
| lucide-react | Icon library |
| localStorage | Data persistence |

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Dummy Login

| Username | Password | Role |
|----------|----------|------|
| `petugas` | `literasi123` | Petugas Perpustakaan |

## Routes

| Route | Page | Description |
|---|---|---|
| `/login` | Login | Login page for petugas |
| `/beranda` | Beranda Pengguna | Dashboard with KPI stats, quick actions, recent activities |
| `/siswa` | Data Siswa | Student data management with search |
| `/catat-aktivitas` | Catat Aktivitas | Form to record reading activity |
| `/buku` | Katalog Buku | Book catalog with search and category filter |
| `/laporan` | Laporan Literasi | Literacy report with KPIs, chart, and print |

## How to Test the Prototype

### Demo Scenario 1: Dashboard
1. Login with `petugas` / `literasi123`
2. View KPI stats (Siswa Aktif, Buku Terbaca, Rata-rata Durasi)
3. Click "Catat Aktivitas" quick action button
4. Click "Tambah Siswa Baru" to navigate to student page

### Demo Scenario 2: Data Siswa
1. Navigate to Data Siswa via bottom navigation
2. Search by student name or NIS
3. Click "Lihat" to view student details
4. Click "Edit" to modify student data
5. Click floating + button to add new student

### Demo Scenario 3: Catat Aktivitas
1. Open via center plus button on bottom navigation
2. Select a student and a book
3. Pick a date and enter duration in minutes
4. Toggle between "Masih Baca" and "Selesai"
5. Click "Simpan Aktivitas"
6. Verify activity appears on Beranda

### Demo Scenario 4: Katalog Buku
1. Navigate to Buku via bottom navigation
2. Search by book title or author
3. Filter by category chips (Fiksi, Sains, Sejarah)
4. View "Paling Sering Dibaca" section
5. Click floating + button to add new book

### Demo Scenario 5: Laporan Literasi
1. Navigate to Laporan via bottom navigation
2. View KPI cards (Total Laporan, Total Durasi, Siswa Aktif, Koleksi Terbaca)
3. View monthly bar chart
4. View "Buku Terfavorit" card
5. Click "Cetak Laporan" to trigger browser print dialog

## localStorage Reset

To reset all data to the initial dummy state, open your browser's DevTools and run:

```javascript
localStorage.clear();
```

Then refresh the page. The app will re-initialize with fresh dummy data on next load.

Alternatively:

```javascript
localStorage.removeItem('literasi_siswa');
localStorage.removeItem('literasi_buku');
localStorage.removeItem('literasi_aktivitas');
localStorage.removeItem('literasi_auth');
```
