# 📋 Submission Details

> **Instructions:** Fill out every section below before submitting. Replace all placeholder text. Check boxes for features you implemented. Be honest — your self-assessment matters.

---

## 👤 Candidate Information

| Field | Your Details |
|-------|-------------|
| **Full Name** | Suhani Sanjiv Junghare |
| **Email** | jungharesuhani6@gmail.com |
| **Phone** |9960143310 |
| **GitHub Username** | https://github.com/Suhani604|
| **LinkedIn (optional)** | www.linkedin.com/in/suhani-junghare-875a79300 |
| **Current Location** | Amravati |

---

## 🔗 Repository & Deployment Links

| Link | URL |
|------|-----|
| **GitHub Repo** (forked) | `https://github.com/Suhani604/cadmech-fullstack-assessment` |
| **Live Frontend** (GitHub Pages) | ` https://Suhani604.github.io/cadmech-fullstack-assessment/` |
| **Live Backend** (Render/Railway) | `https://cadmech-fullstack-assessment-dlyi.onrender.com ` |

---

## 🛠️ Tech Choices

| Choice | Your Answer |
|--------|------------|
| **Database Used** |  SQLite |
| **ORM / Query Builder** | Raw SQL via the `sqlite` + `sqlite3` npm packages|
| **Additional Frontend Libraries** | None — plain React with fetch API |
| **Additional Backend Libraries** | `sqlite`, `sqlite3`, `cors`, `dotenv`|
| **CSS Approach** |  Inline styles (JS style objects) with a CSS media query for mobile responsiveness | |

---

## ✅ Features Implemented

- [x] Dashboard with summary statistics
- [x] Equipment list view (table/grid)
- [x] Add new equipment with validation
- [x] Edit existing equipment
- [x] Delete equipment with confirmation dialog
- [x] Search by name
- [x] Filter by type and/or status
- [x] Responsive design (desktop + mobile)
- [x] REST API with proper error handling
- [x] Database with schema
- [x] Frontend deployed to GitHub Pages
- [x] Backend deployed to Render/Railway

---

## 💬 Self Assessment

### What went well?

> I was able to build a clean, working full-stack CRUD application with a dashboard, search/filter, and a responsive UI that adapts from desktop tables to mobile cards. The API validates input against the fixed equipment types and status values defined in the schema, and returns clear error messages.

### What was the hardest part?

> Matching the data fields exactly with the schema was tricky — fields like serial_number and installed_date, and making sure the frontend only sent the exact type and status values the backend allowed. I also had to make sure the backend used CommonJS (require/module.exports) since that's what the starter code used, not ES modules.

### What would you do differently with more time?

>  I would add pagination and sorting to the equipment list, and a proper reports page showing equipment breakdown by status and type. I'd also add better loading indicators instead of plain "Loading..." text, and write some basic tests for the API endpoints.

### AI Tools Usage

> I used Claude to help me write the backend routes, SQLite database connection, and the React components (Dashboard, EquipmentForm, EquipmentList, SearchFilterBar). I tested every feature myself in the browser, fixed the field names to match the schema, and debugged issues where the frontend and backend weren't talking to each other correctly.

---

## ⏱️ Time Spent

| Area | Hours |
|------|-------|
| **Frontend UI/UX & Responsive Design** | 4|
| **Backend API Development & DB** |3 |
| **Deployment (FE + BE)** | 2|
| **Documentation & Cleanup** | 1|
| **Total** | 10 |

---

## 📌 Additional Notes

> Render's free tier spins down after 15 minutes of inactivity, so the first request to the live backend may take 30–60 seconds to respond. This is expected behavior on the free tier.

---

> **⚠️ Checklist before submitting:**
> - [x] All links are working and publicly accessible
> - [x] Code is pushed to your forked repo
> - [x] Commit history shows progressive development
