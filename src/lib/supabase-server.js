import { createClient } from '@supabase/supabase-js';

// Service role client — only used server-side in API routes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jpubdtpisbihimmrbyfh.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
