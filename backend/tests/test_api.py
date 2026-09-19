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

def test_list_employees():
    response = client.get("/api/profile/list")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert data[0]["name"] == "Priya Sharma"

def test_employee_matches():
    response = client.get("/api/matching/matches/1")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert "match_score" in data[0]

def test_hr_metrics():
    response = client.get("/api/hr/metrics")
    assert response.status_code == 200
    assert "total_employees" in response.json()
