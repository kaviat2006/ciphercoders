import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';

import { LoginPage } from './pages/LoginPage';
import { OnboardingWizard } from './pages/OnboardingWizard';
import { LandingPage } from './pages/LandingPage';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { TalentProfile } from './pages/TalentProfile';
import { TalentSync } from './pages/TalentSync';
import { ProfileChangeHistory } from './pages/ProfileChangeHistory';
import { Opportunities } from './pages/Opportunities';
import { WhyRecommended } from './pages/WhyRecommended';
import { WhyNotSelected } from './pages/WhyNotSelected';
import { SkillGapAnalysis } from './pages/SkillGapAnalysis';
import { EmergingSkillsForecast } from './pages/EmergingSkillsForecast';
import { TeamMatching } from './pages/TeamMatching';
import { CareerRoadmap } from './pages/CareerRoadmap';
import { CareerCopilot } from './pages/CareerCopilot';
import { SkillGraph } from './pages/SkillGraph';
import { FeedbackPage } from './pages/FeedbackPage';
import { HRDashboard } from './pages/HRDashboard';
import { HREmployeeDirectory } from './pages/HREmployeeDirectory';
import { HRTalentSearch } from './pages/HRTalentSearch';
import { HREmployeeProfile } from './pages/HREmployeeProfile';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Routes>
              {/* Authentication & Onboarding Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/onboarding" element={<OnboardingWizard />} />

              {/* Main Application Routes inside AppLayout */}
              <Route
                path="/*"
                element={
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      
                      {/* Employee Routes */}
                      <Route path="/dashboard" element={<Navigate to="/employee/dashboard" replace />} />
                      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                      <Route path="/employee/profile" element={<TalentProfile />} />
                      <Route path="/employee/talent-sync" element={<TalentSync />} />
                      <Route path="/employee/history" element={<ProfileChangeHistory />} />
                      <Route path="/employee/opportunities" element={<Opportunities />} />
                      <Route path="/employee/why-recommended" element={<WhyRecommended />} />
                      <Route path="/employee/why-not-selected" element={<WhyNotSelected />} />
                      <Route path="/employee/skill-gap" element={<SkillGapAnalysis />} />
                      <Route path="/employee/roadmap" element={<CareerRoadmap />} />
                      <Route path="/employee/copilot" element={<CareerCopilot />} />
                      <Route path="/employee/skill-graph" element={<SkillGraph />} />
                      <Route path="/employee/teams" element={<TeamMatching />} />
                      <Route path="/employee/feedback" element={<FeedbackPage />} />

                      {/* HR Admin Routes */}
                      <Route path="/hr/dashboard" element={<HRDashboard />} />
                      <Route path="/hr/directory" element={<HREmployeeDirectory />} />
                      <Route path="/hr/search" element={<HRTalentSearch />} />
                      <Route path="/hr/profile" element={<HREmployeeProfile />} />
                      <Route path="/hr/emerging-skills" element={<EmergingSkillsForecast />} />

                      {/* Common Shared Settings Route */}
                      <Route path="/settings" element={<SettingsPage />} />

                      {/* Fallback Aliases for Backwards Compatibility */}
                      <Route path="/profile" element={<TalentProfile />} />
                      <Route path="/talent-sync" element={<TalentSync />} />
                      <Route path="/history" element={<ProfileChangeHistory />} />
                      <Route path="/opportunities" element={<Opportunities />} />
                      <Route path="/why-recommended" element={<WhyRecommended />} />
                      <Route path="/why-not-selected" element={<WhyNotSelected />} />
                      <Route path="/skill-gap" element={<SkillGapAnalysis />} />
                      <Route path="/emerging-skills" element={<EmergingSkillsForecast />} />
                      <Route path="/teams" element={<TeamMatching />} />
                      <Route path="/roadmap" element={<CareerRoadmap />} />
                      <Route path="/copilot" element={<CareerCopilot />} />
                      <Route path="/skill-graph" element={<SkillGraph />} />
                      <Route path="/feedback" element={<FeedbackPage />} />
                    </Routes>
                  </AppLayout>
                }
              />
            </Routes>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
