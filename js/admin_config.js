
// Supabase Configuration for Move Gym (Admin Page)
const SUPABASE_URL = 'https://uplbvrzpjmojedavsegh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbGJ2cnpwam1vamVkYXZzZWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTczNzQsImV4cCI6MjA4NDEzMzM3NH0.U80he1366RHG_Ye7DIBf72RGZXGv60yTsg5z-XYCTgg';

// GYM SELECTION: Move Gym (무브짐 구래점)
const CURRENT_GYM_ID = '97e5078b-203a-4f95-b3f4-6b00aa9f5feb';

// Initialize Supabase Client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase Client Initialized. Gym: Move Gym (ID: " + CURRENT_GYM_ID + ")");
