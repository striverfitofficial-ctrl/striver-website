import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword, verifyPassword } from '@/lib/password';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jpubdtpisbihimmrbyfh.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured.');
  return createClient(url, key);
}

export async function POST(request) {
  try {
    const supabase = getSupabaseAdmin();
    const { action, email, password, first_name, last_name } = await request.json();

    if (action === 'signup') {
      if (!email || !password || !first_name) {
        return NextResponse.json({ error: 'Email, password, and first name are required.' }, { status: 400 });
      }
      if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
      }

      // Check existing
      const { data: existing } = await supabase
        .from('web_accounts')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (existing) {
        return NextResponse.json({ error: 'This email is already registered on the website. Please log in instead.' }, { status: 409 });
      }

      const passwordHash = hashPassword(password);
      const { data: user, error: insertError } = await supabase
        .from('web_accounts')
        .insert({
          email: email.toLowerCase().trim(),
          password_hash: passwordHash,
          first_name: first_name.trim(),
          last_name: (last_name || '').trim(),
        })
        .select('id, email, first_name, last_name, created_at')
        .single();

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }

      return NextResponse.json({ user }, { status: 201 });

    } else if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
      }

      const { data: user, error: fetchError } = await supabase
        .from('web_accounts')
        .select('id, email, password_hash, first_name, last_name, avatar_url, created_at')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (fetchError || !user) {
        return NextResponse.json({ error: 'No website account found with this email. Please sign up first.' }, { status: 401 });
      }

      const valid = verifyPassword(password, user.password_hash);
      if (!valid) {
        return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
      }

      // Strip password_hash before returning
      const { password_hash, ...safeUser } = user;
      return NextResponse.json({ user: safeUser }, { status: 200 });

    } else {
      return NextResponse.json({ error: "Invalid action. Use 'signup' or 'login'." }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 });
  }
}
