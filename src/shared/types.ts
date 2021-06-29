export type Gender = 'female' | 'male' | 'unisex';

export type Item = {
  title: string;
  gtin: number;
  // This field is tainted on purpose, compiler gets angry, so we fallback to any.
  gender: any;
  sale_price: string;
  price: string;
  image_link: string;
  additional_image_link: string[];
}
