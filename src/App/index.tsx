import { useState, useMemo } from "react";
import styles from "./App.module.scss";

import type { Gender, Item } from "../shared/types";
import { contains } from "../shared/utils";

import data from "../shared/data.json";

import Wrapper from "../Wrapper";
import Grid from "../Grid";

function App() {
  const [filter, setFilter] = useState("");
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [genders, setGenders] = useState<Gender[]>([]);

  const showGrid = filter !== "";
  const filters: ((item: Item) => boolean)[] = useMemo(
    () => [
      ({ title }) => contains(title, filter),
      ({ price, sale_price }) => !onSaleOnly || sale_price < price,
      ({ gender }) => !genders.length || genders.includes(gender),
    ],
    [filter, onSaleOnly, genders]
  );

  return (
    <Wrapper>
      <header className={styles.header}>
        <label>
          Search Products:
          <input
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
            value={genders}
            onChange={({ currentTarget: { selectedOptions } }) => {
              const value = Array.from(
                selectedOptions,
                (option) => option.value
              ) as Gender[];
              setGenders(value);
            }}
          >
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
        {showGrid && <Grid data={data as Item[]} filters={filters} />}
      </main>
    </Wrapper>
  );
}

export default App;
