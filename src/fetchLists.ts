import supabase from "./config/database/supabaseClient";

export type ListItem = {
  id: number;
  created_at: string;
  title: string;
  list_element_id: number[];
};

export default async function fetchData(): Promise<ListItem[]> {
  try {
    const { data, error } = await supabase.from("My-lists").select("*");
    if (error) {
      throw error;
    }
    if (!data) return [];
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
