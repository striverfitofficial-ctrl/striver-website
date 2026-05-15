import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword, verifyPassword } from '@/lib/password';
import dns from 'dns/promises';

// Common disposable/temporary email domains to block
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','guerrillamail.com','tempmail.com','throwaway.email',
  'yopmail.com','trashmail.com','sharklasers.com','guerrillamailblock.com',
  'grr.la','dispostable.com','maildrop.cc','10minutemail.com','temp-mail.org',
  'fakeinbox.com','mailnesia.com','tempail.com','burnermail.io','mohmal.com',
]);

// Validate email format strictly
function isValidEmailFormat(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

// Check if domain has MX records (can receive mail)
async function hasValidMX(domain) {
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}

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

      // Layer 1: Strict format check
      const cleanEmail = email.toLowerCase().trim();
      if (!isValidEmailFormat(cleanEmail)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
      }

      // Layer 2: Block disposable email providers
      const domain = cleanEmail.split('@')[1];
      if (DISPOSABLE_DOMAINS.has(domain)) {
        return NextResponse.json({ error: 'Temporary/disposable emails are not allowed. Please use a real email.' }, { status: 400 });
      }

      // Layer 3: Verify domain has MX records (can actually receive mail)
      const validMX = await hasValidMX(domain);
      if (!validMX) {
        return NextResponse.json({ error: `The email domain "${domain}" does not exist or cannot receive emails. Please use a valid email.` }, { status: 400 });
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
