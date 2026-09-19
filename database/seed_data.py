from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.domain import (
    Employee, Skill, EmployeeSkill, Project, Certification,
    LearningActivity, Opportunity, TalentSyncUpdate,
    CareerRoadmapNode, RecommendationOutcome, User
)
from app.core.security import hash_password
import json
from datetime import datetime

def seed_database(db: Session):
    # Re-create tables
    try:
        Base.metadata.drop_all(bind=engine)
    except Exception:
        pass
    Base.metadata.create_all(bind=engine)

    # Check if already seeded
    if db.query(Employee).first():
        # Ensure demo users exist even if employees are already seeded
        _ensure_demo_users(db)
        return

    print("[Database] Seeding database with rich organizational talent intelligence data...")

    # 1. Create Skills
    skills_data = [
        ("Python", "AI/ML", False),
        ("Java", "Backend", False),
        ("SQL", "Data", False),
        ("Machine Learning", "AI/ML", False),
        ("AWS", "Cloud", False),
        ("Docker", "DevOps", False),
        ("Kubernetes", "DevOps", False),
        ("MLOps", "AI/ML", True),
        ("Generative AI & LLMs", "AI/ML", True),
        ("Data Engineering", "Data", False),
        ("Scikit-learn", "AI/ML", False),
        ("XGBoost", "AI/ML", False),
        ("Recommendation Systems", "AI/ML", True),
        ("Model Evaluation", "AI/ML", False),
        ("Tableau", "Data", False),
        ("Spring Boot", "Backend", False),
        ("PostgreSQL", "Backend", False),
        ("AI Security", "Security", True),
    ]

    skill_objs = {}
    for name, cat, is_em in skills_data:
        s = Skill(name=name, category=cat, is_emerging=is_em)
        db.add(s)
        db.flush()
        skill_objs[name] = s

    # 2. Create Primary Employee: Priya Sharma
    priya = Employee(
        name="Priya Sharma",
        email="employee@talentflow.demo", # Using demo email
        current_role="Software Developer",
        department="Software Engineering",
        experience_years=2.0,
        avatar_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        github_username="priyasharma-dev",
        linkedin_url="https://linkedin.com/in/priya-sharma-demo",
        bio="Full-stack developer passionate about applied Machine Learning, intelligent systems, and automated data pipelines.",
        sync_frequency="Weekly",
        profile_completeness=95
    )
    db.add(priya)

    # Secondary Employees for HR Search & Comparisons
    alex = Employee(
        name="Alex Rivera",
        email="alex.rivera@talentflow.ai",
        current_role="Data Analyst",
        department="Analytics & BI",
        experience_years=3.0,
        avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        github_username="arivera-analytics",
        linkedin_url="https://linkedin.com/in/alex-rivera-demo",
        bio="Data Analyst specializing in SQL, Tableau visualization, customer churn modeling, and predictive metrics.",
        sync_frequency="Daily",
        profile_completeness=88
    )
    marcus = Employee(
        name="Marcus Chen",
        email="marcus.chen@talentflow.ai",
        current_role="Backend Engineer",
        department="Core Platform",
        experience_years=4.5,
        avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        github_username="marcus-chen-backend",
        linkedin_url="https://linkedin.com/in/marcus-chen-demo",
        bio="Senior Java & Spring Boot engineer focused on high-throughput microservices, PostgreSQL scalability, and payment security.",
        sync_frequency="Weekly",
        profile_completeness=90
    )
    db.add_all([alex, marcus])
    db.flush()

    # 3. Create Demo Users
    emp_user = User(
        name="Priya Sharma",
        email="employee@talentflow.demo",
        hashed_password=hash_password("Employee@123"),
        role="EMPLOYEE",
        employee_id=priya.id
    )
    hr_user = User(
        name="HR Administrator",
        email="hr@talentflow.demo",
        hashed_password=hash_password("HR@123"),
        role="HR_ADMIN"
    )
    db.add_all([emp_user, hr_user])

    # 4. Add Priya's Skills & Evidence
    priya_skills = [
        (skill_objs["Python"], 4, 96.0, "explicit", ["Python used across 12 GitHub repositories", "Fraud Detection System codebase", "Certified Python Associate"]),
        (skill_objs["Java"], 3, 85.0, "explicit", ["Built core REST API microservices in 2023", "Internal enterprise backend modules"]),
        (skill_objs["SQL"], 4, 90.0, "explicit", ["Optimized complex PostgreSQL queries in Fraud Detection project", "Database Schema Design coursework"]),
        (skill_objs["Machine Learning"], 4, 88.0, "hidden", ["Fraud Detection project using XGBoost & Scikit-learn", "ML Model Training learning track completed", "GitHub ML repository activity"]),
        (skill_objs["AWS"], 3, 92.0, "explicit", ["AWS Cloud Practitioner certification", "Deployed S3 and Lambda triggers for internal data ingress"]),
        (skill_objs["Docker"], 2, 60.0, "transferable", ["Basic Dockerfile creation in personal sandbox repo", "Completed 45% of Docker Fundamentals course"]),
    ]

    for sk, prof, conf, stype, ev in priya_skills:
        es = EmployeeSkill(
            employee_id=priya.id,
            skill_id=sk.id,
            proficiency_level=prof,
            confidence_score=conf,
            skill_type=stype,
            evidence_json=json.dumps(ev)
        )
        db.add(es)

    # 5. Add Projects for Priya
    proj1 = Project(
        employee_id=priya.id,
        title="Fraud Detection System",
        description="End-to-end anomaly detection system processing financial transactions using XGBoost, Python, and SQL.",
        technologies_json=json.dumps(["Python", "Machine Learning", "XGBoost", "SQL", "Pandas"]),
        repo_url="https://github.com/priyasharma/fraud-detection-system",
        role="Lead ML Developer"
    )
    proj2 = Project(
        employee_id=priya.id,
        title="Recommendation Engine Prototype",
        description="Collaborative filtering recommendation prototype tested on internal dataset.",
        technologies_json=json.dumps(["Python", "Machine Learning", "Scikit-learn", "FastAPI"]),
        repo_url="https://github.com/priyasharma/recommendation-engine",
        role="Developer"
    )
    db.add_all([proj1, proj2])

    # 6. Add Certifications & Learning
    cert1 = Certification(employee_id=priya.id, name="AWS Certified Cloud Practitioner", issuer="Amazon Web Services", issue_date="2023-11")
    l1 = LearningActivity(employee_id=priya.id, title="Machine Learning Specialization", platform="Coursera", status="Completed", progress=100.0)
    l2 = LearningActivity(employee_id=priya.id, title="Docker & Container Mastery", platform="Udemy", status="In Progress", progress=45.0)
    db.add_all([cert1, l1, l2])

    # 7. Add Opportunities
    opp1 = Opportunity(
        title="Machine Learning Engineer",
        department="AI Research & Intelligence",
        opportunity_type="job",
        description="Design, deploy, and operationalize high-scale ML models into core production products.",
        required_skills_json=json.dumps(["Python", "Machine Learning", "SQL", "AWS"]),
        preferred_skills_json=json.dumps(["Docker", "MLOps", "Scikit-learn", "Kubernetes"]),
        required_experience_years=2.0,
        status="Open"
    )
    opp2 = Opportunity(
        title="Senior Data Scientist",
        department="Analytics & Insights",
        opportunity_type="job",
        description="Drive advanced predictive analytics and business revenue forecasting models.",
        required_skills_json=json.dumps(["Python", "SQL", "Machine Learning", "Data Engineering"]),
        preferred_skills_json=json.dumps(["Tableau", "Scikit-learn"]),
        required_experience_years=3.5,
        status="Open"
    )
    db.add_all([opp1, opp2])

    # 8. Add Roadmap Nodes
    nodes = [
        ("Software Developer", 1, "Docker Fundamentals", "Docker", "Course", "Learn container building & Dockerfiles.", "2 weeks", "IN_PROGRESS"),
        ("Software Developer", 2, "Containerized ML Model API", "Machine Learning", "Project", "Deploy Fraud API as Docker service.", "3 weeks", "TODO"),
        ("Software Developer", 3, "Kubernetes Essentials", "Kubernetes", "Course", "Master pods, services, and deployments.", "2 weeks", "TODO"),
    ]
    for role, order, title, sk, act, desc, dur, st in nodes:
        db.add(CareerRoadmapNode(employee_id=priya.id, target_role=role, step_order=order, title=title, skill_name=sk, activity_type=act, description=desc, estimated_duration=dur, status=st))

    db.commit()
    print("[Database] Seeding complete with Demo User Credentials!")

def _ensure_demo_users(db: Session):
    emp_user = db.query(User).filter(User.email == "employee@talentflow.demo").first()
    if not emp_user:
        priya = db.query(Employee).first()
        db.add(User(
            name="Priya Sharma",
            email="employee@talentflow.demo",
            hashed_password=hash_password("Employee@123"),
            role="EMPLOYEE",
            employee_id=priya.id if priya else None
        ))
    
    hr_user = db.query(User).filter(User.email == "hr@talentflow.demo").first()
    if not hr_user:
        db.add(User(
            name="HR Administrator",
            email="hr@talentflow.demo",
            hashed_password=hash_password("HR@123"),
            role="HR_ADMIN"
        ))

    db.commit()
