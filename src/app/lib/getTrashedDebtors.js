

import { createClient } from "@/src/app/lib/server";


export async function getTrashedDebtors() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("debtors")
    .select(`*, transactions(*)`)
    .eq("status", "trash");

  if (error) throw new Error(error.message);

  return data ?? [];
}