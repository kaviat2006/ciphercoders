import os
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.models.domain import User, Employee, Skill, EmployeeSkill, Project, Certification, LearningActivity, TalentSyncUpdate
from app.api.dependencies.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]
    employee: Optional[Dict[str, Any]] = None

class EmployeeOnboardingRequest(BaseModel):
    full_name: str
    email: str
    password: str
    phone: Optional[str] = None
    location: Optional[str] = None
    current_role: str
    department: str
    experience_years: float = 0.0
    career_goal: Optional[str] = None
    degree: Optional[str] = None
    institution: Optional[str] = None
    graduation_year: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    skills: List[str] = []
    projects: List[Dict[str, Any]] = []
    certifications: List[Dict[str, Any]] = []
    learning_activities: List[Dict[str, Any]] = []

@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    token = create_access_token(data={"sub": user.email, "role": user.role, "user_id": user.id})
    
    emp_data = None
    if user.employee:
        emp_data = {
            "id": user.employee.id,
            "name": user.employee.name,
            "current_role": user.employee.current_role,
            "department": user.employee.department,
            "avatar_url": user.employee.avatar_url,
            "profile_completeness": user.employee.profile_completeness or 95
        }

    return LoginResponse(
        access_token=token,
        user={
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "employee_id": user.employee_id
        },
        employee=emp_data
    )

@router.post("/register-employee", response_model=LoginResponse)
def register_employee(payload: EmployeeOnboardingRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # Create Employee entity
    github_user = payload.github_url.split("/")[-1] if payload.github_url else None
    
    employee = Employee(
        name=payload.full_name,
        email=payload.email,
        current_role=payload.current_role,
        department=payload.department,
        experience_years=payload.experience_years,
        phone=payload.phone,
        location=payload.location,
        career_goal=payload.career_goal,
        degree=payload.degree,
        institution=payload.institution,
        graduation_year=payload.graduation_year,
        github_username=github_user,
        linkedin_url=payload.linkedin_url,
        portfolio_url=payload.portfolio_url,
        avatar_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        profile_completeness=100
    )
    db.add(employee)
    db.flush()

    # Create User account
    user = User(
        email=payload.email,
        name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role="EMPLOYEE",
        employee_id=employee.id
    )
    db.add(user)

    # Add Skills
    for skill_name in payload.skills:
        skill = db.query(Skill).filter(Skill.name == skill_name).first()
        if not skill:
            skill = Skill(name=skill_name, category="Technical")
            db.add(skill)
            db.flush()
        
        emp_skill = EmployeeSkill(
            employee_id=employee.id,
            skill_id=skill.id,
            proficiency_level=4,
            confidence_score=90.0,
            skill_type="explicit",
            evidence_json=f'["Self-declared during onboarding for {payload.current_role}"]'
        )
        db.add(emp_skill)

    # Add Projects
    for proj in payload.projects:
        p = Project(
            employee_id=employee.id,
            title=proj.get("title", "Project"),
            description=proj.get("description", ""),
            technologies_json=str(proj.get("technologies", [])).replace("'", '"'),
            role=proj.get("role", "Developer")
        )
        db.add(p)

    # Add Certifications
    for cert in payload.certifications:
        c = Certification(
            employee_id=employee.id,
            name=cert.get("name", "Certification"),
            issuer=cert.get("issuer", "Accreditation Provider"),
            issue_date=cert.get("year", "2024")
        )
        db.add(c)

    db.commit()

    token = create_access_token(data={"sub": user.email, "role": user.role, "user_id": user.id})

    return LoginResponse(
        access_token=token,
        user={
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "employee_id": employee.id
        },
        employee={
            "id": employee.id,
            "name": employee.name,
            "current_role": employee.current_role,
            "department": employee.department,
            "avatar_url": employee.avatar_url,
            "profile_completeness": 100
        }
    )

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "employee_id": current_user.employee_id
    }

@router.post("/linkedin/demo-connect")
def connect_demo_linkedin(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee.linkedin_connected = True
    employee.linkedin_headline = "Software Developer | AI & Cloud Enthusiast"

    # Add pending TalentSync update for TensorFlow detected from LinkedIn
    up = TalentSyncUpdate(
        employee_id=employee_id,
        source="LinkedIn",
        detected_type="skill",
        update_title="New Skill Detected: TensorFlow",
        update_details_json='{"skill_name": "TensorFlow", "category": "AI/ML"}',
        confidence=91.0,
        evidence_json='["Extracted from LinkedIn headline & skill endorsements", "Verified OpenID profile sync"]',
        status="PENDING"
    )
    db.add(up)
    db.commit()

    return {
        "status": "connected",
        "demo_mode": True,
        "message": "LinkedIn Demo Profile connected successfully",
        "headline": employee.linkedin_headline,
        "detected_skills": ["TensorFlow"]
    }
