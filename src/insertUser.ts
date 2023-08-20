import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://eaepcgberfstswvqfqge.supabase.co/rest/v1/";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey ||"");

export default function insertUser(name: string, email: string) {
  return supabase
    .from('app-users')
    .insert({ name: 'John Doe', email: 'john.doe@example.com' })
}
