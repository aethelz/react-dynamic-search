import type { Item } from "../../shared/types";
import { useState } from "react";
import styles from "./ItemCard.module.scss";

type Props = {
  item: Item;
};
const ItemCard = ({ item }: Props) => {
  const {
    title,
    gtin,
    gender,
    sale_price,
    price,
    image_link,
    additional_image_link,
  } = item;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.wrapper} onClick={() => setIsOpen((c) => !c)}>
        <div>Title: {title}</div>
        <div>gtin: {gtin}</div>
        <div>gender: {gender}</div>
        <div>price: {price}</div>
        <div>sale_price: {sale_price}</div>
        <div>
          <img loading="lazy" width="auto" height="100px" src={image_link} />
        </div>
      </div>
      {isOpen && (
        <div className={styles.images}>
          {additional_image_link.map((src) => (
            <img key={src} src={src} width="auto" height="100px" />
          ))}
        </div>
      )}
    </>
  );
};

export default ItemCard;
