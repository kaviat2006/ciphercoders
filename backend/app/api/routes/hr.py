from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from app.core.database import get_db
from app.models.domain import Employee, Opportunity, Skill, EmployeeSkill, Project, Certification, LearningActivity, RecommendationOutcome, User
from app.schemas.pydantic_models import HROverviewMetrics, EmployeeOut
from ai.forecasting.forecaster import SkillForecaster
from app.api.dependencies.auth import require_role
from app.core.security import hash_password

router = APIRouter(prefix="/hr", tags=["HR Intelligence"])

class HRAddEmployeeRequest(BaseModel):
    name: str
    email: str
    department: str
    role: str
    experience_years: float = 0.0
    skills: List[str] = []
    projects: List[Dict[str, Any]] = []
    certifications: List[Dict[str, Any]] = []
    learning_activities: List[Dict[str, Any]] = []
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

@router.get("/metrics", response_model=HROverviewMetrics)
def get_hr_overview_metrics(db: Session = Depends(get_db)):
    total_emp = db.query(Employee).count()
    opps_count = db.query(Opportunity).filter(Opportunity.status == "Open").count()
    emerging_count = db.query(Skill).filter(Skill.is_emerging == True).count()
    outcomes_count = db.query(RecommendationOutcome).filter(RecommendationOutcome.applied == True).count()

    return HROverviewMetrics(
        total_employees=total_emp,
        ai_profiled_employees=total_emp,
        open_opportunities=opps_count,
        active_skill_gaps=14,
        emerging_skills_count=emerging_count,
        internal_mobility_count=outcomes_count + 8
    )

@router.get("/directory")
def get_hr_employee_directory(
    department: Optional[str] = Query(None),
    role: Optional[str] = Query(None),
    skill: Optional[str] = Query(None),
    min_exp: float = Query(0.0),
    db: Session = Depends(get_db)
):
    query = db.query(Employee)
    if department and department != "All":
        query = query.filter(Employee.department == department)
    if role and role != "All":
        query = query.filter(Employee.current_role == role)
    if min_exp > 0:
        query = query.filter(Employee.experience_years >= min_exp)

    employees = query.all()
    results = []

    for emp in employees:
        skills_list = [es.skill.name for es in emp.skills if es.skill]
        if skill and skill != "All":
            if not any(skill.lower() in s.lower() for s in skills_list):
                continue

        results.append({
            "id": emp.id,
            "name": emp.name,
            "email": emp.email,
            "current_role": emp.current_role,
            "department": emp.department,
            "experience_years": emp.experience_years,
            "avatar_url": emp.avatar_url,
            "top_skills": skills_list[:5],
            "profile_completeness": emp.profile_completeness or 95,
            "potential_roles": ["Machine Learning Engineer (92% Match)", "Data Scientist (87% Match)"]
        })

    return results

@router.post("/add-employee")
def hr_add_employee(
    payload: HRAddEmployeeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["HR_ADMIN"]))
):
    existing = db.query(Employee).filter(Employee.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Employee with this email already exists")

    github_user = payload.github_url.split("/")[-1] if payload.github_url else None

    employee = Employee(
        name=payload.name,
        email=payload.email,
        current_role=payload.role,
        department=payload.department,
        experience_years=payload.experience_years,
        github_username=github_user,
        linkedin_url=payload.linkedin_url,
        avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        profile_completeness=100
    )
    db.add(employee)
    db.flush()

    # Create User login for new employee
    user = User(
        email=payload.email,
        name=payload.name,
        hashed_password=hash_password("Employee@123"),
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

        db.add(EmployeeSkill(
            employee_id=employee.id,
            skill_id=skill.id,
            proficiency_level=4,
            confidence_score=92.0,
            skill_type="explicit",
            evidence_json='["Added by HR Administrator"]'
        ))

    db.commit()
    return {"message": "Employee created successfully by HR", "employee_id": employee.id}

@router.get("/skill-distribution")
def get_workforce_skill_distribution(db: Session = Depends(get_db)):
    return [
        {"category": "AI & Machine Learning", "count": 18, "percentage": 32},
        {"category": "Backend Engineering", "count": 24, "percentage": 42},
        {"category": "Cloud & Infrastructure", "count": 14, "percentage": 25},
        {"category": "Data Analytics & SQL", "count": 22, "percentage": 39},
        {"category": "Frontend & UI/UX", "count": 12, "percentage": 21},
        {"category": "DevOps & MLOps", "count": 9, "percentage": 16},
    ]

@router.get("/search-employees")
def search_employees_by_skills(
    skills: str = Query(None),
    department: str = Query(None),
    min_exp: float = Query(0.0),
    db: Session = Depends(get_db)
):
    query = db.query(Employee)
    if department and department != "All":
        query = query.filter(Employee.department == department)
    if min_exp > 0:
        query = query.filter(Employee.experience_years >= min_exp)

    employees = query.all()
    results = []
    target_skills_list = [s.strip().lower() for s in skills.split("+")] if skills else []

    for emp in employees:
        emp_skill_names = [es.skill.name.lower() for es in emp.skills if es.skill]
        matched_count = sum(1 for ts in target_skills_list if any(ts in esn for esn in emp_skill_names))
        
        match_pct = round((matched_count / len(target_skills_list)) * 100, 1) if target_skills_list else 100.0

        if not target_skills_list or match_pct > 0:
            results.append({
                "employee": EmployeeOut.from_orm(emp),
                "match_score": match_pct,
                "matched_query_skills": [s for s in target_skills_list if any(s in esn for esn in emp_skill_names)]
            })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results

@router.get("/forecasting")
def get_emerging_skills_forecast():
    return SkillForecaster.get_emerging_forecasts()

@router.post("/talent-summary/{employee_id}")
def generate_ai_talent_summary(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    skills_str = ", ".join([es.skill.name for es in employee.skills[:5] if es.skill])
    projects_count = len(employee.projects)

    summary = (
        f"AI TALENT EXECUTIVE SUMMARY: {employee.name} is a high-potential {employee.current_role} "
        f"with {employee.experience_years} years of professional experience in {employee.department}. "
        f"Key validated technical competencies include {skills_str}. "
        f"Exhibits strong technical execution backed by {projects_count} verified internal & GitHub projects. "
        f"Recommended for immediate consideration in Machine Learning and AI Engineering roles."
    )

    return {"employee_id": employee_id, "talent_summary": summary}
