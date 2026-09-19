from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.domain import TalentSyncUpdate
from app.schemas.pydantic_models import TalentSyncUpdateOut
from talent_sync.change_detection.sync_engine import TalentSyncEngine

router = APIRouter(prefix="/sync", tags=["TalentSync"])

@router.get("/updates/{employee_id}", response_model=List[TalentSyncUpdateOut])
def get_employee_sync_updates(
    employee_id: int,
    status: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(TalentSyncUpdate).filter(TalentSyncUpdate.employee_id == employee_id)
    if status:
        query = query.filter(TalentSyncUpdate.status == status)
    return query.order_by(TalentSyncUpdate.created_at.desc()).all()

@router.post("/trigger/{employee_id}", response_model=List[TalentSyncUpdateOut])
def trigger_talent_sync(
    employee_id: int,
    source: str = "All",
    db: Session = Depends(get_db)
):
    return TalentSyncEngine.run_sync_for_employee(db, employee_id, source)

@router.post("/simulate-friday-commit/{employee_id}", response_model=List[TalentSyncUpdateOut])
def simulate_friday_github_commit(
    employee_id: int,
    db: Session = Depends(get_db)
):
    return TalentSyncEngine.simulate_friday_github_commit(db, employee_id)

@router.post("/review/{update_id}")
def review_sync_update(
    update_id: int,
    approved: bool,
    db: Session = Depends(get_db)
):
    success = TalentSyncEngine.process_approval(db, update_id, approved)
    if not success:
        raise HTTPException(status_code=400, detail="Update not found or already processed")
    return {"message": "Update processed successfully", "approved": approved}

@router.post("/review-all/{employee_id}")
def review_all_pending_updates(
    employee_id: int,
    approved: bool = True,
    db: Session = Depends(get_db)
):
    updates = db.query(TalentSyncUpdate).filter(
        TalentSyncUpdate.employee_id == employee_id,
        TalentSyncUpdate.status == "PENDING"
    ).all()
    count = 0
    for u in updates:
        if TalentSyncEngine.process_approval(db, u.id, approved):
            count += 1
    return {"message": f"{count} pending updates processed", "approved": approved}
