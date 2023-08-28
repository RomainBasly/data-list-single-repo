import supabase from "../config/database/supabaseClient";

export default async function fetchData() {
  try {
    const { data } = await supabase
      .from("app-lists")
      .select("*")
      return data
  } catch (error) {
    console.log(error);
  }
}
