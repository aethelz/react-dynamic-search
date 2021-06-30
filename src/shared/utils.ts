import type { Item, Gender } from "./types";
import { genders } from "./CONSTANTS";

export function isSubstring(str: string, substring: string): boolean {
  return str.toLowerCase().includes(substring.toLowerCase());
}

export function isGender(value: any): value is Gender {
  return genders.includes(value);
}

export function isItem(item: any): item is Item {
  // More checks can be added here if data structure is potentially compromised
  // and does not come from a strictly-typed source
  return (
    typeof item === "object" && "gender" in item && isGender(item["gender"])
  );
}
