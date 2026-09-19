from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.core.database import get_db
from app.models.domain import Employee, Opportunity
from app.schemas.pydantic_models import OpportunityOut, MatchResultOut
from ai.skill_matching.matcher import TransparentMatcher

router = APIRouter(prefix="/matching", tags=["Matching"])

@router.get("/opportunities", response_model=List[OpportunityOut])
def list_opportunities(db: Session = Depends(get_db)):
    return db.query(Opportunity).all()

@router.get("/matches/{employee_id}", response_model=List[MatchResultOut])
def get_employee_opportunity_matches(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    opportunities = db.query(Opportunity).filter(Opportunity.status == "Open").all()
    results = []
    for opp in opportunities:
        res = TransparentMatcher.evaluate_match(employee, opp)
        results.append(
            MatchResultOut(
                opportunity=OpportunityOut.from_orm(opp),
                match_score=res["match_score"],
                matched_skills=res["matched_skills"],
                missing_skills=res["missing_skills"],
                experience_matched=res["experience_matched"],
                current_experience=res["current_experience"],
                required_experience=res["required_experience"],
                relevant_projects=res["relevant_projects"],
                relevant_certifications=res["relevant_certifications"],
                supporting_evidence=res["supporting_evidence"],
                ai_explanation=res["ai_explanation"],
                status_summary=res["status_summary"],
                improvement_plan=res["improvement_plan"]
            )
        )

    # Sort by match score descending
    results.sort(key=lambda x: x.match_score, reverse=True)
    return results

@router.get("/teams/{employee_id}")
def get_team_matches(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    teams = [
        {"name": "AI Research Team", "department": "AI Research", "required_skills": ["Python", "Machine Learning", "AWS"], "score": 91, "matched_skills": ["Python", "Machine Learning", "AWS"], "reason": "High synergy with Fraud Detection & ML project portfolio."},
        {"name": "Data Science & Analytics Team", "department": "Analytics", "required_skills": ["Python", "SQL", "Data Engineering"], "score": 88, "matched_skills": ["Python", "SQL"], "reason": "Proven analytical data manipulation and SQL query optimization."},
        {"name": "Cloud Infrastructure Team", "department": "DevOps", "required_skills": ["AWS", "Docker", "Kubernetes"], "score": 76, "matched_skills": ["AWS", "Docker"], "reason": "AWS Certified Cloud Practitioner baseline with active Docker learning track."},
        {"name": "Core Backend Platform", "department": "Platform", "required_skills": ["Java", "Spring Boot", "PostgreSQL"], "score": 72, "matched_skills": ["Java", "SQL"], "reason": "Strong backend programming foundation with relational database mastery."}
    ]
    return teams

@router.get("/skill-gaps/{employee_id}")
def get_skill_gaps(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    matches = get_employee_opportunity_matches(employee_id, db)
    skill_gaps = []
    for match in matches:
        for sk in match.missing_skills:
            skill_gaps.append({
                "target_opportunity": match.opportunity.title,
                "missing_skill": sk,
                "importance": "High" if match.match_score > 70 else "Medium",
                "recommended_action": f"Complete online module or certification for {sk}"
            })
    return skill_gaps
