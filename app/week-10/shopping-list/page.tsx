"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addItem, getItems } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
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

export default function Week10ShoppingListPage() {
  const { user, firebaseConfigured } = useUserAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      if (!firebaseConfigured) {
        setError("Firebase is not configured.");
        setItems([]);
        setLoading(false);
        return;
      }

      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const userItems = await getItems(user.uid);
        setItems(userItems);
      } catch {
        setError("Unable to load shopping list from Firestore.");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [firebaseConfigured, user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
        <h1 className="mb-4 text-3xl font-bold">Access Restricted</h1>
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link href="/week-10" className="text-blue-400 hover:underline">
          Return to Week 10 Login
        </Link>
      </main>
    );
  }

  const handleAddItem = async (item: Omit<ShoppingItem, "id">) => {
    if (!firebaseConfigured) {
      setError("Firebase is not configured.");
      return;
    }

    try {
      const id = await addItem(user.uid, item);
      setItems((currentItems) => [...currentItems, { ...item, id }]);
    } catch {
      setError("Unable to add item to Firestore.");
    }
  };

  const handleItemSelect = (item: ShoppingItem) => {
    setSelectedItemName(cleanItemName(item.name));
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/week-10" className="inline-block text-blue-400 hover:underline">
          ← Week 10 Auth
        </Link>
        <p className="text-sm text-slate-300">Signed in as {user.email}</p>
      </div>
      <h1 className="mb-6 text-3xl font-bold">Shopping List (Week 10)</h1>
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {loading && <p className="mb-4 text-slate-300">Loading your items...</p>}
      <div className="grid gap-8 lg:grid-cols-[340px_1fr_420px]">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
