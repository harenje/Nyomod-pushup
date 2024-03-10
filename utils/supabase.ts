import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

const supabaseUrl = "https://qjrexzptefplzbhmrnyv.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcmV4enB0ZWZwbHpiaG1ybnl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5ODI2MjcsImV4cCI6MjAyNTU1ODYyN30.TUg8zwLIDQ5hrJlloYCEKJLMemW7PwoMwNMjYwrrOx8"

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing API keys")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey!)
