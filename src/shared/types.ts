// type Gender = 'female' | 'male' | 'unisex';
type Gender = string | number;

export type Item = {
  title: string;
  gtin: number;
  gender: Gender;
  sale_price: string;
  price: string;
  image_link: string;
  additional_image_link: string[];
}
