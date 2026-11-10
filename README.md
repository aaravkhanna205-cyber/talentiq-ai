# TalentIQ AI — Phase 1 recruiter dashboard

Premium midnight navy / iris purple Next.js App Router dashboard with Tailwind CSS v4, reusable shadcn-style UI components, Recharts, lucide-react icons and next-themes.

## Start on Windows (VS Code PowerShell)

1. Install Node.js 22 LTS or newer compatible version (Node.js 20.9+ minimum per Next.js documentation).
2. Extract the ZIP. Open the `TalentIQ-AI` folder in VS Code.
3. Open **Terminal → New Terminal**, select **PowerShell**.
4. Run:

```powershell
node --version
npm --version
npm install
npm run dev
```

5. Open http://localhost:3000

To validate your app:

```powershell
npm run lint
npm run build
```

## Features

- Fully responsive recruiter dashboard with off-canvas mobile navigation
- Collapsible desktop navigation (the content maintains a 250px offset in Phase 1)
- Persistent dark/light theme toggle using next-themes
- 4 KPI cards, application activity AreaChart, hiring pipeline donut chart
- Recent candidates with live search and interview schedule
- Notifications panel and job-creation informational dialog
- Accessible basic controls and empty search state
- Fictional demo information only, no backend or hiring automation

## File tree

```text
src/
  app/                 # App Router, layouts, global styles
  components/
    dashboard/         # dashboard, charts and sidebar
    ui/                # locally authored shadcn-style UI primitives
    providers.tsx      # persistent theme provider
  lib/                 # mock data and utility functions
```

## shadcn/ui note

The archive includes locally authored compatible `components/ui` primitives and `components.json`, **not** CLI-generated shadcn components. To install official shadcn/ui components in your own environment, see https://ui.shadcn.com/docs/installation/next and run `npx shadcn@latest init` if needed, then `npx shadcn@latest add dialog input dropdown-menu` from the project root. Review CLI prompts before allowing overwrites. You don't need to run this command for the supplied dashboard.

## Constraints

Phase 1 is a frontend UI with mock data, not a production ATS. Candidate screening, authentication, storage, voice AI, actual job posting and APIs are outside this phase. No candidate data is collected or transmitted. Dependencies must be installed from npm on your own computer. Do not use the mock KPI figures as real data.
