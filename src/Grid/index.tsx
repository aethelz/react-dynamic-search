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
    <div className={styles.wrapper}>
      {items.map((item) => (
        <ItemCard key={item.gtin} item={item} />
      ))}
    </div>
  );
};

export default Grid;
