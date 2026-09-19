from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.domain import Employee
from app.schemas.pydantic_models import EmployeeOut

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/list", response_model=List[EmployeeOut])
def list_employees(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    return employees

@router.get("/{employee_id}", response_model=EmployeeOut)
def get_employee_profile(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.get("/history/{employee_id}")
def get_profile_history(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return [
        {
            "id": 1,
            "timestamp": "2024-03-15T10:00:00Z",
            "event_type": "SKILL_ADDED",
            "field_changed": "skills",
            "old_value": None,
            "new_value": "AWS Certified Cloud Practitioner",
            "source": "TalentSync Github Sync"
        },
        {
            "id": 2,
            "timestamp": "2024-02-10T14:30:00Z",
            "event_type": "PROJECT_ADDED",
            "field_changed": "projects",
            "old_value": None,
            "new_value": "AI Financial Fraud Classifier",
            "source": "Employee Self-Update"
        }
    ]
