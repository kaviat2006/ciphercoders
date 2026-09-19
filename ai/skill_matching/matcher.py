from typing import List, Dict, Any
from app.models.domain import Employee, Opportunity, EmployeeSkill, Project, Certification

class TransparentMatcher:
    @staticmethod
    def evaluate_match(employee: Employee, opportunity: Opportunity) -> Dict[str, Any]:
        """
        Calculates explainable match score using exact formula:
        Match Score = Weighted Matched Requirements / Weighted Total Requirements
        """
        # Collect employee skill names (case-insensitive)
        emp_skills_map = {}
        emp_skill_evidence = []
        for es in employee.skills:
            if es.skill:
                name_lower = es.skill.name.lower()
                emp_skills_map[name_lower] = es
                for ev in es.evidence:
                    emp_skill_evidence.append(f"{es.skill.name}: {ev}")

        req_skills = opportunity.required_skills or []
        pref_skills = opportunity.preferred_skills or []
        req_exp = opportunity.required_experience_years or 0.0
        emp_exp = employee.experience_years or 0.0

        # Weights
        REQ_WEIGHT = 2.0
        PREF_WEIGHT = 1.0
        EXP_WEIGHT = 2.0

        matched_req = []
        missing_req = []
        for s in req_skills:
            if s.lower() in emp_skills_map:
                matched_req.append(s)
            else:
                missing_req.append(s)

        matched_pref = []
        missing_pref = []
        for s in pref_skills:
            if s.lower() in emp_skills_map:
                matched_pref.append(s)
            else:
                missing_pref.append(s)

        # Calculate experience weight
        if req_exp <= 0:
            exp_points = EXP_WEIGHT
        else:
            exp_points = min(EXP_WEIGHT, (emp_exp / req_exp) * EXP_WEIGHT)

        total_weighted_points = (len(req_skills) * REQ_WEIGHT) + (len(pref_skills) * PREF_WEIGHT) + EXP_WEIGHT
        matched_weighted_points = (len(matched_req) * REQ_WEIGHT) + (len(matched_pref) * PREF_WEIGHT) + exp_points

        if total_weighted_points > 0:
            match_score = round((matched_weighted_points / total_weighted_points) * 100, 1)
        else:
            match_score = 100.0

        # Relevant projects
        all_target_skills = [s.lower() for s in req_skills + pref_skills]
        relevant_projects = []
        for proj in employee.projects:
            techs = [t.lower() for t in proj.technologies]
            if any(t in all_target_skills for t in techs) or any(s in proj.description.lower() for s in all_target_skills if proj.description):
                relevant_projects.append(proj.title)

        # Relevant certs
        relevant_certs = [c.name for c in employee.certifications]

        # Supporting evidence for matched skills
        supporting_evidence = []
        for s in matched_req + matched_pref:
            es = emp_skills_map.get(s.lower())
            if es and es.evidence:
                supporting_evidence.extend(es.evidence)
        
        # Deduplicate evidence
        supporting_evidence = list(dict.fromkeys(supporting_evidence))

        exp_matched = emp_exp >= req_exp

        # AI Explanation generation
        if match_score >= 80:
            status_summary = "Strong Recommended Alignment"
            ai_explanation = (
                f"{employee.name} exhibits strong alignment ({match_score}%) with the {opportunity.title} role. "
                f"Demonstrates key required skills ({', '.join(matched_req)}) supported by {len(relevant_projects)} relevant projects "
                f"and {emp_exp} years of relevant professional experience."
            )
            improvement_plan = None
        elif match_score >= 60:
            status_summary = "Moderate Alignment - Growth Potential"
            ai_explanation = (
                f"{employee.name} currently meets {match_score}% of the selection criteria for {opportunity.title}. "
                f"Possesses foundational skills ({', '.join(matched_req or ['key tech'])}), but is currently missing required skills: {', '.join(missing_req)}."
            )
            improvement_plan = [
                f"Complete targeted learning for missing skill(s): {', '.join(missing_req or ['MLOps'])}.",
                f"Build a practical internal project incorporating {missing_req[0] if missing_req else 'the missing stack'}.",
                "Gain hands-on experience under senior team mentorship.",
                "Complete relevant certification to validate advanced competency."
            ]
        else:
            status_summary = "Not Currently Recommended"
            ai_explanation = (
                f"{employee.name} is not currently recommended for {opportunity.title} based on specified criteria. "
                f"Current alignment is {match_score}%. Missing key skills ({', '.join(missing_req)}) and requires further domain experience."
            )
            improvement_plan = [
                f"Master prerequisite skills: {', '.join(missing_req)}.",
                "Participate in foundational internal learning tracks.",
                "Build end-to-end repository projects to establish skill evidence.",
                "Target junior assignments or parallel role transition tracks."
            ]

        return {
            "match_score": match_score,
            "matched_skills": matched_req + matched_pref,
            "missing_skills": missing_req + missing_pref,
            "experience_matched": exp_matched,
            "current_experience": emp_exp,
            "required_experience": req_exp,
            "relevant_projects": relevant_projects,
            "relevant_certifications": relevant_certs,
            "supporting_evidence": supporting_evidence,
            "ai_explanation": ai_explanation,
            "status_summary": status_summary,
            "improvement_plan": improvement_plan
        }
