"use client";

import { FormEvent, useState } from "react";
import { ShoppingItem } from "./types";

interface NewItemProps {
  onAddItem: (item: Omit<ShoppingItem, "id">) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const isNameValid = name.trim().length >= 2;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isNameValid) {
      return;
    }

    onAddItem({
      name: name.trim(),
      quantity,
      category,
    });

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-5"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Item Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => setNameTouched(true)}
          className={`w-full rounded-md border bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none ${
            !isNameValid && nameTouched ? "border-red-500" : "border-slate-700"
          }`}
          placeholder="e.g., apples"
          required
        />
        {!isNameValid && nameTouched && (
          <p className="text-sm text-red-400">Name must be at least 2 characters.</p>
        )}
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
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none"
          required
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
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none"
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
        disabled={!isNameValid}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        Add Item
      </button>
    </form>
  );
}
