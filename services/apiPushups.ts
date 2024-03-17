import { supabase } from "@/utils/supabase"

export async function getPushupsDani() {
  const { data, error } = await supabase
    .from("pushup")
    .select("*")
    .eq("name", "Dani")

  if (error) {
    console.error(error)
    throw new Error("Pushups for Dani could not be loaded")
  }
  return data
}

export async function getPushupsDonat() {
  const { data, error } = await supabase
    .from("pushup")
    .select("*")
    .eq("name", "Donat")

  if (error) {
    console.error(error)
    throw new Error("Pushups for Donat could not be loaded")
  }
  return data
}

export async function getPushupsKristof() {
  const { data, error } = await supabase
    .from("pushup")
    .select("*")
    .eq("name", "Kristof")

  if (error) {
    console.error(error)
    throw new Error("Pushups for Kristof could not be loaded")
  }
  return data
}

export async function updatePushup(name: string, additionalPushups: number) {
  try {
    const { data, error } = await supabase.rpc("incrementpushupnum", {
      name_param: name,
      pushup_addition: additionalPushups,
    })

    if (error) {
      console.error(error.message)
      throw new Error("Could not update pushups")
    }

    return data
  } catch (error) {
    console.error("An error occurred:", error)
    throw error
  }
}

export async function getMonthlyPushupsDani() {
  const { data, error } = await supabase
    .from("monthly_pushups")
    .select("*")
    .eq("contestant_name", "Dani");

  if (error) {
    console.error(error);
    throw new Error("Monthly pushups for Dani could not be loaded");
  }
  return data;
}

export async function getMonthlyPushupsDonat() {
  const { data, error } = await supabase
    .from("monthly_pushups")
    .select("*")
    .eq("contestant_name", "Donat");

  if (error) {
    console.error(error);
    throw new Error("Monthly pushups for Donat could not be loaded");
  }
  return data;
}

export async function getMonthlyPushupsKristof() {
  const { data, error } = await supabase
    .from("monthly_pushups")
    .select("*")
    .eq("contestant_name", "Kristof");

  if (error) {
    console.error(error);
    throw new Error("Monthly pushups for Kristof could not be loaded");
  }
  return data;
}


export async function getTodayPushups(name: string) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Set to start of today
  
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // Set to end of today

  const { data, error } = await supabase
    .from("pushup")
    .select("*")
    .eq("name", name)
    .gte("created_at", todayStart.toISOString())
    .lte("created_at", todayEnd.toISOString())

  if (error) {
    console.error(error)
    throw new Error(`Could not load pushups for ${name}`)
  }
  return data
}
