'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

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

    // Set up Supabase auth listener to sync session if needed
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user && event === 'SIGNED_IN') {
        // If logged in via Supabase (OAuth or Phone), sync it to our custom state
        const supaUser = {
          id: session.user.id,
          email: session.user.email,
          phone: session.user.phone,
          firstName: session.user.user_metadata?.full_name?.split(' ')[0] || 'User',
          lastName: session.user.user_metadata?.full_name?.split(' ')[1] || '',
          method: session.user.app_metadata?.provider || 'supabase'
        };
        persistUser(supaUser);
      } else if (event === 'SIGNED_OUT') {
        persistUser(null);
      }
    });

    return () => subscription.unsubscribe();
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

  // OAuth implementation (Google)
  const signInWithOAuth = async (provider) => {
    if (provider === 'apple') {
       return { data: null, error: { message: `Apple sign-in is not configured. Please use Phone or Google.` } };
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    return { data, error };
  };

  // Phone Auth (Send OTP)
  const signInWithPhone = async (phone) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });
    return { data, error };
  };

  // Verify Phone OTP
  const verifyPhoneOtp = async (phone, token) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });
    return { data, error };
  };

  // Logout
  const signOut = async () => {
    await supabase.auth.signOut();
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
        signInWithPhone,
        verifyPhoneOtp,
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
