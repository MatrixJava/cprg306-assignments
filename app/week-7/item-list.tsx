"use client";

import { useState } from "react";
import Item from "./item";
import type { ShoppingItem } from "./items";

type ViewMode = "name" | "category" | "grouped";

interface ItemListProps {
  items: ShoppingItem[];
  onItemSelect: (item: ShoppingItem) => void;
}

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("name");

  const sortedItems = [...items].sort((a, b) => {
    if (viewMode === "name") {
      return a.name.localeCompare(b.name);
    }

    const categoryCompare = a.category.localeCompare(b.category);
    if (categoryCompare !== 0) {
      return categoryCompare;
    }

    return a.name.localeCompare(b.name);
  });

  const groupedByCategory: Record<string, ShoppingItem[]> = {};
  if (viewMode === "grouped") {
    for (const item of sortedItems) {
      if (!groupedByCategory[item.category]) {
        groupedByCategory[item.category] = [];
      }
      groupedByCategory[item.category].push(item);
    }
  }

  const buttonClass = (isActive: boolean) =>
    `rounded border px-3 py-1 text-sm ${isActive ? "bg-gray-200" : "bg-white"}`;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setViewMode("name")}
          className={buttonClass(viewMode === "name")}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setViewMode("category")}
          className={buttonClass(viewMode === "category")}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setViewMode("grouped")}
          className={buttonClass(viewMode === "grouped")}
        >
          Group by Category
        </button>
      </div>

      {viewMode !== "grouped" ? (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
          ))}
        </ul>
      ) : (
        <div>
          {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
            <section key={category}>
              <h2 className="mb-2 mt-4 font-semibold capitalize">{category}</h2>
              <ul>
                {categoryItems.map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={() => onItemSelect(item)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
