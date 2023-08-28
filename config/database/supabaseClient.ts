import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
  }
  console.log("here")
  return createClient(supabaseUrl, supabaseKey);
}

const supabase = createSupabaseClient();

export default supabase;
