# UC-001 — Login

**File:** `src/pages/Login.jsx`  
**Route:** `/login`  
**Authentication required:** No (public)  
**Roles:** Petugas Perpustakaan

---

## Entry Points

| From  | How                                |
|-------|-------------------------------------|
| Any unauthenticated route | `RootRedirect` redirects to `/login` |
| AppHeader logout | Calls `logout()`, navigates to `/login` |
| Protected route (no session) | `ProtectedRoute` redirects to `/login` |

---

## Page Layout

```
+------------------------------------------+
|            [Book Icon]                    |
|         Literasi Membaca                  |
|           SDN Wirosaban                   |
|                                          |
|    +----------------------------------+  |
|    |  Username                        |  |
|    +----------------------------------+  |
|                                          |
|    +----------------------------------+  |
|    |  Password                    [eye]|  |
|    +----------------------------------+  |
|                                          |
|    +----------------------------------+  |
|    |           Masuk                   |  |
|    +----------------------------------+  |
+------------------------------------------+
```

---

## UI Elements

| Element         | Type        | Details                              |
|-----------------|-------------|--------------------------------------|
| Logo            | Icon (Book) | `w-16 h-16` circle, bg-primary-light |
| Title           | Heading     | "Literasi Membaca" (text-2xl, 800)   |
| Subtitle        | Text        | "SDN Wirosaban"                      |
| Username field  | `<input>`   | Placeholder: "Username"              |
| Password field  | `<input>`   | Placeholder: "Password", type toggle |
| Show/hide toggle| Button      | Eye / EyeOff icon                     |
| Submit button   | Button      | "Masuk", full-width, bg-primary      |

---

## User Flow

### Step 1 — Visit Login Page

- If already authenticated (`isAuthenticated()` returns true), the page immediately redirects to `/beranda` via `<Navigate to="/beranda" replace />`.
- Otherwise, the login form is displayed.

### Step 2 — Enter Credentials

User fills in:
- **Username** — text input
- **Password** — text input (masked by default, toggleable via eye icon)

### Step 3 — Submit

User clicks **"Masuk"**.

### Step 4 — Validation (client-side)

| Condition | Action |
|-----------|--------|
| Username is empty | Show `"Username wajib diisi"` below the field |
| Password is empty | Show `"Password wajib diisi"` below the field |
| Both empty | Both errors shown simultaneously |

If any field error exists, submission stops.

### Step 5 — Authentication

Calls `login(username.trim(), password)` from `authService.js`.

| Result | Action |
|--------|--------|
| **Success** | Saves session to localStorage. Navigates to `/beranda` with `replace: true`. |
| **Failure** | Shows `"Username atau password tidak sesuai"` below the form. |

### Step 6 — Post-Login

User is on `/beranda` and can use all protected features.

---

## Validation Messages

| Trigger           | Message                              |
|-------------------|--------------------------------------|
| Username empty    | `"Username wajib diisi"`             |
| Password empty    | `"Password wajib diisi"`             |
| Wrong credentials | `"Username atau password tidak sesuai"` |

---

## Navigation After Actions

| Action         | Destination |
|----------------|-------------|
| Login success  | `/beranda`  |
| Already logged in | `/beranda` (auto-redirect) |
| Logout         | `/login`    |

---

## Dummy Account

| Field    | Value             |
|----------|-------------------|
| Username | `petugas`         |
| Password | `literasi123`     |
| Nama     | Petugas Perpustakaan |
| ID       | P001              |
