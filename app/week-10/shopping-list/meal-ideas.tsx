"use client";

import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealIdeasProps {
  ingredient: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) {
    return [];
  }

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meal ideas.");
  }

  const data = (await response.json()) as { meals: Meal[] | null };
  return data.meals ?? [];
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const loadMeals = async () => {
      if (!ingredient) {
        setMeals([]);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const fetchedMeals = await fetchMealIdeas(ingredient);
        if (!isCancelled) {
          setMeals(fetchedMeals);
        }
      } catch {
        if (!isCancelled) {
          setMeals([]);
          setError("Unable to load meal ideas right now.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadMeals();

    return () => {
      isCancelled = true;
    };
  }, [ingredient]);

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <h2 className="mb-2 text-xl font-bold">Meal Ideas</h2>
      {!ingredient && (
        <p className="text-slate-300">Select an item to see meal ideas by ingredient.</p>
      )}
      {ingredient && (
        <p className="mb-4 text-sm text-slate-300">
          Ingredient: <span className="font-semibold capitalize text-slate-100">{ingredient}</span>
        </p>
      )}
      {loading && <p className="text-slate-300">Loading ideas...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && ingredient && meals.length === 0 && (
        <p className="text-slate-300">No meal ideas found for this ingredient.</p>
      )}
      {!loading && meals.length > 0 && (
        <ul className="space-y-3">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="rounded-lg border border-slate-700 p-3">
              <p className="font-medium">{meal.strMeal}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
