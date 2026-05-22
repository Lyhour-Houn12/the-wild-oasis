import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://womigkogshdrrvnqzfvw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbWlna29nc2hkcnJ2bnF6ZnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMTI4NjAsImV4cCI6MjA5NDY4ODg2MH0.QXFcmwUwtvsh57p8MVvegaFEod9ZAUBhAnKqSE5HWdQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
