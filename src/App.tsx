import { useMemo, useState } from "react";
import data from "./shared/data.json";
import type { Gender, Item } from "./shared/types";
import ItemCard from "./ItemCard";

function App() {
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [filter, setFilter] = useState("");
  const [genders, setGenders] = useState<Gender[]>([]);
  const items = useMemo(() => {
    if (!filter) return [];
    return (data as Item[])
      .filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()))
      .filter(({ price, sale_price }) => !onSaleOnly || sale_price < price)
      .filter(({ gender }) => !genders.length || genders.includes(gender))
      .slice(0, 100);
  }, [filter, onSaleOnly, genders]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        aria-label="Search through products"
        onChange={({ currentTarget: { value } }) => {
          setFilter(value);
        }}
      />

      <label>
        gender:
        <select
          multiple={true}
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
        On sale:
        <input
          type="checkbox"
          checked={onSaleOnly}
          onChange={({ currentTarget: { checked } }) => setOnSaleOnly(checked)}
        />
      </label>

      {items.map((item) => (
        <ItemCard key={item.gtin} item={item} />
      ))}
    </div>
  );
}

export default App;
