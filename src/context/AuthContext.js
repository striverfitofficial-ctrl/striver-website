'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'striver_web_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  // Persist user to localStorage
  const persistUser = useCallback((u) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Signup via API route
  const signUp = async ({ email, password, firstName, lastName }) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'signup',
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    });
    const data = await res.json();
    if (!res.ok) return { data: null, error: { message: data.error } };
    persistUser(data.user);
    return { data, error: null };
  };

  // Login via API route
  const signIn = async ({ email, password }) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { data: null, error: { message: data.error } };
    persistUser(data.user);
    return { data, error: null };
  };

  // OAuth placeholders (Google / Apple — to be configured later)
  const signInWithOAuth = async (provider) => {
    return { data: null, error: { message: `${provider} sign-in will be available soon. Please use email/password for now.` } };
  };

  // Logout
  const signOut = async () => {
    persistUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithOAuth,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
