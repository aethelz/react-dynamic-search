import styles from "./Price.module.scss";
import { itemOnSale } from "../../../shared/utils";

type Props = {
  price: string;
  sale_price: string;
};
const Price = ({ price, sale_price }: Props) => {
  const onSale = itemOnSale(price, sale_price);
  if (onSale) {
    return (
      <>
        <s className={styles.noWrap}>{price}</s>
        <br />
        <span className={styles.sale}>{sale_price}</span>
      </>
    );
  } else {
    return <span className={styles.boldPrice}>{sale_price}</span>;
  }
};

export default Price;
