from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import Employee, Opportunity
from app.schemas.pydantic_models import CopilotQueryRequest, CopilotQueryResponse
from gemini.services.copilot_service import GeminiCopilotService

router = APIRouter(prefix="/copilot", tags=["Gemini Career Copilot"])

@router.post("/query", response_model=CopilotQueryResponse)
@router.post("/chat", response_model=CopilotQueryResponse)
def ask_gemini_copilot(payload: CopilotQueryRequest, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == payload.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    user_query = payload.query or payload.message or "Career Advice Request"

    target_opp = None
    if payload.target_role:
        target_opp = db.query(Opportunity).filter(Opportunity.title.ilike(f"%{payload.target_role}%")).first()

    res = GeminiCopilotService.generate_career_advice(employee, user_query, target_opp)
    
    return CopilotQueryResponse(
        summary=res.get("summary", "Analysis complete."),
        strengths=res.get("strengths", []),
        skill_gaps=res.get("skill_gaps", []),
        recommendations=res.get("recommendations", []),
        roadmap=res.get("roadmap", []),
        next_steps=res.get("next_steps", [])
    )
