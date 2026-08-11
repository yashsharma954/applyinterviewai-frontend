# ApplyAI — Frontend

The frontend for **ApplyAI**, an agentic internship application platform. Upload a resume, set your preferences, and let the agent match you to internships and draft tailored application materials for each one — you stay in control of every submission.

**Live app:** [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)
**Backend repo:** [applyinterviewaibackend](https://github.com/yashsharma954/applyinterviewaibackend)

---

## What it does

1. **Resume upload** — drop a PDF, an LLM parses it into structured skills, projects, and experience
2. **Preferences** — set target roles, locations, remote-only, and minimum stipend
3. **Matching** — the backend scores live internship listings against your resume's skills
4. **Materials generation** — for any matched job, generate a tailored resume bullet list, cover letter, "why this company" answer, and a LinkedIn outreach message in one click
5. **Apply, on your terms** — copy the materials, open the original posting, and mark it applied once you've submitted it yourself. The app never auto-submits anything.

---

## Tech stack

- **React** (Vite)
- **Tailwind CSS v4**
- **React Router** for client-side routing
- **Axios** with request/response interceptors for auth token attachment and silent refresh
- **Context API** for auth state

---

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   ├── ApplicationModal.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── lib/
│   └── api.js              # axios instance, auth interceptors
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ResumeUpload.jsx
│   ├── Preferences.jsx
│   └── Dashboard.jsx
├── App.jsx
└── main.jsx
```

---

## Getting started

### Prerequisites

- Node.js 18+
- The [ApplyAI backend](https://github.com/yashsharma954/applyinterviewaibackend) running locally or deployed

### Setup

```bash
git clone https://github.com/yashsharma954/applyinterviewai-frontend.git
cd applyinterviewai-frontend/vite-project
npm install
```

### Environment variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

For a deployed backend, point this at the live API URL instead.

### Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

---

## Deployment

Deployed on **Vercel**. When deploying:

1. Set the project's root directory to the folder containing `package.json` (e.g. `applyinterviewai-frontend/vite-project`)
2. Add `VITE_API_BASE_URL` as an environment variable pointing to the deployed backend
3. Make sure the backend's `CORS_ORIGIN` is updated to match the deployed frontend URL

---

## Design notes

- Auth tokens are stored in `localStorage`; a refresh token cookie backs silent re-authentication on 401s
- The dashboard never lets a job move to "Applied" without the user explicitly confirming it — status transitions are `Matched → Materials Ready → Applied`
- Match scores are rendered as a ring indicator on each job card, colored by score band

---

## License

Built as a personal portfolio project.
