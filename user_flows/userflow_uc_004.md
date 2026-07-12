# UC-004 — Catat Aktivitas

**File:** `src/pages/CatatAktivitas.jsx`  
**Route:** `/catat-aktivitas`  
**Authentication required:** Yes  
**Layout:** AuthenticatedLayout (AppHeader + BottomNav)

---

## Entry Points

| From                         | How                                      |
|------------------------------|------------------------------------------|
| Beranda "Catat Aktivitas"    | Click Aksi Cepat card                    |
| BottomNav center FAB         | Click "+" button                         |

---

## Page Layout

```
+------------------------------------------+
|  Catat Aktivitas                         |
|  Yuk, masukkan progres membaca siswa...  |
|                                          |
|  (warning banner if no students/books)   |
|                                          |
|  +----------------------------------+   |
|  | Pilih Siswa                      |   |
|  | [-- Pilih Siswa --        ▼]    |   |
|  +----------------------------------+   |
|                                          |
|  +----------------------------------+   |
|  | Pilih Buku                       |   |
|  | [-- Pilih Buku --          ▼]    |   |
|  +----------------------------------+   |
|                                          |
|  +-----------+  +--------------------+  |
|  | Tanggal   |  | Durasi (menit)    |  |
|  | [date]    |  | [0]               |  |
|  +-----------+  +--------------------+  |
|                                          |
|  Status Selesai                         |
|  +-------------+ +-------------+        |
|  | Masih Baca  | |  Selesai    |        |
|  +-------------+ +-------------+        |
|                                          |
|  Catatan (opsional)                     |
|  +----------------------------------+   |
|  | Catatan tambahan...              |   |
|  +----------------------------------+   |
|                                          |
|  +----------------------------------+   |
|  |       Simpan Aktivitas           |   |
|  +----------------------------------+   |
|                                          |
|  [ℹ] Tips Hari Ini: Pastikan siswa...  |
+------------------------------------------+
```

---

## UI Elements

| Element              | Type                         | Details                         |
|----------------------|------------------------------|----------------------------------|
| Page header          | Heading + subtitle           | "Catat Aktivitas" + description  |
| Warning banner       | Conditional banner           | Shown when no students/books exist |
| Pilih Siswa          | `<select>` or placeholder    | Options: `{nama} - {kelas}`      |
| Pilih Buku           | `<select>` or placeholder    | Options: `{judul} - {penulis}`   |
| Tanggal              | `<input type="date">`        | `max` = today                    |
| Durasi (menit)       | `<input type="number">`      | `min="1"`                        |
| Status toggle        | Two toggle buttons           | "Masih Baca" (default) / "Selesai" |
| Catatan              | `<Input type="textarea">`    | Optional, 2 rows                 |
| Submit button        | `<Button>`                   | Disabled when no students/books  |
| Tips banner          | Info icon + tip text         | Motivational message             |

---

## User Flow

### Step 1 — Enter Page

- On mount, reads `getSiswa()` (filtered to active students) and `getBuku()` from localStorage.
- If either list is empty, a warning banner appears (see Warning Banners below).
- The submit button is **disabled** if `canSubmit` is false (no students OR no books).

### Step 2 — Select Student

- Dropdown: `"-- Pilih Siswa --"` as default.
- Each option shows `"{namaSiswa} - {kelas}"`.
- If no students: shows static text `"Belum ada data siswa"`.

### Step 3 — Select Book

- Dropdown: `"-- Pilih Buku --"` as default.
- Each option shows `"{judulBuku} - {penulis}"`.
- If no books: shows static text `"Belum ada data buku"`.

### Step 4 — Fill Date and Duration

- **Tanggal:** Date picker, defaults to today. Cannot be a future date.
- **Durasi:** Number input in minutes. Must be a positive integer.

### Step 5 — Set Status

- Two toggle buttons: **"Masih Baca"** (warning/yellow style) and **"Selesai"** (success/green style).
- Default selection: "Masih Baca".
- Click to toggle between them.

### Step 6 — Add Notes (Optional)

- Textarea for any additional notes about the reading activity.

### Step 7 — Submit

1. Click **"Simpan Aktivitas"**.
2. Validation runs on all fields.
3. If errors exist, they appear inline below each field.
4. If valid, `addAktivitas()` is called, which:
   - Prepends the new activity to the activity list
   - Increments `jumlahDibaca` on the selected book by 1
5. Success banner appears: `"Aktivitas membaca berhasil disimpan"` + `"Mengalihkan ke Beranda..."`.
6. Form is reset to default values.
7. After 1.5 seconds, auto-navigates to `/beranda`.

---

## Validation Rules

| Field          | Condition                | Message                                       |
|----------------|--------------------------|-----------------------------------------------|
| Pilih Siswa    | No selection             | `"Siswa wajib dipilih"`                       |
| Pilih Buku     | No selection             | `"Buku wajib dipilih"`                        |
| Tanggal        | Empty                    | `"Tanggal wajib diisi"`                       |
| Tanggal        | Future date (> today)    | `"Tanggal tidak boleh melebihi hari ini"`     |
| Durasi         | Empty                    | `"Durasi wajib diisi"`                        |
| Durasi         | <= 0                     | `"Durasi harus lebih dari 0 menit"`           |
| Status         | Not selected             | `"Status wajib dipilih"`                      |

---

## Warning Banners

| Condition                              | Message                                                      |
|----------------------------------------|--------------------------------------------------------------|
| No students AND no books               | `"Belum ada data siswa dan buku. Silakan tambah data terlebih dahulu."` |
| No students only                       | `"Belum ada data siswa. Silakan tambah siswa terlebih dahulu."` |
| No books only                          | `"Belum ada data buku. Silakan tambah buku terlebih dahulu."` |

---

## Success Behavior

- Green banner: `"Aktivitas membaca berhasil disimpan"`
- Subtext: `"Mengalihkan ke Beranda..."`
- Auto-redirect to `/beranda` after 1.5 seconds.

---

## Tip Banner

Displayed at the bottom of the page:

> "Tips Hari Ini: Pastikan siswa mencatat durasi minimal 15 menit per hari untuk mendapatkan lencana Pembaca Setia."

---

## Navigation After Actions

| Action             | Destination            | Timing  |
|--------------------|------------------------|---------|
| Submit success     | Auto-redirect to `/beranda` | After 1.5s |
| Cancel (no button) | Use BottomNav or browser back | Manual |

---

## Cross-Entity Side Effect

When an activity is saved, `addAktivitas()` in `dummyData.js` also **increments** the `jumlahDibaca` counter on the selected book. This affects:
- The "Paling Sering Dibaca" section on the Buku page
- The "Buku Terfavorit" statistic on the Laporan page
