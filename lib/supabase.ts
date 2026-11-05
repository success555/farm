import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qkhvewiwzqcwavqyofuk.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFraHZld2l3enFjd2F2cXlvZnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4ODU2NzQsImV4cCI6MjEwOTQ2MTY3NH0.HCvWfixGdsPTIiDgpTbttXpyOgcfdK9CrkCXOztiUik';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

