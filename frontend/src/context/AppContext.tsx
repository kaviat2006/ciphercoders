import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, EmployeeProfile, MatchResult, TalentSyncUpdate } from '../services/api';
import { useAuth } from './AuthContext';

interface AppContextType {
  currentPersona: 'employee' | 'hr';
  setPersona: (persona: 'employee' | 'hr') => void;
  profile: EmployeeProfile | null;
  matches: MatchResult[];
  syncUpdates: TalentSyncUpdate[];
  pendingSyncCount: number;
  refreshData: () => Promise<void>;
  simulateFridayCommit: () => Promise<void>;
  approveAllUpdates: () => Promise<void>;
  activeEmployeeId: number;
  setActiveEmployeeId: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, role } = useAuth();
  const [currentPersona, setPersona] = useState<'employee' | 'hr'>(role === 'HR_ADMIN' ? 'hr' : 'employee');
  const [activeEmployeeId, setActiveEmployeeId] = useState<number>(user?.employee_id || 1);
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [syncUpdates, setSyncUpdates] = useState<TalentSyncUpdate[]>([]);

  useEffect(() => {
    if (user?.employee_id) {
      setActiveEmployeeId(user.employee_id);
    }
  }, [user]);

  const refreshData = async () => {
    const targetId = activeEmployeeId || user?.employee_id || 1;
    const prof = await api.getEmployeeProfile(targetId);
    setProfile(prof);
    const m = await api.getMatches(targetId);
    setMatches(m);
    const su = await api.getSyncUpdates(targetId);
    setSyncUpdates(su);
  };

  useEffect(() => {
    refreshData();
  }, [activeEmployeeId, user]);

  const pendingSyncCount = syncUpdates.filter(u => u.status === 'PENDING').length;

  const simulateFridayCommit = async () => {
    const targetId = activeEmployeeId || user?.employee_id || 1;
    await api.simulateFridayCommit(targetId);
    await refreshData();
  };

  const approveAllUpdates = async () => {
    const targetId = activeEmployeeId || user?.employee_id || 1;
    await api.processApproveAll(targetId);
    await refreshData();
  };

  return (
    <AppContext.Provider value={{
      currentPersona,
      setPersona,
      profile,
      matches,
      syncUpdates,
      pendingSyncCount,
      refreshData,
      simulateFridayCommit,
      approveAllUpdates,
      activeEmployeeId,
      setActiveEmployeeId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
