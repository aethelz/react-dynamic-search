import type { Item } from "../shared/types";
import { paginationLimit } from "../shared/CONSTANTS";
import styles from "./Grid.module.scss";
import ItemCard from "./ItemCard";
import NothingFound from "./NothingFound";

type Props = {
  data: Item[];
  filters: ((item: Item) => boolean)[];
};
const Grid = ({ data, filters }: Props) => {
  const items = filters.length
    ? data
        .filter((item) => filters.every((f) => f(item)))
        .slice(0, paginationLimit)
    : [];

  if (!items.length) return <NothingFound />;

  return (
    <table className={styles.table}>
      <tbody>
        {items.map((item) => (
          <ItemCard key={item.gtin} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
