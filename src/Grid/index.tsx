import type { Item } from "../shared/types";
import { paginationLimit } from "../shared/CONSTANTS";
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

    return data
      .filter((item) => filters.every((f) => f(item)))
      .slice(0, paginationLimit);
  }, [filters, data]);

  if (!items.length) return <NothingFound />;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>gtin</th>
          <th>Gender</th>
          <th>Price</th>
          <th>Sale Price</th>
          <th>Thumbnail</th>
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
