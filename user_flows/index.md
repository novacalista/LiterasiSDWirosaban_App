# SILAS — User Flows

**Sistem Informasi Literasi Membaca Siswa SDN Wirosaban**

## Overview

SILAS is a mobile-first library literacy tracking application for SDN Wirosaban.  
It allows a single petugas (library officer) to manage student data, record reading activities, manage the book catalog, and view literacy reports.

All data is stored in `localStorage` — no backend server is required.

---

## Use Case Index

| UC  | Page              | File                         | Description                         |
|-----|-------------------|------------------------------|-------------------------------------|
| 001 | Login             | `src/pages/Login.jsx`        | Authenticate as petugas             |
| 002 | Beranda           | `src/pages/Beranda.jsx`      | Dashboard with KPIs and quick links |
| 003 | Data Siswa        | `src/pages/Siswa.jsx`        | Manage student records              |
| 004 | Catat Aktivitas   | `src/pages/CatatAktivitas.jsx`| Record a student's reading activity |
| 005 | Katalog Buku      | `src/pages/Buku.jsx`         | Browse and add books                |
| 006 | Laporan Literasi  | `src/pages/Laporan.jsx`      | View literacy statistics and print  |

---

## Navigation Map

```
/ (root)
  +--> authenticated? --> /beranda
  |                            +--> /catat-aktivitas  (Aksi Cepat card or center FAB)
  |                            |       +--> auto-redirect to /beranda after save (1.5s)
  |                            |
  |                            +--> /siswa?openAdd     (Tambah Siswa Baru card)
  |
  +--> not authenticated? --> /login
                                +--> success --> /beranda (replace)

BottomNav (protected):
  Beranda  Siswa  [FAB → Catat Aktivitas]  Buku  Laporan

AppHeader logout --> /login
```

---

## Shared Layout (Authenticated Pages)

All pages except Login are wrapped in `AuthenticatedLayout`:

```
+------------------------------------------+
|  AppHeader (brand + logout)              |
+------------------------------------------+
|  Page content (scrollable)               |
+------------------------------------------+
|  BottomNav (5 items, center FAB)         |
+------------------------------------------+
```

- Container: `max-w-[390px] mx-auto` (mobile-first, centered on desktop)
- Colors: Primary `#003B95`, Secondary `#00A884`, Background `#F7F8FC`
- Font: Inter

---

## Data Storage

| Key                 | Data        | CRUD             |
|---------------------|-------------|------------------|
| `literasi_auth`     | AuthSession | authService.js   |
| `literasi_siswa`    | Student[]   | dummyData.js     |
| `literasi_buku`     | Book[]      | dummyData.js     |
| `literasi_aktivitas`| Activity[]  | dummyData.js     |

---

## Dummy Credentials

- **Username:** `petugas`
- **Password:** `literasi123`

---

## Related Documents

- [UC-001 — Login](userflow_uc_001.md)
- [UC-002 — Beranda](userflow_uc_002.md)
- [UC-003 — Data Siswa](userflow_uc_003.md)
- [UC-004 — Catat Aktivitas](userflow_uc_004.md)
- [UC-005 — Katalog Buku](userflow_uc_005.md)
- [UC-006 — Laporan Literasi](userflow_uc_006.md)
