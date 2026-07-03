# Implementation Notes

## Architecture

- Single-page application built with React 19 + Vite.
- All data stored in `localStorage` with JSON serialization.
- Authentication is client-side only using hardcoded dummy credentials.
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
│   └── dummyData.js
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

1. `src/services/dummyData.js` - Data initialization, CRUD helpers, and localStorage persistence.
2. `src/services/authService.js` - Simple client-side authentication with dummy account.
3. Pages read from localStorage via service functions and write back on mutations.
4. `initDummyData()` called in `main.jsx` on first load to populate initial data.

## Dummy Data

- **8 students** - Various classes (4A-6B), all active.
- **10 books** - Categories: Fiksi (4), Sains (3), Sejarah (3).
- **8 reading activities** - Mix of "Masih Baca" and "Selesai" statuses.
- **1 petugas** - Username: `petugas`, Password: `literasi123`.

## Assumptions and Decisions

1. **Dummy data values** - Statistic card values on Beranda are computed from the actual dummy data rather than hardcoded. The Figma mockup shows specific numbers (342, 1,208, 45) but the prototype calculates them from available data. This is intentional to demonstrate dynamic data flow.

2. **Authentication** - Entirely client-side. The auth service checks against a hardcoded object in memory. No server, no session cookies, no JWTs.

3. **Book covers** - Since we have no real images, gradient backgrounds are used as placeholders. Colors correspond to category: pink-purple for Fiksi, cyan-blue for Sains, amber-orange for Sejarah.

4. **Floating action buttons** - Both Data Siswa and Katalog Buku pages have FABs for adding new entries. These open modal forms.

5. **Tambah Siswa Baru on Beranda** - The "Tambah Siswa Baru" quick action button navigates to `/siswa` where the user can use the FAB to add a student. This follows the acceptable implementation per UC-002 (the spec allows either redirect or inline modal).

6. **Form validation** - Error messages match the exact wording from the User Flow documents (UC-003, UC-004, UC-005).

7. **Status toggle** - Uses two toggle buttons rather than a dropdown for better UX, matching the Figma reference.

8. **Print** - Uses native `window.print()` wrapped in try/catch. The report page is designed to be print-friendly when printed.

## Limitations (Known / Out of Scope)

- No real backend API or database server.
- No real authentication server (password stored in plaintext in source code).
- No multi-school or multi-role support.
- No file upload, OCR, barcode/QR scanning.
- No real book cover images (gradient placeholders only).
- No PDF generation (uses browser-native print dialog only).
- No student self-login or parent portal.
- No email/SMS notifications.
- Data persists only in browser localStorage - clearing it resets everything.
- No pagination - all data loaded at once (acceptable for prototype scale).

## Build & Run

```bash
npm install        # Install dependencies
npm run dev        # Development server on http://localhost:5173
npm run build      # Production build to dist/
npm run lint       # Run oxlint static analysis
```
