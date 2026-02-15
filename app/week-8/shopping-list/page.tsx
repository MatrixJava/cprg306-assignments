"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
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

export default function Week8ShoppingListPage() {
  const { user } = useUserAuth();
  const [items, setItems] = useState<ShoppingItem[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
        <h1 className="mb-4 text-3xl font-bold">Access Restricted</h1>
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link href="/week-8" className="text-blue-400 hover:underline">
          Return to Week 8 Login
        </Link>
      </main>
    );
  }

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
      <div className="mb-4 flex items-center justify-between">
        <Link href="/week-8" className="inline-block text-blue-400 hover:underline">
          ← Week 8 Auth
        </Link>
        <p className="text-sm text-slate-300">Signed in as {user.email}</p>
      </div>
      <h1 className="mb-6 text-3xl font-bold">Shopping List (Week 8)</h1>
      <div className="grid gap-8 lg:grid-cols-[340px_1fr_420px]">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
