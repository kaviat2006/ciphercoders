from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class SkillOut(BaseModel):
    id: int
    name: str
    category: str
    is_emerging: bool
    proficiency_level: int
    confidence_score: float
    skill_type: str
    evidence: List[str]

    class Config:
        from_attributes = True

class ProjectOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    technologies: List[str]
    repo_url: Optional[str] = None
    role: Optional[str] = None

    class Config:
        from_attributes = True

class CertificationOut(BaseModel):
    id: int
    name: str
    issuer: str
    issue_date: Optional[str] = None
    credential_url: Optional[str] = None

    class Config:
        from_attributes = True

class LearningActivityOut(BaseModel):
    id: int
    title: str
    platform: str
    status: str
    progress: float

    class Config:
        from_attributes = True

class EmployeeOut(BaseModel):
    id: int
    name: str
    email: str
    current_role: str
    department: str
    experience_years: float
    avatar_url: Optional[str] = None
    github_username: Optional[str] = None
    linkedin_url: Optional[str] = None
    bio: Optional[str] = None
    last_synced_at: Optional[datetime] = None
    sync_frequency: str
    skills: List[SkillOut] = []
    projects: List[ProjectOut] = []
    certifications: List[CertificationOut] = []
    learning_activities: List[LearningActivityOut] = []

    class Config:
        from_attributes = True

class OpportunityOut(BaseModel):
    id: int
    title: str
    department: str
    opportunity_type: str
    description: Optional[str] = None
    required_skills: List[str]
    preferred_skills: List[str]
    required_experience_years: float
    status: str

    class Config:
        from_attributes = True

class MatchResultOut(BaseModel):
    opportunity: OpportunityOut
    match_score: float # percentage 0-100
    matched_skills: List[str]
    missing_skills: List[str]
    experience_matched: bool
    current_experience: float
    required_experience: float
    relevant_projects: List[str]
    relevant_certifications: List[str]
    supporting_evidence: List[str]
    ai_explanation: str
    status_summary: str
    improvement_plan: Optional[List[str]] = None

class TalentSyncUpdateOut(BaseModel):
    id: int
    employee_id: int
    source: str
    detected_type: str
    update_title: str
    update_details: Dict[str, Any] = {}
    confidence: float
    evidence: List[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class RoadmapNodeOut(BaseModel):
    id: int
    employee_id: int
    target_role: str
    step_order: int
    title: str
    skill_name: str
    activity_type: str
    description: Optional[str] = None
    estimated_duration: str
    status: str

    class Config:
        from_attributes = True

class CopilotQueryRequest(BaseModel):
    employee_id: int
    query: Optional[str] = None
    message: Optional[str] = None
    target_role: Optional[str] = None

class CopilotQueryResponse(BaseModel):
    summary: str
    strengths: List[str]
    skill_gaps: List[str]
    recommendations: List[str]
    roadmap: List[str]
    next_steps: List[str]

class FeedbackRequest(BaseModel):
    employee_id: int
    opportunity_id: int
    useful: bool
    feedback_text: Optional[str] = None

class HROverviewMetrics(BaseModel):
    total_employees: int
    ai_profiled_employees: int
    open_opportunities: int
    active_skill_gaps: int
    emerging_skills_count: int
    internal_mobility_count: int
