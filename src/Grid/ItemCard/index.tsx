import { useState } from "react";
import styles from "./ItemCard.module.scss";
import Price from "./Price";

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
  return (
    <>
      <tr onClick={() => setIsOpen((c) => !c)}>
        <td>
          <span className={styles.title}>{title}</span>
          <br />
          <span>{gender}</span>
          <br />
          <span className={styles.gtin}>{gtin}</span>
        </td>
        <td>
          <div className={styles.item}>
            <img
              loading="lazy"
              alt={title}
              width="100%"
              height="auto"
              src={image_link}
            />
            <Price price={price} sale_price={sale_price} />
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={2}>
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
