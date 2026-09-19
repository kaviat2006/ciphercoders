from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import Employee, Opportunity

router = APIRouter(prefix="/graph", tags=["Skill Graph"])

@router.get("/{employee_id}")
def get_employee_skill_graph(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    nodes = []
    edges = []

    # Center node: Employee
    emp_node_id = f"emp-{employee.id}"
    nodes.append({
        "id": emp_node_id,
        "type": "employeeNode",
        "data": {"label": employee.name, "role": employee.current_role, "dept": employee.department},
        "position": {"x": 350, "y": 200}
    })

    # Skill nodes
    y_offset = 50
    for idx, es in enumerate(employee.skills[:6]):
        if not es.skill:
            continue
        skill_node_id = f"skill-{es.skill.id}"
        nodes.append({
            "id": skill_node_id,
            "type": "skillNode",
            "data": {
                "label": es.skill.name,
                "category": es.skill.category,
                "confidence": es.confidence_score,
                "skill_type": es.skill_type
            },
            "position": {"x": 100 if idx % 2 == 0 else 600, "y": y_offset + (idx * 70)}
        })
        edges.append({
            "id": f"edge-{emp_node_id}-{skill_node_id}",
            "source": emp_node_id,
            "target": skill_node_id,
            "animated": True,
            "style": {"stroke": "#6366f1", "strokeWidth": 2}
        })

    # Project nodes
    for p_idx, p in enumerate(employee.projects[:3]):
        proj_node_id = f"proj-{p.id}"
        nodes.append({
            "id": proj_node_id,
            "type": "projectNode",
            "data": {"label": p.title, "techs": p.technologies[:3]},
            "position": {"x": 50 + (p_idx * 280), "y": 550}
        })
        edges.append({
            "id": f"edge-{emp_node_id}-{proj_node_id}",
            "source": emp_node_id,
            "target": proj_node_id,
            "style": {"stroke": "#10b981", "strokeWidth": 2}
        })

    # Opportunity node (ML Engineer)
    opp = db.query(Opportunity).filter(Opportunity.title.ilike("%Machine Learning%")).first()
    if opp:
        opp_node_id = f"opp-{opp.id}"
        nodes.append({
            "id": opp_node_id,
            "type": "opportunityNode",
            "data": {"label": opp.title, "dept": opp.department, "score": "92% Match"},
            "position": {"x": 350, "y": -50}
        })
        edges.append({
            "id": f"edge-{emp_node_id}-{opp_node_id}",
            "source": emp_node_id,
            "target": opp_node_id,
            "animated": True,
            "style": {"stroke": "#f59e0b", "strokeWidth": 3}
        })

    return {"nodes": nodes, "edges": edges}
