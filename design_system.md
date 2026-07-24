# Design System

## SILAS — Sistem Informasi Literasi Membaca Siswa SDN Wirosaban

---

## 1. Palet Warna

### Warna Utama

| Nama | Token Tailwind | Hex | Penggunaan |
|---|---|---|---|
| Primary | `primary` | `#003B95` | Tombol utama, header, FAB, badge aktif, link |
| Primary Dark | `primary-dark` | `#002E73` | Hover state tombol primary |
| Primary Light | `primary-light` | `#E8F1FF` | Background badge/inaktif, chip filter |
| Secondary | `secondary` | `#00A884` | Tombol "Tambah Siswa Baru", aksi sekunder |
| Secondary Dark | `secondary-dark` | `#008B6D` | Hover state tombol secondary |

### Warna Status

| Nama | Token Tailwind | Hex | Penggunaan |
|---|---|---|---|
| Success | `success` | `#16A34A` | Status "Selesai", pesan sukses |
| Success Light | `success-light` | `#DCFCE7` | Background banner sukses |
| Warning | `warning` | `#FACC15` | Status "Masih Baca", bintang popular |
| Warning Light | `warning-light` | `#FEF9C3` | Background banner peringatan |
| Danger | `danger` | `#DC2626` | Error validasi, border error |

### Warna Netral

| Nama | Token Tailwind | Hex | Penggunaan |
|---|---|---|---|
| Background | `background` | `#F7F8FC` | Latar belakang utama aplikasi |
| Surface | `surface` | `#FFFFFF` | Kartu, modals, form |
| Border | `border` | `#E2E8F0` | Border kartu, input, pemisah |
| Text Primary | `text-primary` | `#0F172A` | Judul, teks utama |
| Text Secondary | `text-secondary` | `#475569` | Subtitle, deskripsi |
| Text Muted | `text-muted` | `#94A3B8` | Placeholder, label sekunder |

### Warna Gradient Sampul Buku

| Kategori | Gradasi |
|---|---|
| Fiksi | Pink-400 ke Purple-500 (`from-pink-400 to-purple-500`) |
| Sains | Cyan-400 ke Blue-500 (`from-cyan-400 to-blue-500`) |
| Sejarah | Amber-400 ke Orange-500 (`from-amber-400 to-orange-500`) |
| Umum | Primary ke Primary-Dark (`from-primary to-primary-dark`) |

---

## 2. Tipografi

### Font

| Properti | Nilai |
|---|---|
| Font Family | Inter, Arial, sans-serif |
| Sumber | Google Fonts (`family=Inter:wght@400;500;600;700;800`) |
| Anti-aliasing | Diaktifkan (`antialiased`) |

### Skala Tipografi

| Elemen | Ukuran | Weight | Tailwind Class | Penggunaan |
|---|---|---|---|---|
| Judul Halaman | 24px | 800 (extrabold) | `text-2xl font-extrabold` | Judul setiap halaman |
| Judul Bagian | 16px | 700 (bold) | `text-base font-bold` | Heading seksi di dalam halaman |
| Body | 13px | 400 (regular) | `text-sm` | Isi teks, deskripsi, input |
| Body Bold | 13px | 700 (bold) | `text-sm font-bold` | Label penting, nama buku |
| Caption | 11px | 400 (regular) | `text-[11px]` | Label kecil, badge, info sekunder |
| Caption Bold | 11px | 600 (semibold) | `text-[11px] font-semibold` | Label uppercase, caption penting |
| Caption Kecil | 10px | 400 (regular) | `text-[10px]` | Nama penulis di kartu kompak |

### Line Height

| Kombinasi | Tailwind Class |
|---|---|
| Baris judul | `leading-5` |
| Subtitle deskripsi | `leading-4` |

---

## 3. Spasi

### Padding Konten

| Token | Tailwind Class | Nilai |
|---|---|---|
| Konten utama | `px-4` | 16px horizontal |
| Bagian bawah konten | `pb-24` | 96px (ruang untuk BottomNav) |
| Card padding | `p-3` | 12px |
| Card padding besar | `p-5` | 20px |
| Modal padding | `p-5` | 20px |

### Jarak Antar Elemen

| Kombinasi | Tailwind Class | Penggunaan |
|---|---|---|
| Jarak antar bagian | `space-y-4` | Antar kartu/form di halaman |
| Jarak antar kartu stat | `gap-2` | Grid statistik, grid buku kompak |
| Jarak antar kartu buku | `gap-3` | Grid koleksi buku |
| Jarak internal chip | `gap-2` | Antara chip filter kategori |
| Jarak tombol modal | `space-y-3` | Antar field di modal formulir |

---

## 4. Grid & Tata Letak

### Container

| Properti | Nilai | Tailwind |
|---|---|---|
| Lebar maksimum | 390px | `max-w-[390px]` |
| Centering | Auto | `mx-auto` |
| Lebar minimum | 360px | `min-w-[360px]` |
| Background | `#F7F8FC` | `bg-background` |
| Posisi | Relative | `relative` |

### Grid Statistik

| Grid | Kolom | Tailwind |
|---|---|---|
| Kartu KPI (Beranda) | 3 kolom | `grid grid-cols-3 gap-2` |
| Kartu KPI (Laporan) | 2 kolom | `grid grid-cols-2 gap-3` |
| Koleksi Buku | 2 kolom | `grid grid-cols-2 gap-3` |
| Buku Populer | 3 kolom | `grid grid-cols-3 gap-2` |
| Form Tanggal + Durasi | 2 kolom | `grid grid-cols-2 gap-3` |

### Breakpoints

| Breakpoint | Nilai | Perilaku |
|---|---|---|
| Default | < 640px | Tampilan mobile penuh |
| `sm:` | ≥ 640px | Modal di-center secara vertikal |

---

## 5. Tombol (Buttons)

### Variasi

| Variance | Warna | Teks | Tailwind |
|---|---|---|---|
| `primary` | Primary (`#003B95`) | Putih | `bg-primary text-white` |
| `secondary` | Secondary (`#00A884`) | Putih | `bg-secondary text-white` |
| `positive` | Success (`#16A34A`) | Putih | `bg-success text-white` |
| `disabled` | Abu-abu | Abu-abu | `bg-gray-200 text-gray-400 cursor-not-allowed` |

### Ukuran

| Ukuran | Lebar | Tinggi | Tailwind |
|---|---|---|---|
| Default | Full-width | 42px | `h-[42px]` |
| Small | Auto | 36px | `h-9` |

### Status

| Status | Warna Background | Keterangan |
|---|---|---|
| Default | `bg-primary` | Normal |
| Hover | `bg-primary-dark` | Pointer di atas tombol |
| Disabled | `bg-gray-200 text-gray-400` | Tidak dapat diklik |
| Loading | - | Tombol ter-disabled selama submit |

### Tombol Toggle (Status Aktivitas)

| Pilihan | Style Aktif | Style Inaktif |
|---|---|---|
| Masih Baca | `bg-warning-light text-[#92400E] border-2 border-warning` | `bg-surface text-text-secondary border border-border` |
| Selesai | `bg-success-light text-success border-2 border-success` | `bg-surface text-text-secondary border border-border` |

---

## 6. Input (Form)

### Komponen Input Standar

| Properti | Nilai |
|---|---|
| Tinggi | 42px (`h-[42px]`) |
| Padding horizontal | 12px (`px-3`) |
| Border radius | 12px (`rounded-md`) |
| Border warna | `#E2E8F0` (`border-border`) |
| Focus border | `#003B95` (`focus:border-primary`) |
| Focus ring | `3px`, `primary/12` opacity |
| Font size | 13px (`text-sm`) |
| Placeholder | `#94A3B8` (`text-text-muted`) |

### State Error

| Properti | Nilai |
|---|---|
| Border | `border-danger` (`#DC2626`) |
| Pesan error | `text-[11px] text-danger`, muncul di bawah input |

### Select Dropdown

| Properti | Nilai |
|---|---|
| Tinggi | 42px |
| Padding | `px-3` |
| Font size | 13px |
| Border radius | `rounded-md` |
| Focus | `focus:border-primary focus:ring-[3px] focus:ring-primary/12` |

### Textarea

| Properti | Nilai |
|---|---|
| Baris default | 2-3 baris |
| Resize | `resize-none` |
| Lebar | Full-width |

---

## 7. Kartu (Cards)

### Kartu Standar (Surface)

| Properti | Nilai | Tailwind |
|---|---|---|
| Background | `#FFFFFF` | `bg-surface` |
| Border | 1px `#E2E8F0` | `border border-border` |
| Border radius | 16px | `rounded-lg` |
| Shadow | `0 4px 12px rgba(15, 23, 42, 0.08)` | `shadow-soft` |
| Overflow | Tersembunyi | `overflow-hidden` |

### Kartu Statistik (StatCard / ReportCard)

| Properti | Nilai |
|---|---|
| Layout | Ikon di kiri, nilai + label di kanan |
| Padding | `p-3` |
| Ikon | 16-24px, warna sesuai konteks |

### Kartu Aktivitas (ActivityCard)

| Properti | Nilai |
|---|---|
| Layout | Nama siswa + badge status di baris atas, info tanggal + durasi di baris bawah |
| Padding | `p-3` |

### Kartu Buku (BookCard)

| Properti | Nilai |
|---|---|
| Cover | Gradasi warna sesuai kategori (tinggi: 96px normal, 80px kompak) |
| Konten | Badge kategori, judul (bold, max 2 baris), penulis (muted) |
| Padding konten | `p-3` (normal), `p-2` (kompak) |

### Kartu Aksi Cepat

| Properti | Nilai |
|---|---|
| Layout | Grid 2 kolom |
| Background | `bg-primary` atau `bg-secondary` |
| Teks | Putih, bold |
| Aksi | `navigate()` ke halaman tujuan |

### Kartu Pengumuman

| Properti | Nilai |
|---|---|
| Background | `bg-primary-light` |
| Border | `border border-primary/20` |
| Ikon | Megaphone |
| Teks | Deskripsi pengumuman |

---

## 8. Navigasi

### Header Aplikasi (AppHeader)

| Properti | Nilai |
|---|---|
| Background | `bg-primary` (`#003B95`) |
| Konten | Logo sekolah (kiri), "SDN Wirosaban" (tengah), tombol logout (kanan) |
| Tinggi | 56px |
| Teks | Putih |

### Navigasi Bawah (BottomNav)

| Properti | Nilai |
|---|---|
| Background | `bg-surface` |
| Shadow | `shadow-nav` (`0 -4px 16px rgba(15, 23, 42, 0.10)`) |
| Tinggi | 64px |
| Posisi | Fixed di bawah |
| Item | 5: Beranda, Siswa, FAB (tengah), Buku, Laporan |
| Icon size | 20px |
| Label | 10px |

### FAB (Floating Action Button) — Pusat BottomNav

| Properti | Nilai |
|---|---|
| Ukuran | 56px × 56px |
| Background | `bg-primary` |
| Shadow | `shadow-floating` (`0 8px 20px rgba(0, 59, 149, 0.25)`) |
| Posisi | Fixed, offset -20px dari tengah atas BottomNav |
| Ikon | `Plus` (lucide-react), 24px, putih |
| Aria Label | "Catat Aktivitas" |

### FAB Halaman (Siswa / Buku)

| Properti | Nilai |
|---|---|
| Ukuran | 48px × 48px |
| Background | `bg-primary` |
| Shadow | `shadow-floating` |
| Posisi | Absolute, `bottom-20 right-4` (relatif terhadap mobile-container) |
| Ikon | `Plus` (lucide-react), 22px, putih |

---

## 9. Ikon

### Library

| Properti | Nilai |
|---|---|
| Package | `lucide-react` |
| Default size | 16-24px |
| Default stroke | 2px |

### Penggunaan Ikon

| Ikon | Penggunaan |
|---|---|
| `Users` | Siswa Aktif, navigasi Siswa |
| `BookOpen` | Buku Terbaca, fallback sampul buku |
| `Clock` | Rata-rata Durasi |
| `TrendingUp` | Paling Sering Dibaca, kosong state |
| `Search` | Pencarian |
| `Plus` | Tombol tambah (FAB) |
| `X` | Tutup modal |
| `Check` | Konfirmasi/submit |
| `Eye` / `EyeOff` | Toggle show/hide password |
| `LogOut` | Tombol logout |
| `Printer` | Cetak laporan |
| `Info` | Tips / informasi |
| `Megaphone` | Pengumuman |
| `BarChart3` | Laporan Literasi |
| `Calendar` | Tanggal |

---

## 10. Warna Status

| Status | Warna Teks | Warna Background | Tailwind |
|---|---|---|---|
| Selesai | `#16A34A` | `#DCFCE7` | `text-success bg-success-light` |
| Masih Baca | `#92400E` | `#FEF9C3` | `text-[#92400E] bg-warning-light` |
| Aktif | `#003B95` | `#E8F1FF` | `text-primary bg-primary-light` |
| Error | `#DC2626` | `#FEE2E2` | `text-danger bg-red-100` |

---

## 11. Aturan Responsivitas

| Aspek | Aturan |
|---|---|
| Lebar ideal | 390px |
| Lebar minimum | 360px |
| Desktop | Container di-center dengan `mx-auto max-w-[390px]` |
| Modal desktop | Di-center vertikal dengan `sm:items-center` |
| Modal mobile | Muncul dari bawah (`items-end`) |
| Horizontal scroll | Chip filter dan navigasi menggunakan `overflow-x-auto` |
| Scrollbar | Disembunyikan dengan class `scrollbar-hide` |
| Max-scale viewport | `maximum-scale=1.0, user-scalable=no` |

---

## 12. Panduan Aksesibilitas

| Aspek | Implementasi |
|---|---|
| Label form | Menggunakan `<label>` dengan `text-[11px] font-semibold uppercase` |
| Aria labels | FAB memiliki `aria-label` ("Catat Aktivitas", "Tambah Siswa", "Tambah Buku") |
| Kontras warna | Teks putih di atas background primary (#003B95) memenuhi standar WCAG AA |
| Focus visible | Input menggunakan `focus:border-primary focus:ring-[3px] focus:ring-primary/12` |
| Pesan error | Error ditampilkan inline di bawah field terkait dengan warna merah |
| Disabled state | Tombol disabled menggunakan warna abu-abu dan `cursor-not-allowed` |
| Font ukuran | Caption minimum 10px, tetapi sebagian besar teks 13px atau lebih |
| Placeholder | Menggunakan warna `text-muted` (#94A3B8) yang cukup kontras |
