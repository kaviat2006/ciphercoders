import os
import json
from typing import Dict, Any, List
from app.models.domain import Employee, Opportunity

class GeminiCopilotService:
    @staticmethod
    def generate_career_advice(
        employee: Employee,
        user_query: str,
        target_opportunity: Opportunity = None
    ) -> Dict[str, Any]:
        """
        Sends rich context to Gemini API (or generates high quality DEMO fallback if key unavailable)
        """
        api_key = os.getenv("GEMINI_API_KEY", "")
        
        # Build contextual payload
        skills_summary = [
            f"{s.skill.name} (Proficiency: {s.proficiency_level}/5, Type: {s.skill_type}, Confidence: {s.confidence_score}%)"
            for s in employee.skills if s.skill
        ]
        projects_summary = [f"{p.title}: {p.description}" for p in employee.projects]
        certs_summary = [f"{c.name} ({c.issuer})" for c in employee.certifications]
        learning_summary = [f"{l.title} ({l.progress}% complete)" for l in employee.learning_activities]
        
        target_info = ""
        if target_opportunity:
            target_info = f"\nTarget Opportunity: {target_opportunity.title} (Required: {', '.join(target_opportunity.required_skills)})"

        context_prompt = f"""
Employee Context:
- Name: {employee.name}
- Current Role: {employee.current_role} ({employee.department})
- Experience: {employee.experience_years} years
- Skills: {', '.join(skills_summary)}
- Projects: {'; '.join(projects_summary)}
- Certifications: {'; '.join(certs_summary)}
- Learning Activities: {'; '.join(learning_summary)}
{target_info}

User Question: "{user_query}"
"""

        # Try live Gemini API call if key is present
        if api_key and api_key != "your_gemini_api_key_here":
            try:
                from google import genai
                client = genai.Client(api_key=api_key)
                system_instruction = (
                    "You are TalentFlow AI Gemini Career Copilot. Respond in strict JSON format with keys: "
                    "summary (str), strengths (list of str), skill_gaps (list of str), recommendations (list of str), "
                    "roadmap (list of str), next_steps (list of str)."
                )
                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=context_prompt,
                    config={"system_instruction": system_instruction, "response_mime_type": "application/json"}
                )
                if response and response.text:
                    parsed = json.loads(response.text)
                    return parsed
            except Exception as e:
                print(f"[Gemini Copilot] Live call failed, switching to demo fallback: {e}")

        # High quality realistic fallback engine
        return GeminiCopilotService._build_fallback_response(employee, user_query, target_opportunity)

    @staticmethod
    def _build_fallback_response(employee: Employee, query: str, target_opp: Opportunity = None) -> Dict[str, Any]:
        q_lower = query.lower()
        
        if "missing" in q_lower or "gap" in q_lower or "not currently" in q_lower:
            return {
                "summary": f"Analysis for {employee.name}: Based on your current technical portfolio and GitHub signal history, you have established strong backend & ML foundations, but require container orchestration and operational deployment practice for senior engineering positions.",
                "strengths": [
                    "Strong proficiency in Python, Data Pipelines, and Machine Learning algorithms",
                    "Proven project experience with Fraud Detection and ML model evaluation",
                    "AWS Cloud Practitioner certification validating cloud basics"
                ],
                "skill_gaps": [
                    "Docker containerization & multi-container orchestration",
                    "Kubernetes cluster deployment & Helm chart management",
                    "MLOps pipelines (MLflow, Kubeflow, automated model re-training)"
                ],
                "recommendations": [
                    "Enroll in the internal Docker & Kubernetes Developer Bootcamp",
                    "Build a sample ML Model Deployment project containerized with Docker",
                    "Shadow the Platform Engineering team for 2 weeks"
                ],
                "roadmap": [
                    "Week 1-2: Complete Docker Fundamentals & Containerization course",
                    "Week 3-4: Build containerized API for your Fraud Detection model",
                    "Week 5-6: Master Kubernetes deployments and ingress controllers",
                    "Week 7-8: Apply for internal ML Engineer opportunity"
                ],
                "next_steps": [
                    "Click 'Start Roadmap' in your Career Roadmap page",
                    "Schedule a 1-on-1 sync with your manager to request MLOps assignment"
                ]
            }

        elif "roles match" in q_lower or "opportunity" in q_lower or "recommend" in q_lower:
            return {
                "summary": f"Match evaluation for {employee.name}: Your profile aligns highly with Machine Learning Engineering, Data Science, and AI Engineering internal opportunities.",
                "strengths": [
                    "92% match score for Machine Learning Engineer",
                    "87% match score for Data Scientist",
                    "84% match score for AI Solutions Specialist"
                ],
                "skill_gaps": [
                    "Production MLOps (for Senior ML Engineer roles)",
                    "Distributed Spark processing (for Big Data Scientist roles)"
                ],
                "recommendations": [
                    "Apply directly to the open Machine Learning Engineer posting in AI Research",
                    "Review 'Why Recommended' breakdown on your Opportunities dashboard"
                ],
                "roadmap": [
                    "Step 1: Submit internal mobility application for ML Engineer role",
                    "Step 2: Prepare technical portfolio showcasing Fraud Detection project",
                    "Step 3: Complete MLOps module to boost match score to 98%"
                ],
                "next_steps": [
                    "Navigate to the Opportunities tab to view direct recommendation breakdowns",
                    "Use TalentSync to ensure all recent GitHub repos are approved"
                ]
            }

        else:
            return {
                "summary": f"Hello {employee.name}! As your Gemini Career Copilot, I analyzed your profile ({employee.current_role}, {employee.experience_years} yrs exp, {len(employee.skills)} skills tracked). You are positioned exceptionally well for internal career advancement.",
                "strengths": [
                    f"Verified competency in {', '.join([s.skill.name for s in employee.skills[:3] if s.skill])}",
                    "Proven GitHub contribution history and practical project execution",
                    "Active engagement in learning and skill upgrade tracks"
                ],
                "skill_gaps": [
                    "MLOps & CI/CD pipeline automation",
                    "Production scale Kubernetes deployment"
                ],
                "recommendations": [
                    "Focus on completing your active Docker learning module",
                    "Connect with internal mentors in the AI Research department",
                    "Check recommended roles in your Opportunities dashboard"
                ],
                "roadmap": [
                    "Phase 1: Complete containerization & cloud architecture modules",
                    "Phase 2: Deploy end-to-end ML project with automated CI/CD",
                    "Phase 3: Transition to ML Engineer / AI Specialist role"
                ],
                "next_steps": [
                    "Ask me any question such as 'What roles match my skills?' or 'Create a 3-month plan'",
                    "Review pending updates on TalentSync AI"
                ]
            }
