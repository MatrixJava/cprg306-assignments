"use client";

import Link from "next/link";
import { useState } from "react";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import NewItem from "./new-item";
import { initialItems } from "./items";
import type { ShoppingItem } from "./items";

function cleanIngredient(itemName: string) {
  return itemName
    .split(",")[0]
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .trim()
    .toLowerCase();
}

export default function Page() {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: Omit<ShoppingItem, "id">) => {
    const itemWithId = { ...newItem, id: Date.now().toString() };
    setItems((currentItems) => [...currentItems, itemWithId]);
  };

  const handleItemSelect = (item: ShoppingItem) => {
    setSelectedItemName(cleanIngredient(item.name));
  };

  return (
    <main className="p-6">
      <Link href="/" className="mb-4 inline-block text-blue-600 hover:underline">
        ← Home
      </Link>
      <h1 className="mb-6 text-2xl font-bold">Shopping List with Meal Ideas</h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <section className="w-full lg:max-w-2xl">
          <NewItem onAddItem={handleAddItem} />
          <div className="mt-6">
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
        </section>

        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
