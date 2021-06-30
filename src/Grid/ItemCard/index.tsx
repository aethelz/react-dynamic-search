import { useState } from "react";
import styles from "./ItemCard.module.scss";

import type { Item } from "../../shared/types";

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
  const onSale = sale_price < price;
  return (
    <>
      <tr onClick={() => setIsOpen((c) => !c)}>
        <td>{title}</td>
        <td>{gtin}</td>
        <td>{gender}</td>
        <td className={styles.price}>{price}</td>
        <td>
          <span className={styles.price}>{sale_price}</span><br />
          {onSale && <span className={styles.sale}>SALE!</span>}
        </td>
        <td>
          <img
            loading="lazy"
            alt={title}
            width="auto"
            height="200px"
            src={image_link}
          />
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={6}>
            <div className={styles.images}>
              {additional_image_link.map((src) => (
                <img
                  alt={title}
                  key={src}
                  src={src}
                  width="auto"
                  height="200px"
                />
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ItemCard;
