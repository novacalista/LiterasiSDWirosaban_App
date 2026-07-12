# Implementation Notes

## Architecture

- Single-page application built with React 19 + Vite.
- **Primary database:** Supabase (PostgreSQL) for students, books, and reading activities.
- **Fallback:** `localStorage` is used when Supabase is not configured (prototype/demo mode).
- **Authentication:** Client-side only using hardcoded dummy credentials stored in localStorage.
- Routing via React Router 7 with `ProtectedRoute` guard component.
- Mobile-first layout with 390px ideal width, min-width 360px.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ActivityCard.jsx
│   ├── AppHeader.jsx
│   ├── Badge.jsx
│   ├── BookCard.jsx
│   ├── BottomNav.jsx
│   ├── Button.jsx
│   ├── index.js
│   ├── Input.jsx
│   ├── ReportCard.jsx
│   ├── StatCard.jsx
│   └── StudentCard.jsx
├── pages/               # Route page components
│   ├── Beranda.jsx
│   ├── Buku.jsx
│   ├── CatatAktivitas.jsx
│   ├── Laporan.jsx
│   ├── Login.jsx
│   └── Siswa.jsx
├── services/            # Data and auth services
│   ├── authService.js
│   ├── dummyData.js     # Data access layer (Supabase first, localStorage fallback)
│   ├── supabaseClient.js
│   └── supabaseService.js
├── App.jsx              # Route definitions
├── index.css            # Tailwind + custom styles
└── main.jsx             # App entry point
```

## Reusable Components

All UI components are in `src/components/` and exported via `index.js`:

- **AppHeader** - Top header with brand logo, school name, and logout button
- **BottomNav** - Fixed bottom navigation with 5 items (center FAB for catat aktivitas)
- **StatCard** - KPI statistic card (icon, value, label)
- **ReportCard** - Report KPI card variant (icon, value, label)
- **StudentCard** - Student list item (name, NIS, class badge, view/edit buttons)
- **BookCard** - Book grid card (gradient cover, category, title, author) with compact variant
- **ActivityCard** - Recent activity item (student, book, date, duration, status badge)
- **Button** - Reusable button with primary/secondary/positive/disabled variants and sizes
- **Input** - Form input with icon, error state, and textarea mode
- **Badge** - Inline label with variants: default, success, warning, popular, kelas, category

## Design System Compliance

- Colors, spacing, typography, and component styles follow `design_system.md`.
- Color palette: Primary (#003B95), Secondary (#00A884), Success (#16A34A), Warning (#FACC15), etc.
- Font: Inter (loaded from Google Fonts), fallback Arial/sans-serif.
- All cards use white background (#FFFFFF), border (#E2E8F0), border-radius 12-16px, soft shadow.
- Bottom navigation: fixed, 64px height, raised center action button (-20px offset).
- Typography scale: Page title 24px/800, Section title 16px/700, Body 13px/400, Caption 11px/400.

## Data Flow

1. **`src/services/supabaseClient.js`** - Initializes Supabase client from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars.
2. **`src/services/supabaseService.js`** - Supabase-specific CRUD operations with column mapping (snake_case in DB, camelCase in JS).
3. **`src/services/dummyData.js`** - Unified data access layer. All exported CRUD functions are async: they try Supabase first, fall back to localStorage if Supabase is not configured or fails.
4. **`src/services/authService.js`** - Simple client-side authentication with dummy account (localStorage only).
5. Pages call async functions from `dummyData.js` via `useEffect` for loading and `async` event handlers for mutations.
6. `initDummyData()` called in `main.jsx` on first load to seed both localStorage and (if configured) Supabase.

## Dummy Data

- **8 students** - Various classes (4A-6B), all active.
- **10 books** - Categories: Fiksi (4), Sains (3), Sejarah (3), plus "Umum" available for new entries.
- **8 reading activities** - Mix of "Masih Baca" and "Selesai" statuses.
- **1 petugas** - Username: `petugas`, Password: `literasi123`.

## Assumptions and Decisions

1. **Dummy data values** - Statistic card values on Beranda are computed from the actual dummy data rather than hardcoded. The Figma mockup shows specific numbers (342, 1,208, 45) but the prototype calculates them from available data. This is intentional to demonstrate dynamic data flow.

2. **Authentication** - Entirely client-side. The auth service checks against a hardcoded object in memory. No server, no session cookies, no JWTs.

3. **Book covers** - Since we have no real images, gradient backgrounds are used as placeholders. Colors correspond to category: pink-purple for Fiksi, cyan-blue for Sains, amber-orange for Sejarah.

4. **Floating action buttons** - Both Data Siswa and Katalog Buku pages have FABs for adding new entries. These open bottom-sheet modal forms with validation and Supabase/localStorage persistence.

5. **Tambah Siswa Baru on Beranda** - The "Tambah Siswa Baru" quick action button navigates to `/siswa` with router state `{ openAdd: true }`. The Siswa page detects this state on mount via `useLocation()` and auto-opens the Add Student modal. This avoids an extra click while keeping all add logic on the Siswa page.

6. **Form validation** - Error messages match the exact wording from the User Flow documents (UC-003, UC-004, UC-005).

7. **Status toggle** - Uses two toggle buttons rather than a dropdown for better UX, matching the Figma reference.

8. **Print** - Uses native `window.print()` wrapped in try/catch. The report page is designed to be print-friendly when printed.

## Supabase Integration

### Configuration
- Copy `.env.example` to `.env` and fill in your Supabase project credentials.
- Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables.
- When these are not set, the app operates in **prototype mode** using localStorage only.

### Required Tables

```sql
CREATE TABLE students (
  id_siswa TEXT PRIMARY KEY,
  nama_siswa TEXT NOT NULL,
  nis TEXT NOT NULL UNIQUE,
  kelas TEXT NOT NULL,
  alamat TEXT DEFAULT '',
  status_aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE books (
  id_buku TEXT PRIMARY KEY,
  judul_buku TEXT NOT NULL,
  penulis TEXT NOT NULL,
  kategori TEXT NOT NULL,
  cover_url TEXT DEFAULT '',
  jumlah_dibaca INTEGER DEFAULT 0,
  catatan TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE reading_activities (
  id_aktivitas TEXT PRIMARY KEY,
  id_siswa TEXT NOT NULL REFERENCES students(id_siswa),
  id_buku TEXT NOT NULL REFERENCES books(id_buku),
  tanggal DATE NOT NULL,
  durasi_baca INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Selesai', 'Masih Baca')),
  catatan TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Data Persistence Strategy
- All CRUD operations go through `dummyData.js` which tries Supabase first.
- On every write, data is **also** saved to localStorage as a backup/fallback.
- On every read, Supabase is queried first; if unavailable, localStorage data is returned.
- `initDummyData()` seeds both localStorage and Supabase tables on first load.

### Cross-Entity Side Effect
- `addAktivitas()` increments `jumlah_dibaca` on the associated book.
- In Supabase this is done via `rpc('increment_book_read_count')` if the function exists, or by a manual read-update cycle.

## Limitations (Known / Out of Scope)

- No custom backend API server is implemented because the app uses Supabase as the backend-as-a-service.
- No real authentication server (password stored in plaintext in source code).
- No multi-school or multi-role support.
- No file upload, OCR, barcode/QR scanning.
- No real book cover images (gradient placeholders only).
- No PDF generation (uses browser-native print dialog only).
- No student self-login or parent portal.
- No email/SMS notifications.
- In production mode, main data is stored in Supabase. If Supabase is not configured, the app falls back to localStorage for prototype/demo mode.
- No pagination - all data loaded at once (acceptable for prototype scale).

## Add Student Feature

- Triggered from two entry points: the "Tambah Siswa Baru" quick action on Beranda (navigates to `/siswa` with `openAdd` state) and the floating plus button on the Data Siswa page.
- Opens a bottom-sheet modal with fields: Nama Lengkap, NIS, Kelas, Alamat (opsional).
- Validates before saving: namaSiswa required, NIS required, NIS must be unique, kelas required.
- Saves to Supabase (primary) and localStorage (fallback) via `saveSiswa()` — data persists across page refreshes.
- After saving, the modal closes, the student list updates immediately, and a success toast appears ("Data siswa berhasil ditambahkan").
- New students automatically appear in the "Pilih Siswa" dropdown on the Catat Aktivitas page (since it reads from `getSiswa()` on mount).

## Add Book Feature

- Triggered from the floating plus button on the Katalog Buku page.
- Opens a bottom-sheet modal with fields: Judul Buku, Penulis, Kategori, Catatan/Deskripsi (opsional).
- Category options: Fiksi, Sains, Sejarah, Umum.
- Validates before saving: judulBuku required, penulis required, kategori required.
- Saves to Supabase (primary) and localStorage (fallback) via `saveBuku()` — data persists across page refreshes.
- After saving, the modal closes, the book grid updates immediately, and a success toast appears ("Data buku berhasil ditambahkan").
- New books automatically appear in the "Pilih Buku" dropdown on the Catat Aktivitas page (since it reads from `getBuku()` on mount).
- Category filter chips and search continue to work with newly added books.

## Current Limitations

- **Supabase-dependent** — the app requires a valid Supabase project for production use; without it, data only persists in localStorage.
- **No Supabase Auth** — login remains client-side dummy authentication; Supabase Auth is not implemented.
- **No real authentication** — password (`literasi123`) is hardcoded in source code, not hashed.
- **No multi-school or multi-role** — designed exclusively for SDN Wirosaban petugas.
- **No file upload or book cover images** — gradient placeholders only.

## Build & Run

```bash
npm install        # Install dependencies
npm run dev        # Development server on http://localhost:5173
npm run build      # Production build to dist/
npm run lint       # Run oxlint static analysis
```
