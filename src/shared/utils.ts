import type { Item, Gender } from "./types";
import { genders } from "./CONSTANTS";

export function isSubstring(str: string, substring: string): boolean {
  return str.toLowerCase().includes(substring.toLowerCase());
}

export function isGender(value: any): value is Gender {
  return genders.includes(value);
}

export function itemOnSale(price: string, sale_price: string): boolean {
  const priceNumeric = parseFloat(price);
  const salePriceNumeric = parseFloat(sale_price);

  return priceNumeric > salePriceNumeric;
}

export function isItem(item: any): item is Item {
  // More checks can be added here if data structure is potentially compromised
  // and does not come from a strictly-typed source
  const isObject = typeof item === "object";
  if (!isObject) return false;

  const hasAllFields = [
    "title",
    "gtin",
    "gender",
    "sale_price",
    "price",
    "image_link",
    "additional_image_link",
  ].every((f) => f in item);
  const additionalImagesIsArray = Array.isArray(item["additional_image_link"]);
  return (
    hasAllFields &&
    isGender(item["gender"]) &&
    additionalImagesIsArray
  );
}
