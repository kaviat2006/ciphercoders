# TalentFlow AI

> **"Discover your potential. Find your next opportunity."**

TalentFlow AI is an AI-powered internal talent intelligence platform. It continuously builds dynamic employee talent profiles, detects explicit, hidden, and transferable skills with supporting evidence, matches internal roles, teams, and projects using transparent explainable formulas ("Why Recommended?" & "Why Not Currently Selected?"), generates visual career roadmaps, runs automated TalentSync reviews, provides interactive React Flow skill graphs, and equips HR leaders with workforce intelligence.

---

## 🌟 Key Features

- **Dynamic AI Talent Profile**: Auto-discovers technical/soft/hidden skills from GitHub, LinkedIn, Resumes, and Certifications with confidence scores and evidence breakdowns.
- **TalentSync AI Engine**: Continuous monitoring of professional signals with human-in-the-loop PENDING $\rightarrow$ APPROVED $\rightarrow$ REJECTED change approval workflow.
- **Explainable Role & Team Matching**:
  - **Match Score Formula**: $\text{Match Score} = \frac{\text{Weighted Matched Requirements}}{\text{Weighted Total Requirements}}$
  - **Why Recommended?**: Detailed evidence-based justification for matched opportunities.
  - **Why Not Currently Selected?**: Neutral data-grounded missing criteria breakdown and 4-step actionable "How to Improve" roadmap.
- **Gemini Career Copilot**: Context-rich AI assistant providing personalized career advice, 3-month learning plans, and skill gap insights.
- **Emerging Skill Forecast**: AI-driven skill demand forecasting based on organizational trend data.
- **HR Workforce Intelligence**: Skill distribution analytics, multi-skill employee search, skill gap tracking, and outcome analytics.
- **Interactive Skill Graph**: Visually explores connections between Employees, Skills, Projects, and Opportunities.

---

## 🏗️ Repository Architecture

```
CipherCoders/
├── frontend/           # React + Vite + TypeScript + Tailwind CSS + Framer Motion + React Flow
├── backend/            # Python FastAPI + SQLAlchemy + Pydantic + scikit-learn
├── database/           # Schema definitions and database seeding scripts
├── ai/                 # Skill extraction, transparent matching, and forecasting algorithms
├── gemini/             # Gemini API client, context builders, and fallback response service
├── integrations/       # GitHub API integration & LinkedIn synthetic data provider
├── talent_sync/        # Signal extraction, change detection, and approval workflow
├── data/               # Seed data definitions (employees, skills, roles, outcomes)
├── docs/               # Architecture, API, and setup documentation
└── tests/              # Frontend & Backend automated test suites
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m app.main
```

The FastAPI backend will start at `http://localhost:8000`. API docs available at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The React application will launch at `http://localhost:5173`.

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.