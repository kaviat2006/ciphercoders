from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.domain import CareerRoadmapNode
from app.schemas.pydantic_models import RoadmapNodeOut

router = APIRouter(prefix="/roadmap", tags=["Career Roadmap"])

@router.get("/{employee_id}", response_model=List[RoadmapNodeOut])
def get_roadmap_nodes(employee_id: int, db: Session = Depends(get_db)):
    return db.query(CareerRoadmapNode).filter(
        CareerRoadmapNode.employee_id == employee_id
    ).order_by(CareerRoadmapNode.step_order.asc()).all()

@router.post("/step/{node_id}/toggle")
def toggle_roadmap_step(node_id: int, db: Session = Depends(get_db)):
    node = db.query(CareerRoadmapNode).filter(CareerRoadmapNode.id == node_id).first()
    if not node:
        raise HTTPException(status_code=404, detail="Roadmap step not found")
    
    if node.status == "COMPLETED":
        node.status = "IN_PROGRESS"
    elif node.status == "IN_PROGRESS":
        node.status = "COMPLETED"
    else:
        node.status = "IN_PROGRESS"
        
    db.commit()
    return {"message": "Step status updated", "status": node.status}
