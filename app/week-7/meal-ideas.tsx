"use client";

import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) {
    return [];
  }

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
  );

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as { meals: Meal[] | null };
  return data.meals ?? [];
}

interface MealIdeasProps {
  ingredient: string;
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadMealIdeas = async () => {
      if (!ingredient) {
        setMeals([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const mealIdeas = await fetchMealIdeas(ingredient);
        if (!ignore) {
          setMeals(mealIdeas);
        }
      } catch {
        if (!ignore) {
          setMeals([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadMealIdeas();

    return () => {
      ignore = true;
    };
  }, [ingredient]);

  return (
    <section className="w-full rounded border p-4 lg:max-w-md">
      <h2 className="mb-2 text-xl font-semibold">Meal Ideas</h2>
      {ingredient ? (
        <p className="mb-3 text-sm">
          Ingredient: <span className="font-semibold">{ingredient}</span>
        </p>
      ) : (
        <p className="mb-3 text-sm">Select an item to see meal ideas.</p>
      )}

      {isLoading && <p className="text-sm">Loading meals...</p>}
      {!isLoading && ingredient && meals.length === 0 && (
        <p className="text-sm">No meal ideas found.</p>
      )}

      {!isLoading && meals.length > 0 && (
        <ul className="list-disc space-y-1 pl-5">
          {meals.map((meal) => (
            <li key={meal.idMeal}>{meal.strMeal}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
