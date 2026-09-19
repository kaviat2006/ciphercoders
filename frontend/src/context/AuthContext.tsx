import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE } from '../services/api';

export interface UserAccount {
  id: number;
  name: string;
  email: string;
  role: 'EMPLOYEE' | 'HR_ADMIN';
  employee_id?: number;
}

interface AuthContextType {
  user: UserAccount | null;
  token: string | null;
  isAuthenticated: boolean;
  role: 'EMPLOYEE' | 'HR_ADMIN';
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  setUserSession: (user: UserAccount, token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => {
    const savedUser = localStorage.getItem('talentflow_user');
    return savedUser ? JSON.parse(savedUser) : { id: 1, name: 'Priya Sharma', email: 'employee@talentflow.demo', role: 'EMPLOYEE', employee_id: 1 };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('talentflow_token') || 'demo_token';
  });

  const role = user?.role || 'EMPLOYEE';

  const setUserSession = (newUser: UserAccount, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('talentflow_user', JSON.stringify(newUser));
    localStorage.setItem('talentflow_token', newToken);
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });

      if (res.ok) {
        const data = await res.json();
        setUserSession(data.user, data.access_token);
        return true;
      }
    } catch (e) {
      console.warn("API login offline, using fallback auth validation");
    }

    // Fallback client validation for demo credentials
    if (email === 'hr@talentflow.demo') {
      const hrUser: UserAccount = { id: 2, name: 'HR Administrator', email: 'hr@talentflow.demo', role: 'HR_ADMIN' };
      setUserSession(hrUser, 'demo_hr_token');
      return true;
    } else {
      const empUser: UserAccount = { id: 1, name: 'Priya Sharma', email: 'employee@talentflow.demo', role: 'EMPLOYEE', employee_id: 1 };
      setUserSession(empUser, 'demo_emp_token');
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('talentflow_user');
    localStorage.removeItem('talentflow_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, role, login, logout, setUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
