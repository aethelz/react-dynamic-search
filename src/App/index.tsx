import { useState, useMemo } from "react";
import styles from "./App.module.scss";

import type { Gender, Item } from "../shared/types";
import { isSubstring, isItem, itemOnSale } from "../shared/utils";

import data from "../shared/data.json";

import Wrapper from "../Wrapper";
import Grid from "../Grid";

function App() {
  const [filter, setFilter] = useState("");
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender | ''>('');

  const filters: ((item: Item) => boolean)[] = useMemo(
    () => [
      isItem,
      ({ title }) => isSubstring(title, filter),
      ({ price, sale_price }) => !onSaleOnly || itemOnSale(price, sale_price),
      ({ gender }) => !selectedGender || selectedGender === gender,
    ],
    [filter, onSaleOnly, selectedGender]
  );

  return (
    <Wrapper>
      <header className={styles.header}>
        <label>
          <input
            className={styles.search}
            type="search"
            placeholder="Search"
            aria-label="Search through products"
            onChange={({ currentTarget: { value } }) => {
              setFilter(value);
            }}
          />
        </label>

        <label>
          Gender:
          <select
            value={selectedGender}
            onChange={({ currentTarget: { value } }) => {
              setSelectedGender(value as Gender);
            }}
          >
            <option value="" disabled>Choose gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>

        <label>
          On Sale:
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={({ currentTarget: { checked } }) =>
              setOnSaleOnly(checked)
            }
          />
        </label>
      </header>

      <main>
        <Grid data={data as Item[]} filters={filters} />
      </main>
    </Wrapper>
  );
}

export default App;
