# UC-003 — Data Siswa

**File:** `src/pages/Siswa.jsx`  
**Route:** `/siswa`  
**Authentication required:** Yes  
**Layout:** AuthenticatedLayout (AppHeader + BottomNav)

---

## Entry Points

| From                        | How                                      |
|-----------------------------|------------------------------------------|
| BottomNav "Siswa" icon      | Click Users icon                         |
| Beranda "Tambah Siswa Baru" | Navigates with `state: { openAdd: true }`|

---

## Page Layout

```
+------------------------------------------+
|  Data Siswa                              |
|                                          |
|  +----------------------------------+   |
|  | 🔍 Cari Nama atau NIS...         |   |
|  +----------------------------------+   |
|                                          |
|  +----------------------------------+   |
|  | Nama Siswa 1           [5A]      |   |
|  | NIS: 2024001                     |   |
|  | [👁 Lihat] [✏ Edit]             |   |
|  +----------------------------------+   |
|  +----------------------------------+   |
|  | Nama Siswa 2           [6B]      |   |
|  | NIS: 2024005                     |   |
|  | [👁 Lihat] [✏ Edit]             |   |
|  +----------------------------------+   |
|  ...                                    |
|                                          |
|                            [➕ FAB]     |
+------------------------------------------+
```

---

## UI Elements

| Element              | Type                | Details                              |
|----------------------|---------------------|--------------------------------------|
| Page title           | Heading             | "Data Siswa" (text-2xl, font-extrabold) |
| Search bar           | `<Input icon=Search>`| Placeholder: "Cari Nama atau NIS..." |
| Student list         | StudentCard[]       | Name, NIS, class badge, Lihat/Edit buttons |
| FAB                  | Floating button     | Plus icon, `aria-label="Tambah Siswa"` |
| Success toast        | Banner              | Green background, auto-dismiss 3s    |
| View modal           | Bottom sheet        | "Detail Siswa" — read-only fields    |
| Add/Edit modal       | Bottom sheet        | Form with 4 fields + submit button   |

---

## User Flow

### Step 1 — View Student List

- All students are loaded from localStorage via `getSiswa()`.
- Each student card displays: name (truncated), NIS, class badge.
- Two action buttons per card: **Lihat** (View), **Edit**.

### Step 2 — Search Students

- Type in the search bar to filter by name or NIS (case-insensitive).
- Filtering updates in real-time as the user types.
- If no match: shows `"Siswa tidak ditemukan"`.
- If list is empty (no data): shows `"Belum ada data siswa"`.

### Step 3 — View Student Detail

1. Click **"Lihat"** on any student card.
2. A bottom-sheet modal opens with title "Detail Siswa".
3. Displays: Nama, NIS, Kelas, Alamat (shows `-` if empty).
4. Click the **X** button to close.

### Step 4 — Edit Student

1. Click **"Edit"** on any student card.
2. A bottom-sheet modal opens with title "Edit Siswa".
3. Form is pre-populated with the student's current data.
4. Modify fields and click **"Simpan Perubahan"**.
5. On success: modal closes, list updates, shows `"Data siswa berhasil diperbarui"` for 3 seconds.

### Step 5 — Add Student (from FAB)

1. Click the **"+"** FAB (floating action button at bottom-right).
2. A bottom-sheet modal opens with title "Tambah Siswa Baru".
3. Fill in form fields (see below).
4. Click **"Tambah Siswa"** to submit.

### Step 6 — Add Student (from Beranda)

1. Click "Tambah Siswa Baru" on Beranda.
2. Navigates to `/siswa` with `state: { openAdd: true }`.
3. The page detects this state on mount and auto-opens the Add Student modal.
4. The state is cleared via `window.history.replaceState` so back-navigation won't re-trigger.
5. Same form and validation as Step 5.

---

## Add/Edit Form

### Fields

| Field              | Placeholder              | Required | Notes              |
|--------------------|--------------------------|:--------:|--------------------|
| Nama Lengkap       | "Nama Lengkap"           | ✅       | Text input         |
| NIS                | "NIS"                    | ✅       | Text input, must be unique |
| Kelas              | "Kelas (contoh: 5A)"     | ✅       | Text input         |
| Alamat             | "Alamat (opsional)"      | ❌       | Text input         |

### Submit Button Labels

| Mode  | Label                         | Variant  |
|-------|-------------------------------|----------|
| Add   | `"<Check> Tambah Siswa"`      | positive |
| Edit  | `"<Check> Simpan Perubahan"`  | positive |

---

## Validation Rules

| Field    | Condition          | Message                    |
|----------|--------------------|----------------------------|
| Nama     | Empty after trim   | `"Nama siswa wajib diisi"` |
| NIS      | Empty after trim   | `"NIS wajib diisi"`        |
| NIS      | Duplicate (excl. current edit target) | `"NIS sudah terdaftar"` |
| Kelas    | Empty after trim   | `"Kelas wajib diisi"`      |

---

## Success Messages

| Action | Message                                  |
|--------|------------------------------------------|
| Add    | `"Data siswa berhasil ditambahkan"`      |
| Edit   | `"Data siswa berhasil diperbarui"`       |

Messages auto-dismiss after 3 seconds.

---

## Data Persistence

- Saves to localStorage key `literasi_siswa` via `saveSiswa()`.
- New student object: `{ idSiswa: generateId('S'), namaSiswa, nis, kelas, alamat, statusAktif: true }`.
- Data persists across page refreshes.
- New students immediately appear in the "Pilih Siswa" dropdown on the Catat Aktivitas page.

---

## Empty States

| Scenario                     | Message                        |
|------------------------------|--------------------------------|
| No students in database      | `"Belum ada data siswa"`       |
| Search yields no results     | `"Siswa tidak ditemukan"`      |

---

## Navigation After Actions

| Action                     | Destination |
|----------------------------|-------------|
| Add student (from Beranda) | Stays on `/siswa` with updated list |
| Add student (from FAB)     | Stays on `/siswa` with updated list |
| Edit student               | Stays on `/siswa` with updated list |
| Cancel/Close modal         | Stays on `/siswa` |
| BottomNav to other pages   | Per selected item |
