import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, EmployeeProfile, MatchResult, TalentSyncUpdate } from '../services/api';

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
  const [currentPersona, setPersona] = useState<'employee' | 'hr'>('employee');
  const [activeEmployeeId, setActiveEmployeeId] = useState<number>(1);
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [syncUpdates, setSyncUpdates] = useState<TalentSyncUpdate[]>([]);

  const refreshData = async () => {
    const prof = await api.getEmployeeProfile(activeEmployeeId);
    setProfile(prof);
    const m = await api.getMatches(activeEmployeeId);
    setMatches(m);
    const su = await api.getSyncUpdates(activeEmployeeId);
    setSyncUpdates(su);
  };

  useEffect(() => {
    refreshData();
  }, [activeEmployeeId]);

  const pendingSyncCount = syncUpdates.filter(u => u.status === 'PENDING').length;

  const simulateFridayCommit = async () => {
    const newUpdates = await api.simulateFridayCommit(activeEmployeeId);
    await refreshData();
  };

  const approveAllUpdates = async () => {
    await api.processApproveAll(activeEmployeeId);
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
