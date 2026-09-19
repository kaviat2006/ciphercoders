const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export interface SkillItem {
  id: number;
  name: string;
  category: string;
  is_emerging: boolean;
  proficiency_level: number;
  confidence_score: number;
  skill_type: 'explicit' | 'hidden' | 'transferable';
  evidence: string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  repo_url?: string;
  role?: string;
}

export interface CertificationItem {
  id: number;
  name: string;
  issuer: string;
  issue_date?: string;
  credential_url?: string;
}

export interface LearningItem {
  id: number;
  title: string;
  platform: string;
  status: string;
  progress: number;
}

export interface EmployeeProfile {
  id: number;
  name: string;
  email: string;
  current_role: string;
  department: string;
  experience_years: number;
  avatar_url?: string;
  github_username?: string;
  linkedin_url?: string;
  bio?: string;
  last_synced_at?: string;
  sync_frequency: string;
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  learning_activities: LearningItem[];
}

export interface OpportunityItem {
  id: number;
  title: string;
  department: string;
  opportunity_type: string;
  description: string;
  required_skills: string[];
  preferred_skills: string[];
  required_experience_years: number;
  status: string;
}

export interface MatchResult {
  opportunity: OpportunityItem;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  experience_matched: boolean;
  current_experience: number;
  required_experience: number;
  relevant_projects: string[];
  relevant_certifications: string[];
  supporting_evidence: string[];
  ai_explanation: string;
  status_summary: string;
  improvement_plan?: string[];
}

export interface TalentSyncUpdate {
  id: number;
  employee_id: number;
  source: string;
  detected_type: string;
  update_title: string;
  update_details: any;
  confidence: number;
  evidence: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
}

export interface RoadmapStep {
  id: number;
  employee_id: number;
  target_role: string;
  step_order: number;
  title: string;
  skill_name: string;
  activity_type: string;
  description: string;
  estimated_duration: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
}

// Fallback demo dataset
export const DEMO_PRIYA: EmployeeProfile = {
  id: 1,
  name: "Priya Sharma",
  email: "priya.sharma@talentflow.ai",
  current_role: "Software Developer",
  department: "Software Engineering",
  experience_years: 2.0,
  avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  github_username: "priyasharma-dev",
  linkedin_url: "https://linkedin.com/in/priya-sharma-demo",
  bio: "Full-stack developer passionate about applied Machine Learning, intelligent systems, and automated data pipelines.",
  last_synced_at: new Date().toISOString(),
  sync_frequency: "Weekly",
  skills: [
    { id: 1, name: "Python", category: "AI/ML", is_emerging: false, proficiency_level: 4, confidence_score: 96, skill_type: "explicit", evidence: ["Python used across 12 GitHub repositories", "Fraud Detection System codebase", "Certified Python Associate"] },
    { id: 2, name: "Java", category: "Backend", is_emerging: false, proficiency_level: 3, confidence_score: 85, skill_type: "explicit", evidence: ["Built core REST API microservices in 2023", "Internal enterprise backend modules"] },
    { id: 3, name: "SQL", category: "Data", is_emerging: false, proficiency_level: 4, confidence_score: 90, skill_type: "explicit", evidence: ["Optimized complex PostgreSQL queries in Fraud Detection project", "Database Schema Design coursework"] },
    { id: 4, name: "Machine Learning", category: "AI/ML", is_emerging: false, proficiency_level: 4, confidence_score: 88, skill_type: "hidden", evidence: ["Fraud Detection project using XGBoost & Scikit-learn", "ML Model Training learning track completed", "GitHub ML repository activity"] },
    { id: 5, name: "AWS", category: "Cloud", is_emerging: false, proficiency_level: 3, confidence_score: 92, skill_type: "explicit", evidence: ["AWS Cloud Practitioner certification", "Deployed S3 and Lambda triggers for internal data ingress"] },
    { id: 6, name: "Docker", category: "DevOps", is_emerging: false, proficiency_level: 2, confidence_score: 60, skill_type: "transferable", evidence: ["Basic Dockerfile creation in personal sandbox repo", "Completed 45% of Docker Fundamentals course"] },
  ],
  projects: [
    { id: 1, title: "Fraud Detection System", description: "End-to-end anomaly detection system processing financial transactions using XGBoost, Python, and SQL.", technologies: ["Python", "Machine Learning", "XGBoost", "SQL", "Pandas"], repo_url: "https://github.com/priyasharma/fraud-detection-system", role: "Lead ML Developer" },
    { id: 2, title: "Recommendation Engine Prototype", description: "Collaborative filtering recommendation prototype tested on internal dataset.", technologies: ["Python", "Machine Learning", "Scikit-learn", "FastAPI"], repo_url: "https://github.com/priyasharma/recommendation-engine", role: "Developer" }
  ],
  certifications: [
    { id: 1, name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", issue_date: "2023-11", credential_url: "https://aws.amazon.com/verification/demo" }
  ],
  learning_activities: [
    { id: 1, title: "Machine Learning Specialization", platform: "Coursera / DeepLearning.AI", status: "Completed", progress: 100 },
    { id: 2, title: "Docker & Container Mastery", platform: "Udemy / Enterprise Learning", status: "In Progress", progress: 45 },
    { id: 3, title: "MLOps Architecture & Model Deployment", platform: "Internal Talent Academy", status: "In Progress", progress: 20 }
  ]
};

export const api = {
  async getEmployeeProfile(id: number = 1): Promise<EmployeeProfile> {
    try {
      const res = await fetch(`${API_BASE}/profile/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Using offline fallback data for profile");
    }
    return DEMO_PRIYA;
  },

  async getMatches(id: number = 1): Promise<MatchResult[]> {
    try {
      const res = await fetch(`${API_BASE}/matching/matches/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Using offline fallback data for matches");
    }
    return [
      {
        opportunity: {
          id: 1,
          title: "Machine Learning Engineer",
          department: "AI Research & Intelligence",
          opportunity_type: "job",
          description: "Design, deploy, and operationalize high-scale ML models and recommendation systems into core production products.",
          required_skills: ["Python", "Machine Learning", "SQL", "AWS"],
          preferred_skills: ["Docker", "MLOps", "Scikit-learn", "Kubernetes"],
          required_experience_years: 2.0,
          status: "Open"
        },
        match_score: 92.0,
        matched_skills: ["Python", "Machine Learning", "SQL", "AWS"],
        missing_skills: ["Docker", "MLOps", "Kubernetes"],
        experience_matched: true,
        current_experience: 2.0,
        required_experience: 2.0,
        relevant_projects: ["Fraud Detection System", "Recommendation Engine Prototype"],
        relevant_certifications: ["AWS Certified Cloud Practitioner"],
        supporting_evidence: [
          "Python used across 12 GitHub repositories",
          "Fraud Detection project using XGBoost & Scikit-learn",
          "AWS Cloud Practitioner certification"
        ],
        ai_explanation: "Priya Sharma exhibits strong alignment (92%) with the Machine Learning Engineer role. Demonstrates key required skills (Python, Machine Learning, SQL, AWS) supported by 2 relevant projects and 2.0 years of experience.",
        status_summary: "Strong Recommended Alignment"
      },
      {
        opportunity: {
          id: 2,
          title: "Senior Data Scientist",
          department: "Analytics & Insights",
          opportunity_type: "job",
          description: "Drive advanced predictive analytics, statistical hypothesis testing, and business revenue forecasting models.",
          required_skills: ["Python", "SQL", "Machine Learning", "Data Engineering"],
          preferred_skills: ["Tableau", "Scikit-learn"],
          required_experience_years: 3.5,
          status: "Open"
        },
        match_score: 64.0,
        matched_skills: ["Python", "SQL", "Machine Learning"],
        missing_skills: ["Data Engineering", "Tableau"],
        experience_matched: false,
        current_experience: 2.0,
        required_experience: 3.5,
        relevant_projects: ["Fraud Detection System"],
        relevant_certifications: ["AWS Certified Cloud Practitioner"],
        supporting_evidence: [
          "Optimized complex PostgreSQL queries",
          "Fraud Detection project using XGBoost & Scikit-learn"
        ],
        ai_explanation: "Priya Sharma currently meets 64% of the selection criteria for Senior Data Scientist. Possesses foundational skills (Python, SQL, ML), but is currently missing required skills: Data Engineering and requires 1.5 more years of analytics experience.",
        status_summary: "Moderate Alignment - Growth Potential",
        improvement_plan: [
          "Learn Data Engineering & ETL Pipeline building (missing skill)",
          "Build an automated data pipeline project using Apache Airflow or Spark",
          "Gain 1.5 years of additional analytics project leadership",
          "Complete Tableau data visualization certification"
        ]
      }
    ];
  },

  async getSyncUpdates(id: number = 1): Promise<TalentSyncUpdate[]> {
    try {
      const res = await fetch(`${API_BASE}/sync/updates/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Using offline fallback data for sync updates");
    }
    return [
      {
        id: 101,
        employee_id: 1,
        source: "GitHub",
        detected_type: "skill",
        update_title: "Skill: XGBoost",
        update_details: { skill_name: "XGBoost", category: "AI/ML" },
        confidence: 94.0,
        evidence: ["XGBoost classifier used in Fraud Detection System repository"],
        status: "PENDING",
        created_at: new Date().toISOString()
      },
      {
        id: 102,
        employee_id: 1,
        source: "Resume",
        detected_type: "skill",
        update_title: "Skill: Data Engineering",
        update_details: { skill_name: "Data Engineering", category: "Data" },
        confidence: 87.0,
        evidence: ["Extracted from updated PDF resume section 'Database Pipelines'"],
        status: "PENDING",
        created_at: new Date().toISOString()
      }
    ];
  },

  async simulateFridayCommit(id: number = 1): Promise<TalentSyncUpdate[]> {
    try {
      const res = await fetch(`${API_BASE}/sync/simulate-friday-commit/${id}`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      { id: 201, employee_id: 1, source: "GitHub", detected_type: "skill", update_title: "Skill: Recommendation Systems", update_details: {}, confidence: 95, evidence: ["Created repository ai-recommendation-system"], status: "PENDING", created_at: new Date().toISOString() },
      { id: 202, employee_id: 1, source: "GitHub", detected_type: "skill", update_title: "Skill: Scikit-learn", update_details: {}, confidence: 92, evidence: ["Scikit-learn algorithms and metrics detected"], status: "PENDING", created_at: new Date().toISOString() },
      { id: 203, employee_id: 1, source: "GitHub", detected_type: "skill", update_title: "Skill: Model Evaluation", update_details: {}, confidence: 89, evidence: ["Precision/Recall and ROC-AUC evaluation scripts"], status: "PENDING", created_at: new Date().toISOString() },
      { id: 204, employee_id: 1, source: "GitHub", detected_type: "project", update_title: "Project: AI Recommendation System", update_details: {}, confidence: 98, evidence: ["14 commits in active repository"], status: "PENDING", created_at: new Date().toISOString() }
    ];
  },

  async processSyncReview(updateId: number, approved: boolean): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/sync/review/${updateId}?approved=${approved}`, { method: 'POST' });
      if (res.ok) return true;
    } catch (e) {}
    return true;
  },

  async processApproveAll(id: number = 1): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/sync/review-all/${id}?approved=true`, { method: 'POST' });
      if (res.ok) return true;
    } catch (e) {}
    return true;
  },

  async queryCopilot(employeeId: number, query: string, targetRole?: string) {
    try {
      const res = await fetch(`${API_BASE}/copilot/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: employeeId, query, target_role: targetRole })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      summary: `Analysis for query "${query}": Priya Sharma exhibits strong alignment (92%) with Machine Learning Engineering roles, but requires container orchestration and operational deployment skills for senior tracks.`,
      strengths: [
        "Proven proficiency in Python, XGBoost, and Data Analysis",
        "Demonstrated project history with Fraud Detection System",
        "AWS Cloud Practitioner certification"
      ],
      skill_gaps: [
        "Docker containerization & Helm charts",
        "Kubernetes cluster deployment",
        "MLOps automated retraining pipelines"
      ],
      recommendations: [
        "Complete the active Docker & Kubernetes Mastery track",
        "Build a sample containerized ML deployment project",
        "Apply for internal ML Engineer opportunity"
      ],
      roadmap: [
        "Week 1: Finish Docker Fundamentals course",
        "Week 2: Deploy containerized Fraud API",
        "Week 3: Complete MLOps module"
      ],
      next_steps: [
        "Navigate to Career Roadmap tab to start week 1 module",
        "Schedule 1-on-1 mentor session with AI Research lead"
      ]
    };
  }
};
