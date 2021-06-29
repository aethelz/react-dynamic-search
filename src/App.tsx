import { useMemo } from "react";
import { data } from "./shared/data";
import ItemCard from "./ItemCard";

function App() {
  const sliced = useMemo(() => data.slice(0, 100), []);
  return (
    <div>
      {sliced.map((item) => (
        <ItemCard key={item.gtin} item={item} />
      ))}
    </div>
  );
}

export default App;
