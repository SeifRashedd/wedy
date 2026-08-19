import { cookies } from "next/headers";
import type { Locale } from "./messages";

export async function getRequestLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get("wedy_locale")?.value === "en" ? "en" : "ar";
}
