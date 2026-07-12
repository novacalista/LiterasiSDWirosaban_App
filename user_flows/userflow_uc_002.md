# UC-002 — Beranda (Dashboard)

**File:** `src/pages/Beranda.jsx`  
**Route:** `/beranda`  
**Authentication required:** Yes  
**Layout:** AuthenticatedLayout (AppHeader + BottomNav)

---

## Entry Points

| From                        | How                                      |
|-----------------------------|------------------------------------------|
| Login success               | Auto-redirect to `/beranda`              |
| BottomNav "Beranda" icon    | Click Home icon                          |
| After saving activity       | Auto-redirect from Catat Aktivitas (1.5s)|
| App brand/logo              | (Not clickable in current implementation)|

---

## Page Layout

```
+------------------------------------------+
|  Perpustakaan                             |
|  Semangat membantu siswa...              |
|                                          |
|  +--------+  +--------+  +--------+     |
|  | [Users]|  |[Book]  |  |[Clock] |     |
|  |   8    |  |   3    |  | 27 mnt |     |
|  |Siswa   |  |Buku    |  |Rata-   |     |
|  |Aktif   |  |Terbaca |  |rata    |     |
|  |        |  |Minggu  |  |Durasi  |     |
|  |        |  |Ini     |  |Baca    |     |
|  +--------+  +--------+  +--------+     |
|                                          |
|  Aksi Cepat                              |
|  +----------------+ +----------------+  |
|  | [Book] Catat   | | [Plus] Tambah  |  |
|  | Aktivitas      | | Siswa Baru     |  |
|  +----------------+ +----------------+  |
|                                          |
|  [Megaphone] Pengumuman                 |
|  Program literasi bulan ini: ...        |
|                                          |
|  Aktivitas Terkini                      |
|  +----------------------------------+  |
|  | Siswa A - Buku X          [badge]|  |
|  | Tanggal · 30 menit               |  |
|  +----------------------------------+  |
|  ... (up to 5 items)                  |
|                                          |
|  [Book] "Buku adalah jendela dunia"    |
|  Ayo tingkatkan literasi siswa SDN...  |
+------------------------------------------+
```

---

## UI Elements

| Section               | Content                                      |
|-----------------------|----------------------------------------------|
| Page header           | Title "Perpustakaan", subtitle "Semangat..." |
| Stats row (3 columns) | Siswa Aktif, Buku Terbaca/Minggu Ini, Rata-rata Durasi Baca |
| Aksi Cepat (2 cols)   | "Catat Aktivitas" card, "Tambah Siswa Baru" card |
| Pengumuman            | Announcement card with Megaphone icon        |
| Aktivitas Terkini     | Up to 5 most recent ActivityCards            |
| Footer banner         | Motivational quote in primary color          |

### Stats Details

| Stat          | Source                                           | Format         |
|---------------|--------------------------------------------------|----------------|
| Siswa Aktif   | Count of students with `statusAktif === true`     | Plain number   |
| Buku Terbaca/Minggu Ini | Unique `idBuku` in current week's activities | Plain number   |
| Rata-rata Durasi Baca | Average `durasiBaca` across all activities  | `{n} mnt`      |

### Quick Action Cards

| Button              | Style      | Action                                    |
|---------------------|------------|-------------------------------------------|
| Catat Aktivitas     | bg-primary | `navigate('/catat-aktivitas')`            |
| Tambah Siswa Baru   | bg-secondary| `navigate('/siswa', { state: { openAdd: true } })` |

---

## User Flow

### Step 1 — View Dashboard

KPIs are computed dynamically from localStorage data:
- Active student count
- Weekly unique books read
- Average reading duration across all activities
- 5 most recent activities displayed

### Step 2 — Quick Actions

**Option A: Catat Aktivitas**
- Click the "Catat Aktivitas" card → navigates to `/catat-aktivitas`.
- This is the same destination as the center FAB in BottomNav.

**Option B: Tambah Siswa Baru**
- Click the "Tambah Siswa Baru" card → navigates to `/siswa` with router state `{ openAdd: true }`.
- The Siswa page detects this state and auto-opens the add-student modal.

### Step 3 — View Recent Activity

- The 5 most recent activities are shown as `ActivityCard` components.
- Each shows: student name, book title, status badge (Selesai/Masih Baca), date, and duration.
- If no activities exist, shows `"Belum ada data aktivitas membaca"`.

---

## Empty State

- **No activities:** Shows a centered `TrendingUp` icon with `"Belum ada data aktivitas membaca"`.
- **No students:** The "Siswa Aktif" stat shows `0`.
- **No books:** The "Buku Terbaca Minggu Ini" stat shows `0`.

---

## Navigation After Actions

| Action                     | Destination          |
|----------------------------|----------------------|
| Click "Catat Aktivitas"    | `/catat-aktivitas`   |
| Click "Tambah Siswa Baru"  | `/siswa` (add modal auto-opens) |
| Click BottomNav items      | Per selected item    |
| Click AppHeader logout     | `/login`             |
