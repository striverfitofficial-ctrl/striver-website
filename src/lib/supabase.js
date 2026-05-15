import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jpubdtpisbihimmrbyfh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwdWJkdHBpc2JpaGltbXJieWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyODAzMTcsImV4cCI6MjA4Mjg1NjMxN30.f5GIGkv4srZ7agJeYO-tm_Km933dTTUdIqdOtg2lGC8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
