"use client";

import { useMemo, useState } from "react";
import Item from "./item";
import { items } from "./items";

type SortBy = "name" | "category";

export default function ItemList() {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) {
        return categoryCompare;
      }

      return a.name.localeCompare(b.name);
    });
  }, [sortBy]);

  const groupedByCategory = useMemo(() => {
    return sortedItems.reduce<Record<string, typeof items>>((groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
      return groups;
    }, {});
  }, [sortedItems]);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSortBy("name")}
          className={`rounded px-3 py-1 text-sm font-semibold ${
            sortBy === "name" ? "bg-orange-600 text-white" : "bg-slate-700 text-slate-100"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`rounded px-3 py-1 text-sm font-semibold ${
            sortBy === "category" ? "bg-orange-600 text-white" : "bg-slate-700 text-slate-100"
          }`}
        >
          Sort by Category
        </button>
      </div>

      {sortBy === "name" ? (
        <ul>
          {sortedItems.map((item) => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))}
        </ul>
      ) : (
        <div>
          {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
            <section key={category}>
              <h2 className="mx-4 mt-6 text-lg font-bold capitalize">{category}</h2>
              <ul>
                {categoryItems.map((item) => (
                  <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
