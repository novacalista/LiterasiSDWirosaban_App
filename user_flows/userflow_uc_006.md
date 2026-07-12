# UC-006 — Laporan Literasi

**File:** `src/pages/Laporan.jsx`  
**Route:** `/laporan`  
**Authentication required:** Yes  
**Layout:** AuthenticatedLayout (AppHeader + BottomNav)

---

## Entry Points

| From                   | How                  |
|------------------------|----------------------|
| BottomNav "Laporan" icon | Click BarChart3 icon |

---

## Page Layout

```
+------------------------------------------+
|  Laporan Literasi        [🖨 Cetak]      |
|  Ringkasan aktivitas membaca siswa...    |
|                                          |
|  +----------+  +----------+             |
|  |[Book]    |  |[Clock]   |             |
|  |  Total   |  |  Total   |             |
|  | Laporan  |  | Durasi   |             |
|  |    8     |  | 5.3 Jam  |             |
|  +----------+  +----------+             |
|  +----------+  +----------+             |
|  |[Users]   |  |[Book]    |             |
|  |  Siswa   |  | Koleksi  |             |
|  |  Aktif   |  | Terbaca  |             |
|  |  7 / 8   |  |   80%    |             |
|  +----------+  +----------+             |
|                                          |
|  Laporan Bulan Ini                      |
|  +----------------------------------+  |
|  |  ██                               |  |
|  |  ██ ██                            |  |
|  |  ██ ██ ██                         |  |
|  |  ██ ██ ██ ██                      |  |
|  |  ██ ██ ██ ██ ██                   |  |
|  |  3  5  2  4  6  8                 |  |
|  | 06  07  08  09  10  11            |  |
|  +----------------------------------+  |
|                                          |
|  Buku Terfavorit                        |
|  +----------------------------------+  |
|  | [gradient] Dongeng Sebelum Tidur   |  |
|  |            Maya Indah - Fiksi      |  |
|  |            15 kali dibaca          |  |
|  +----------------------------------+  |
+------------------------------------------+
```

---

## UI Elements

| Element                 | Type                         | Details                       |
|-------------------------|------------------------------|-------------------------------|
| Page header             | Heading + subtitle + Print   | "Laporan Literasi" + description |
| Print button            | `<Button>` + Printer icon    | Label: "Cetak"                |
| KPI cards               | 2x2 ReportCard grid          | 4 statistics                  |
| Bar chart               | "Laporan Bulan Ini"          | Last 6 months                 |
| Favorite book card      | "Buku Terfavorit"            | Primary background            |

---

## KPI Statistics

| Label                  | Value                      | Icon     | Meaning                                  |
|------------------------|----------------------------|----------|------------------------------------------|
| Total Laporan          | Count of all activities    | BookOpen | Total reading sessions recorded           |
| Total Durasi Kolektif  | Sum of `durasiBaca` / 60   | Clock    | Total reading hours across all students   |
| Siswa Aktif            | Unique students / Total active | Users  | Student participation rate                |
| Koleksi Terbaca        | Unique books / Total books | Book     | Percentage of collection that has been read |

---

## Bar Chart (Laporan Bulan Ini)

- Groups activities by month (`YYYY-MM` format).
- Shows the **last 6 months** with data.
- Each bar's height is proportional to the month's activity count relative to the max.
- Label format: `MM/YY` (e.g., `07/26`).
- If no data: shows `"Belum ada data laporan"` with TrendingUp icon.

---

## Buku Terfavorit

- The book with the most activity records (highest count of `idBuku` in aktivitas).
- Displays: gradient cover, title, author + category, read count in yellow.
- If no activities: shows `"Belum ada buku terfavorit"`.

---

## User Flow

### Step 1 — View Report

- All KPIs are computed dynamically from localStorage data.
- 4 KPI cards in a 2x2 grid.
- Bar chart shows monthly activity trends.
- Favorite book card at the bottom.

### Step 2 — Print Report

1. Click the **"Cetak"** button in the top-right.
2. Calls `window.print()`.
3. If the browser supports print, the system print dialog opens.
4. If print fails (e.g., unsupported browser), shows error: `"Fitur cetak tidak tersedia pada browser ini"`.

---

## Empty States

| Component               | Condition          | Message                           |
|-------------------------|--------------------|-----------------------------------|
| Bar chart               | No activities      | `"Belum ada data laporan"`        |
| Buku Terfavorit         | No activities      | `"Belum ada buku terfavorit"`     |

---

## Print Details

- Uses native `window.print()` — no PDF library.
- The page is designed to be print-friendly via standard browser print dialog.
- Error handling: try/catch with fallback message.
- Print error message: `"Fitur cetak tidak tersedia pada browser ini"`.

---

## Navigation After Actions

| Action             | Destination        |
|--------------------|--------------------|
| Click "Cetak"      | Opens print dialog |
| BottomNav to other pages | Per selected item |

---

## Notes

- All statistics are computed from actual `literasi_aktivitas`, `literasi_siswa`, and `literasi_buku` data.
- The "Siswa Aktif" fraction (`X / Y`) shows: unique students who have activities out of total active students.
- The "Koleksi Terbaca" percentage shows: unique books that have been read out of total books.
- The bar chart only shows months that have at least one activity. Months with zero activities are not displayed.
