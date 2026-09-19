from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import json
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="EMPLOYEE") # EMPLOYEE, HR_ADMIN
    name = Column(String, nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="user_account")

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    current_role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    experience_years = Column(Float, default=0.0)
    avatar_url = Column(String, nullable=True)
    github_username = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    portfolio_url = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    career_goal = Column(String, nullable=True)
    degree = Column(String, nullable=True)
    institution = Column(String, nullable=True)
    graduation_year = Column(String, nullable=True)
    linkedin_connected = Column(Boolean, default=False)
    linkedin_headline = Column(String, nullable=True)
    profile_completeness = Column(Integer, default=95) # 0-100%
    bio = Column(Text, nullable=True)
    last_synced_at = Column(DateTime, default=datetime.utcnow)
    sync_frequency = Column(String, default="Weekly")

    user_account = relationship("User", back_populates="employee", uselist=False)
    skills = relationship("EmployeeSkill", back_populates="employee", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="employee", cascade="all, delete-orphan")
    certifications = relationship("Certification", back_populates="employee", cascade="all, delete-orphan")
    learning_activities = relationship("LearningActivity", back_populates="employee", cascade="all, delete-orphan")
    sync_updates = relationship("TalentSyncUpdate", back_populates="employee", cascade="all, delete-orphan")
    roadmap_nodes = relationship("CareerRoadmapNode", back_populates="employee", cascade="all, delete-orphan")
    outcomes = relationship("RecommendationOutcome", back_populates="employee", cascade="all, delete-orphan")
    external_connections = relationship("ExternalConnection", back_populates="employee", cascade="all, delete-orphan")

class ExternalConnection(Base):
    __tablename__ = "external_connections"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    provider = Column(String, nullable=False) # GitHub, LinkedIn
    connected = Column(Boolean, default=True)
    account_name = Column(String, nullable=True)
    headline = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    email = Column(String, nullable=True)
    last_synced_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="external_connections")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, default="Technical")
    is_emerging = Column(Boolean, default=False)

class EmployeeSkill(Base):
    __tablename__ = "employee_skills"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    proficiency_level = Column(Integer, default=3) # 1-5
    confidence_score = Column(Float, default=85.0) # 0-100%
    skill_type = Column(String, default="explicit") # explicit, hidden, transferable
    evidence_json = Column(Text, default="[]") # JSON list of evidence strings

    employee = relationship("Employee", back_populates="skills")
    skill = relationship("Skill")

    @property
    def name(self) -> str:
        return self.skill.name if self.skill else ""

    @property
    def category(self) -> str:
        return self.skill.category if self.skill else "Technical"

    @property
    def is_emerging(self) -> bool:
        return self.skill.is_emerging if self.skill else False

    @property
    def evidence(self):
        try:
            return json.loads(self.evidence_json) if self.evidence_json else []
        except Exception:
            return []

    @evidence.setter
    def evidence(self, value):
        self.evidence_json = json.dumps(value)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    technologies_json = Column(Text, default="[]")
    repo_url = Column(String, nullable=True)
    role = Column(String, nullable=True)

    employee = relationship("Employee", back_populates="projects")

    @property
    def technologies(self):
        try:
            return json.loads(self.technologies_json) if self.technologies_json else []
        except Exception:
            return []

    @technologies.setter
    def technologies(self, value):
        self.technologies_json = json.dumps(value)

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    name = Column(String, nullable=False)
    issuer = Column(String, nullable=False)
    issue_date = Column(String, nullable=True)
    credential_url = Column(String, nullable=True)

    employee = relationship("Employee", back_populates="certifications")

class LearningActivity(Base):
    __tablename__ = "learning_activities"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    title = Column(String, nullable=False)
    platform = Column(String, default="Internal Learning")
    status = Column(String, default="In Progress")
    progress = Column(Float, default=0.0)

    employee = relationship("Employee", back_populates="learning_activities")

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    department = Column(String, nullable=False)
    opportunity_type = Column(String, default="job") # job, project, team, mentorship
    description = Column(Text, nullable=True)
    required_skills_json = Column(Text, default="[]")
    preferred_skills_json = Column(Text, default="[]")
    required_experience_years = Column(Float, default=2.0)
    status = Column(String, default="Open")

    @property
    def required_skills(self):
        try:
            return json.loads(self.required_skills_json) if self.required_skills_json else []
        except Exception:
            return []

    @required_skills.setter
    def required_skills(self, value):
        self.required_skills_json = json.dumps(value)

    @property
    def preferred_skills(self):
        try:
            return json.loads(self.preferred_skills_json) if self.preferred_skills_json else []
        except Exception:
            return []

    @preferred_skills.setter
    def preferred_skills(self, value):
        self.preferred_skills_json = json.dumps(value)

class TalentSyncUpdate(Base):
    __tablename__ = "talent_sync_updates"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    source = Column(String, nullable=False) # GitHub, LinkedIn, Resume, Certifications
    detected_type = Column(String, nullable=False) # skill, project, certification
    update_title = Column(String, nullable=False)
    update_details_json = Column(Text, default="{}")
    confidence = Column(Float, default=90.0)
    evidence_json = Column(Text, default="[]")
    status = Column(String, default="PENDING") # PENDING, APPROVED, REJECTED
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="sync_updates")

    @property
    def evidence(self):
        try:
            return json.loads(self.evidence_json) if self.evidence_json else []
        except Exception:
            return []

    @evidence.setter
    def evidence(self, value):
        self.evidence_json = json.dumps(value)

class CareerRoadmapNode(Base):
    __tablename__ = "career_roadmap_nodes"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    target_role = Column(String, nullable=False)
    step_order = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    skill_name = Column(String, nullable=False)
    activity_type = Column(String, default="Course") # Course, Project, Certification, Internal Project
    description = Column(Text, nullable=True)
    estimated_duration = Column(String, default="2 weeks")
    status = Column(String, default="TODO") # TODO, IN_PROGRESS, COMPLETED

    employee = relationship("Employee", back_populates="roadmap_nodes")

class RecommendationOutcome(Base):
    __tablename__ = "recommendation_outcomes"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    opportunity_id = Column(Integer, ForeignKey("opportunities.id"), nullable=False)
    viewed = Column(Boolean, default=True)
    accepted = Column(Boolean, default=False)
    learning_progress = Column(Float, default=0.0)
    applied = Column(Boolean, default=False)
    outcome_status = Column(String, default="Not Applied") # Not Applied, Applied, Interviewing, Placed
    feedback_score = Column(Integer, nullable=True) # 1 (useful) or 0 (not useful)
    feedback_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="outcomes")
    opportunity = relationship("Opportunity")
