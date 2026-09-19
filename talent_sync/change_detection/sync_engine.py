from typing import List, Dict, Any
from sqlalchemy.orm import Session
from datetime import datetime
from app.models.domain import Employee, TalentSyncUpdate, EmployeeSkill, Skill, Project, Certification

class TalentSyncEngine:
    @staticmethod
    def run_sync_for_employee(db: Session, employee_id: int, source: str = "All") -> List[TalentSyncUpdate]:
        """
        Executes signal extraction for authorized sources and creates PENDING TalentSync updates.
        """
        employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not employee:
            return []

        created_updates = []

        if source in ["All", "GitHub"]:
            # Check existing updates to avoid duplicates
            existing_github = db.query(TalentSyncUpdate).filter(
                TalentSyncUpdate.employee_id == employee_id,
                TalentSyncUpdate.source == "GitHub",
                TalentSyncUpdate.update_title == "Repository: data-pipeline-orchestrator"
            ).first()

            if not existing_github:
                up1 = TalentSyncUpdate(
                    employee_id=employee_id,
                    source="GitHub",
                    detected_type="skill",
                    update_title="New Skill: Data Pipeline Orchestration",
                    update_details_json='{"skill_name": "Data Engineering", "repo": "data-pipeline-orchestrator", "languages": ["Python", "SQL"]}',
                    confidence=94.0,
                    evidence_json='["Detected in GitHub repository data-pipeline-orchestrator", "Pandas and Airflow DAGs identified"]',
                    status="PENDING"
                )
                db.add(up1)
                created_updates.append(up1)

        if source in ["All", "LinkedIn"]:
            existing_linkedin = db.query(TalentSyncUpdate).filter(
                TalentSyncUpdate.employee_id == employee_id,
                TalentSyncUpdate.source == "LinkedIn",
                TalentSyncUpdate.update_title == "Certification: Cloud AI Associate"
            ).first()

            if not existing_linkedin:
                up2 = TalentSyncUpdate(
                    employee_id=employee_id,
                    source="LinkedIn",
                    detected_type="certification",
                    update_title="Certification: Cloud AI Associate",
                    update_details_json='{"cert_name": "Cloud AI Associate", "issuer": "AWS", "issue_date": "2024-08"}',
                    confidence=96.0,
                    evidence_json='["Verified via LinkedIn Learning & Partner Accreditation", "Credential ID: AWS-AI-883921"]',
                    status="PENDING"
                )
                db.add(up2)
                created_updates.append(up2)

        employee.last_synced_at = datetime.utcnow()
        db.commit()

        return created_updates

    @staticmethod
    def simulate_friday_github_commit(db: Session, employee_id: int) -> List[TalentSyncUpdate]:
        """
        Demonstration of continuous GitHub skill update:
        Simulates Friday detection of a new project 'AI Recommendation System' generating 3 new signals.
        """
        employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not employee:
            return []

        # Delete any old pending friday commits for fresh demo run
        db.query(TalentSyncUpdate).filter(
            TalentSyncUpdate.employee_id == employee_id,
            TalentSyncUpdate.update_title.like("%Recommendation%")
        ).delete(synchronize_session=False)

        up1 = TalentSyncUpdate(
            employee_id=employee_id,
            source="GitHub",
            detected_type="skill",
            update_title="Skill: Recommendation Systems",
            update_details_json='{"skill_name": "Recommendation Systems", "category": "AI/ML"}',
            confidence=95.0,
            evidence_json='["Created collaborative filtering repository ai-recommendation-system", "Implemented matrix factorization and hybrid recommenders in Python"]',
            status="PENDING"
        )
        up2 = TalentSyncUpdate(
            employee_id=employee_id,
            source="GitHub",
            detected_type="skill",
            update_title="Skill: Scikit-learn",
            update_details_json='{"skill_name": "Scikit-learn", "category": "AI/ML"}',
            confidence=92.0,
            evidence_json='["Scikit-learn models, pipelines, and evaluation metrics used extensively in repository code"]',
            status="PENDING"
        )
        up3 = TalentSyncUpdate(
            employee_id=employee_id,
            source="GitHub",
            detected_type="skill",
            update_title="Skill: Model Evaluation",
            update_details_json='{"skill_name": "Model Evaluation", "category": "AI/ML"}',
            confidence=89.0,
            evidence_json='["Precision/Recall curves, ROC-AUC, and cross-validation scripts detected in project"]',
            status="PENDING"
        )
        up4 = TalentSyncUpdate(
            employee_id=employee_id,
            source="GitHub",
            detected_type="project",
            update_title="Project: AI Recommendation System",
            update_details_json='{"title": "AI Recommendation System", "description": "Hybrid movie and e-commerce recommendation system built with Python, Scikit-learn, and FastAPI", "technologies": ["Python", "Scikit-learn", "FastAPI", "Pandas"], "repo_url": "https://github.com/priyasharma/ai-recommendation-system"}',
            confidence=98.0,
            evidence_json='["Active GitHub repository with 14 commits and complete Readme documentation"]',
            status="PENDING"
        )

        db.add_all([up1, up2, up3, up4])
        employee.last_synced_at = datetime.utcnow()
        db.commit()

        return [up1, up2, up3, up4]

    @staticmethod
    def process_approval(db: Session, update_id: int, approved: bool) -> bool:
        """
        Processes PENDING update: if approved, updates employee official profile skills/projects/certs.
        """
        update = db.query(TalentSyncUpdate).filter(TalentSyncUpdate.id == update_id).first()
        if not update or update.status != "PENDING":
            return False

        if approved:
            update.status = "APPROVED"
            import json
            details = json.loads(update.update_details_json or "{}")

            if update.detected_type == "skill":
                skill_name = details.get("skill_name") or update.update_title.replace("Skill: ", "").replace("New Skill: ", "")
                category = details.get("category", "Technical")
                
                # Check if skill exists
                skill = db.query(Skill).filter(Skill.name == skill_name).first()
                if not skill:
                    skill = Skill(name=skill_name, category=category)
                    db.add(skill)
                    db.flush()

                # Check if employee has skill
                emp_skill = db.query(EmployeeSkill).filter(
                    EmployeeSkill.employee_id == update.employee_id,
                    EmployeeSkill.skill_id == skill.id
                ).first()

                if not emp_skill:
                    emp_skill = EmployeeSkill(
                        employee_id=update.employee_id,
                        skill_id=skill.id,
                        proficiency_level=4,
                        confidence_score=update.confidence,
                        skill_type="hidden" if "GitHub" in update.source else "explicit",
                        evidence_json=update.evidence_json
                    )
                    db.add(emp_skill)
                else:
                    emp_skill.confidence_score = max(emp_skill.confidence_score, update.confidence)
                    existing_ev = emp_skill.evidence
                    existing_ev.extend(update.evidence)
                    emp_skill.evidence = list(dict.fromkeys(existing_ev))

            elif update.detected_type == "project":
                title = details.get("title") or update.update_title.replace("Project: ", "")
                existing_p = db.query(Project).filter(
                    Project.employee_id == update.employee_id,
                    Project.title == title
                ).first()
                if not existing_p:
                    p = Project(
                        employee_id=update.employee_id,
                        title=title,
                        description=details.get("description", "Imported via TalentSync"),
                        technologies_json=json.dumps(details.get("technologies", [])),
                        repo_url=details.get("repo_url"),
                        role="Lead Developer"
                    )
                    db.add(p)

            elif update.detected_type == "certification":
                name = details.get("cert_name") or update.update_title.replace("Certification: ", "")
                existing_c = db.query(Certification).filter(
                    Certification.employee_id == update.employee_id,
                    Certification.name == name
                ).first()
                if not existing_c:
                    c = Certification(
                        employee_id=update.employee_id,
                        name=name,
                        issuer=details.get("issuer", "Professional Accreditation"),
                        issue_date=details.get("issue_date", "2024")
                    )
                    db.add(c)
        else:
            update.status = "REJECTED"

        db.commit()
        return True
