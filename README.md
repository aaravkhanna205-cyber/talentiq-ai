# Instant Mechanic Hire

Hiring platform for Instant Mechanic: a Recruiter Workspace, a Candidate Portal and a Super Admin area.
Built with Next.js 16, TypeScript and Tailwind CSS v4, in a yellow, orange and white theme.

## Run it

```powershell
npm install
npm run dev
```

Open http://localhost:3000

## Progress

| Phase | What | Status |
|---|---|---|
| 0 | Setup and audit | Done |
| 1 | Theme, app shell, auth screens, dashboard | Done (tag `phase-1`) |
| 2 | All recruiter, candidate and admin screens on demo data | Done (tag `phase-2`) |
| 3 | Backend, database and login | Next |
| 4 | Resume intelligence | |
| 5 | Interviews | |
| 6 | AI agents | |
| 7 | Organizations and admin | |
| 8 | Test, ship, document | |

## Where things are

| Address | Area |
|---|---|
| `/dashboard`, `/jobs`, `/candidates`, `/interviews`, `/analytics` | Recruiter Workspace |
| `/portal` | Candidate Portal |
| `/admin/users`, `/admin/settings`, `/admin/data-import`, `/admin/audit-log` | Super Admin |
| `/login`, `/register`, `/forgot-password`, `/reset-password`, `/onboarding` | Account screens |

## Folders

```text
src/
  app/            pages, grouped as (auth), (recruiter), (admin) and portal
  components/     ui/ base parts, shell/ sidebar and header, one folder per area
  lib/
    brand.ts      product name and tagline
    nav.ts        sidebar menu
    mock/         demo data: roles, jobs, candidates, interviews, admin
```

Everything shown is fictional demo data. Nothing is saved, uploaded or sent until Phase 3.
