import type { Item } from "../shared/types";
import { useMemo } from "react";
import styles from "./Grid.module.scss";
import ItemCard from "./ItemCard";
import NothingFound from "./NothingFound";

type Props = {
  data: Item[];
  filters: ((item: Item) => boolean)[];
};
const Grid = ({ data, filters }: Props) => {
  const items = useMemo(() => {
    if (!filters.length) return [];

    return data.filter((item) => filters.every((f) => f(item))).slice(0, 100);
  }, [filters, data]);

  if (!items.length) return <NothingFound />;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>gtin</th>
          <th>gender</th>
          <th>price</th>
          <th>sale price</th>
          <th>thumbnail</th>
        </tr>
      </thead>
      <tbody data-testid="itemContainer">
        {items.map((item) => (
          <ItemCard key={item.gtin} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
