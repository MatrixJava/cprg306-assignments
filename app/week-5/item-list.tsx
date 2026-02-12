"use client";

import { useMemo, useState } from "react";
import Item from "./item";
import { items } from "./items";

type ViewMode = "name" | "category" | "grouped";

export default function ItemList() {
  const [viewMode, setViewMode] = useState<ViewMode>("name");

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (viewMode === "name") {
        return a.name.localeCompare(b.name);
      }

      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) {
        return categoryCompare;
      }

      return a.name.localeCompare(b.name);
    });
  }, [viewMode]);

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
          onClick={() => setViewMode("name")}
          className={`rounded px-3 py-1 text-sm font-semibold ${
            viewMode === "name" ? "bg-orange-600 text-white" : "bg-slate-700 text-slate-100"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setViewMode("category")}
          className={`rounded px-3 py-1 text-sm font-semibold ${
            viewMode === "category" ? "bg-orange-600 text-white" : "bg-slate-700 text-slate-100"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setViewMode("grouped")}
          className={`rounded px-3 py-1 text-sm font-semibold ${
            viewMode === "grouped" ? "bg-orange-600 text-white" : "bg-slate-700 text-slate-100"
          }`}
        >
          Group by Category
        </button>
      </div>

      {viewMode !== "grouped" ? (
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
