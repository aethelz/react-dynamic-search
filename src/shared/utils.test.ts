import { genders } from "./CONSTANTS";
import { itemOnSale, isItem, isGender, isSubstring } from "./utils";

it("compares integer prices", () => {
  expect(itemOnSale("2 EUR", "1 EUR")).toEqual(true);
  expect(itemOnSale("2 EUR", "2 EUR")).toEqual(false);
  expect(itemOnSale("1 EUR", "2 EUR")).toEqual(false);
});

it("compares float prices", () => {
  expect(itemOnSale("2.01 EUR", "1.01 EUR")).toEqual(true);
  expect(itemOnSale("2.01 EUR", "2.01 EUR")).toEqual(false);
  expect(itemOnSale("1.01 EUR", "2.01 EUR")).toEqual(false);
});

it("compares mixed prices", () => {
  expect(itemOnSale("2.0 EUR", "1 EUR")).toEqual(true);
  expect(itemOnSale("2 EUR", "2.0 EUR")).toEqual(false);
  expect(itemOnSale("1.0 EUR", "2.0 EUR")).toEqual(false);
});

it("finds case-insensitive substrings", () => {
  expect(isSubstring('test', 'es')).toEqual(true);
  expect(isSubstring('test', 'Es')).toEqual(true);
  expect(isSubstring('teSt', 'Es')).toEqual(true);
  expect(isSubstring('teSt', 'rEs')).toEqual(false);
  expect(isSubstring('teSt', 'a')).toEqual(false);
});

it("detects gender", () => {
  genders.forEach((gender) => expect(isGender(gender)).toEqual(true));
  expect(isGender(1123121)).toEqual(false);
  expect(isGender("robot")).toEqual(false);
});

it("detects malformed Items", () => {
  expect(isItem({})).toEqual(false);
  expect(isItem("test")).toEqual(false);
  expect(isItem({
    "title": "Vero Moda Tall VMCILLA  Freizeitkleid navy blazer",
    "gtin": 5713616773484,
    "gender": "female",
    "sale_price": "24.45 EUR",
    "price": "34.95 EUR",
  })).toEqual(false);
  expect(isItem({
    "title": "Vero Moda Tall VMCILLA  Freizeitkleid navy blazer",
    "gtin": 5713616773484,
    "gender": "female",
    "sale_price": "24.45 EUR",
    "price": "34.95 EUR",
    "image_link": "https://mosaic01.ztat.net/vgs/media/large/VE/B2/1C/00/OK/11/VEB21C00O-K11@12.jpg",
    "additional_image_link": "http://test.com"
  })).toEqual(false);
  expect(isItem({
    "title": "Vero Moda Tall VMCILLA  Freizeitkleid navy blazer",
    "gtin": 5713616773484,
    "gender": "female",
    "sale_price": "24.45 EUR",
    "price": "34.95 EUR",
    "image_link": "https://mosaic01.ztat.net/vgs/media/large/VE/B2/1C/00/OK/11/VEB21C00O-K11@12.jpg",
    "additional_image_link": []
  })).toEqual(true);
});
