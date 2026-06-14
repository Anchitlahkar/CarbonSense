import { createClient } from '@supabase/supabase-js';

const isProduction = import.meta.env.PROD;
const hasKeys = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

if (isProduction && !hasKeys) {
  throw new Error("Supabase configuration missing in production");
}

const sanitize = (val: string) => val.replace(/[^\x20-\x7E]/g, '').replace(/['",]/g, '').trim();

const supabaseUrl = sanitize(import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co');
const supabaseAnonKey = sanitize(import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder');

console.log(`[AUTH_INIT] Supabase URL: ${supabaseUrl}`);
console.log(`[AUTH_INIT] Supabase Anon Key Length: ${supabaseAnonKey.length}`);

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase keys are missing from environment. Using mock/placeholder connection.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
