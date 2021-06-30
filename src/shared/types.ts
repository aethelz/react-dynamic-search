import { genders } from "./CONSTANTS";

export type Gender = typeof genders[number];

export type Item = {
  title: string;
  gtin: number;
  gender: Gender;
  sale_price: string;
  price: string;
  image_link: string;
  additional_image_link: string[];
};
