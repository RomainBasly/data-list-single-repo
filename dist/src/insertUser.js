"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = "https://eaepcgberfstswvqfqge.supabase.co/rest/v1/";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey || "");
function insertUser(name, email) {
    return supabase
        .from('app-users')
        .insert({ name: 'John Doe', email: 'john.doe@example.com' });
}
exports.default = insertUser;
