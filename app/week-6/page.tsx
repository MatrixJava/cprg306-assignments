"use client";

import Link from "next/link";
import { useState } from "react";
import ItemList from "./item-list";
import itemsData from "./items.json";
import NewItem from "./new-item";
import { ShoppingItem } from "./types";

export default function Week6Page() {
  const [items, setItems] = useState<ShoppingItem[]>(itemsData);

  const handleAddItem = (item: Omit<ShoppingItem, "id">) => {
    const newItem: ShoppingItem = {
      ...item,
      id: Date.now().toString(),
    };

    setItems((currentItems) => [...currentItems, newItem]);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Link href="/" className="mb-4 inline-block text-blue-400 hover:underline">
        ← Home
      </Link>
      <h1 className="mb-6 text-3xl font-bold">Shopping List (Week 6)</h1>
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
