import sys
import os
from pathlib import Path

root_dir = Path(__file__).resolve().parent.parent.parent
backend_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["app"] == "TalentFlow AI"

def test_authentication():
    response = client.post("/api/auth/login", json={
        "email": "employee@talentflow.demo",
        "password": "Employee@123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "employee@talentflow.demo"

def test_employee_profile():
    response = client.get("/api/profile/1")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Priya Sharma"
    assert "skills" in data

def test_profile_change_history():
    response = client.get("/api/profile/history/1")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_talentsync_updates():
    response = client.get("/api/sync/updates/1")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_approve_reject_signals():
    # Fetch existing updates or trigger one
    updates = client.get("/api/sync/updates/1").json()
    if updates:
        update_id = updates[0]["id"]
        res = client.post(f"/api/sync/review/{update_id}?approved=true")
        assert res.status_code in [200, 400]

def test_opportunities():
    response = client.get("/api/matching/opportunities")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_skill_gaps():
    response = client.get("/api/matching/skill-gaps/1")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_career_roadmap():
    response = client.get("/api/roadmap/career-path/1")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        assert "skill_name" in data[0]

def test_gemini_copilot():
    response = client.post("/api/copilot/chat", json={
        "employee_id": 1,
        "message": "What skills do I need to become a Lead AI Engineer?"
    })
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data

def test_hr_metrics():
    response = client.get("/api/hr/metrics")
    assert response.status_code == 200
    assert "total_employees" in response.json()
