"use client";

import { useState } from "react";
import type { ShoppingItem } from "./items";

interface NewItemProps {
  onAddItem: (item: Omit<ShoppingItem, "id">) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedName = name.trim();
    if (cleanedName.length < 2) {
      return;
    }

    onAddItem({
      name: cleanedName,
      quantity,
      category,
    });

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3 rounded border p-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Item Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength={2}
          required
          className="w-full rounded border px-3 py-2"
          placeholder="e.g., Apples"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm font-medium">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={99}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded border px-3 py-2"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded border px-4 py-2"
      >
        Add Item
      </button>
    </form>
  );
}
