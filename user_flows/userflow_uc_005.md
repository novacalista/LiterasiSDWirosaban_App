# UC-005 — Katalog Buku

**File:** `src/pages/Buku.jsx`  
**Route:** `/buku`  
**Authentication required:** Yes  
**Layout:** AuthenticatedLayout (AppHeader + BottomNav)

---

## Entry Points

| From                 | How               |
|----------------------|-------------------|
| BottomNav "Buku" icon| Click BookOpen icon |

---

## Page Layout

```
+------------------------------------------+
|  Katalog Buku                            |
|  Jelajahi koleksi buku perpustakaan      |
|                                          |
|  +----------------------------------+   |
|  | 🔍 Cari judul buku atau penulis..|   |
|  +----------------------------------+   |
|                                          |
|  [Semua] [Fiksi] [Sains] [Sejarah] [Umum]|
|                                          |
|  📈 Paling Sering Dibaca                |
|  +------+ +------+ +------+            |
|  |[Pop] | |      | |      |            |
|  |Buku A | |Buku B| |Buku C|            |
|  +------+ +------+ +------+            |
|                                          |
|  Koleksi Buku                           |
|  +----------+ +----------+             |
|  |[Fiksi]   | |[Sains]   |             |
|  |Judul Buku| |Judul Buku|             |
|  |Penulis   | |Penulis   |             |
|  +----------+ +----------+             |
|  +----------+ +----------+             |
|  | ...      | | ...      |             |
|  +----------+ +----------+             |
|                                          |
|                            [➕ FAB]     |
+------------------------------------------+
```

---

## UI Elements

| Element                 | Type                     | Details                          |
|-------------------------|--------------------------|----------------------------------|
| Page header             | Heading + subtitle       | "Katalog Buku" + description     |
| Search bar              | `<Input icon=Search>`    | Placeholder: "Cari judul buku atau penulis..." |
| Category filter pills   | Button row (horizontal scroll) | "Semua", "Fiksi", "Sains", "Sejarah", "Umum" |
| Paling Sering Dibaca    | Section heading + 3 BookCards | Top 3 by `jumlahDibaca` descending |
| Popular badge           | Badge variant="popular"  | Only on #1 book, "Popular" label |
| Koleksi Buku            | Section heading + 2-column grid | All books (filtered)        |
| FAB                     | Floating button          | Plus icon, `aria-label="Tambah Buku"` |
| Add Book modal          | Bottom sheet             | Form with 4 fields + submit      |
| Success toast           | Banner                   | Green background, auto-dismiss 3s|

---

## User Flow

### Step 1 — View Catalog

- All books loaded from localStorage via `getBuku()`.
- "Paling Sering Dibaca" section: top 3 books by `jumlahDibaca` (descending). #1 gets a "Popular" badge.
- "Koleksi Buku" section: full collection in a 2-column grid of `BookCard` components.

### Step 2 — Search & Filter

**Search:**
- Type in search bar to filter by title or author (case-insensitive).
- Updates results in real-time.

**Category filter:**
- Click a pill to filter by category: Semua, Fiksi, Sains, Sejarah, or Umum.
- Active pill is highlighted (bg-primary text-white).
- Inactive pills are light blue (bg-primary-light text-primary).

**Combined:** Search AND category filter work together. A book must match both criteria to appear.

### Step 3 — Add Book

1. Click the **"+"** FAB at bottom-right.
2. A bottom-sheet modal opens with title "Tambah Buku Baru".
3. Fill in form fields (see below).
4. Click **"Simpan"** to submit.
5. On success: modal closes, book grid updates immediately, shows `"Data buku berhasil ditambahkan"` for 3 seconds.

---

## Add Book Form

### Fields

| Field                  | Type         | Required | Details                          |
|------------------------|--------------|:--------:|----------------------------------|
| Judul Buku             | `<Input>`    | ✅       | Text input                       |
| Penulis                | `<Input>`    | ✅       | Text input                       |
| Kategori               | `<select>`   | ✅       | Fiksi, Sains, Sejarah, or Umum   |
| Catatan / Deskripsi    | `<textarea>` | ❌       | 3 rows, optional notes           |

### Submit Button

| Label                       | Variant  |
|-----------------------------|----------|
| `"<Check> Simpan"`          | positive |

---

## Validation Rules

| Field      | Condition           | Message                         |
|------------|---------------------|---------------------------------|
| Judul Buku | Empty after trim    | `"Judul buku wajib diisi"`      |
| Penulis    | Empty after trim    | `"Penulis wajib diisi"`         |
| Kategori   | Not selected        | `"Kategori wajib dipilih"`      |

---

## Success Message

| Action | Message                              |
|--------|--------------------------------------|
| Add    | `"Data buku berhasil ditambahkan"`   |

Auto-dismisses after 3 seconds.

---

## Empty States

| Scenario                     | Message                        |
|------------------------------|--------------------------------|
| No books in database         | `"Belum ada data buku"`        |
| Search/filter no results     | `"Buku tidak ditemukan"`       |

---

## Data Persistence

- Saves to localStorage key `literasi_buku` via `saveBuku()`.
- New book object: `{ idBuku: generateId('B'), judulBuku, penulis, kategori, coverUrl: '', jumlahDibaca: 0, catatan }`.
- Data persists across page refreshes.
- New books immediately appear in the "Pilih Buku" dropdown on the Catat Aktivitas page.

---

## Book Card Display

Each `BookCard` shows:

| Element   | Detail                                      |
|-----------|---------------------------------------------|
| Cover     | Gradient placeholder by category            |
| Badge     | Category label (Fiksi/Sains/Sejarah/Umum)   |
| Title     | Bold, 2-line clamp                          |
| Author    | Muted text                                  |

**Category gradient colors:**
- **Fiksi:** pink-purple gradient
- **Sains:** cyan-blue gradient
- **Sejarah:** amber-orange gradient
- **Umum:** primary-blue gradient (fallback)

---

## Navigation After Actions

| Action                     | Destination |
|----------------------------|-------------|
| Add book                   | Stays on `/buku` with updated list |
| Cancel/Close modal         | Stays on `/buku` |
| BottomNav to other pages   | Per selected item |
