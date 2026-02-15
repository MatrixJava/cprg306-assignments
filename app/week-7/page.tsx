"use client";

import Link from "next/link";
import { useState } from "react";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import NewItem from "./new-item";
import { ShoppingItem } from "./types";

function cleanItemName(name: string) {
  return name
    .split(",")[0]
    .trim()
    .replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu, "")
    .trim();
}

export default function Week7Page() {
  const [items, setItems] = useState<ShoppingItem[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (item: Omit<ShoppingItem, "id">) => {
    const newItem: ShoppingItem = {
      ...item,
      id: Date.now().toString(),
    };

    setItems((currentItems) => [...currentItems, newItem]);
  };

  const handleItemSelect = (item: ShoppingItem) => {
    setSelectedItemName(cleanItemName(item.name));
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Link href="/" className="mb-4 inline-block text-blue-400 hover:underline">
        ← Home
      </Link>
      <h1 className="mb-6 text-3xl font-bold">Shopping List (Week 7)</h1>
      <div className="grid gap-8 lg:grid-cols-[340px_1fr_420px]">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
