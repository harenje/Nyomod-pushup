import { supabase } from "@/utils/supabase"

export async function getPushupsDani() {
  const { data, error } = await supabase.from("pushup").select("*").eq("name", "Dani")

  if (error) {
    console.error(error)
    throw new Error("Pushups for Dani could not be loaded")
  }
  return data
}


export async function getPushupsDonat() {
  const { data, error } = await supabase.from("pushup").select("*").eq("name", "Donat")

  if (error) {
    console.error(error)
    throw new Error("Pushups for Donat could not be loaded")
  }
  return data
}


export async function getPushupsKristof() {
  const { data, error } = await supabase.from("pushup").select("*").eq("name", "Kristof")

  if (error) {
    console.error(error)
    throw new Error("Pushups for Kristof could not be loaded")
  }
  return data
}

