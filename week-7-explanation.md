# Week 7 Assignment Explanation (CPRG 306)

This guide explains exactly what your Week 7 code is doing so you can present it clearly.

## What Week 7 Adds

Week 7 extends the shopping list app by connecting to a third-party API (TheMealDB).

- User clicks an item in the shopping list.
- The selected item name is cleaned (remove quantity text and emoji/symbols).
- The cleaned ingredient is sent to TheMealDB API.
- The app displays meal ideas that use that ingredient.

## Main Data Flow

1. `NewItem` form sends a new item to the page component.
2. Page component stores all items in `items` state.
3. `ItemList` displays items and sorting/grouping controls.
4. User clicks an item.
5. Click event goes back to page through `onItemSelect`.
6. Page cleans selected name and stores it in `selectedItemName`.
7. `MealIdeas` receives `ingredient={selectedItemName}`.
8. `MealIdeas` uses `useEffect` to fetch from API whenever ingredient changes.
9. UI shows loading, error, no-results, or meal list.

---

## `app/week-7/page.tsx` Explained

### 1) Client Component and Imports

- `"use client"` allows React hooks and click handlers in this file.
- Imports:
  - `Link` for navigation back to home.
  - `useState` for state.
  - `ItemList`, `NewItem`, `MealIdeas` child components.
  - `initialItems` and `ShoppingItem` type.

### 2) `cleanIngredient(itemName: string)`

Purpose: convert shopping list labels into API-friendly ingredient text.

- `.split(",")[0]` keeps only text before comma.
- `.replace(...)` removes emoji/symbol characters.
- `.trim()` removes extra spaces.
- `.toLowerCase()` normalizes the query.

Example:

- `"chicken breast, 1 kg"` -> `"chicken breast"`

### 3) State in Page Component

- `items`: current shopping list array.
- `selectedItemName`: currently selected ingredient for API lookup.

### 4) `handleAddItem`

- Receives a new item from `NewItem` without an `id`.
- Creates a generated id using timestamp + random text.
- Appends the item to `items` state.

### 5) `handleItemSelect`

- Receives the clicked `ShoppingItem`.
- Cleans item name with `cleanIngredient`.
- Updates `selectedItemName`.

This state update is what triggers meal fetching in `MealIdeas`.

### 6) JSX Layout

- Left side:
  - `NewItem` form.
  - `ItemList` with `items` and `onItemSelect`.
- Right side:
  - `MealIdeas` gets `ingredient={selectedItemName}`.
- Responsive behavior:
  - Mobile: stacked column.
  - Large screens: side-by-side.

---

## `app/week-7/meal-ideas.tsx` Explained

### 1) Client Component and Types

- `"use client"` because it uses hooks.
- `Meal` interface describes API objects:
  - `idMeal`
  - `strMeal`
  - `strMealThumb`

### 2) `fetchMealIdeas(ingredient)`

This function is outside the component so API logic is isolated and reusable.

- Returns `[]` immediately if ingredient is empty.
- Calls:
  - `https://www.themealdb.com/api/json/v1/1/filter.php?i=<ingredient>`
- Uses `encodeURIComponent` to safely place text in URL.
- Throws error on non-OK HTTP status.
- Parses JSON and returns `data.meals ?? []`.

### 3) Component State

- `meals`: list of fetched meals.
- `isLoading`: fetch status.
- `error`: friendly error message.

### 4) `useEffect` with `[ingredient]`

Runs every time ingredient changes.

- If ingredient is empty:
  - clear meals and error
  - ensure loading is false
- If ingredient exists:
  - set loading true
  - clear old error
  - call `fetchMealIdeas`
  - store results in `meals`
  - handle errors by setting `error`
  - stop loading in `finally`

### 5) `isCancelled` Safety Pattern

- Prevents setting state after unmount or quick ingredient changes.
- Avoids race-condition warnings and stale updates.

### 6) Render Logic

- No ingredient: shows "Select an item..."
- Loading: shows "Loading meals..."
- Error: shows error text.
- Empty result for valid ingredient: "No meal ideas found..."
- Success: maps meals to list items and displays `strMeal`.

---

## `app/week-7/item-list.tsx` Quick Explanation

- Receives `items` and `onItemSelect` from page.
- Supports 3 modes:
  - `Sort by Name`
  - `Sort by Category`
  - `Group by Category`
- Non-grouped modes show a flat sorted list.
- Group mode builds category sections and renders grouped items.
- Each `Item` gets `onSelect={() => onItemSelect(item)}`.

---

## `app/week-7/item.tsx` Quick Explanation

- Displays one shopping list item.
- Accepts `onSelect` prop.
- Entire `<li>` is clickable and calls `onSelect` when clicked.

---

## `app/week-7/new-item.tsx` Quick Explanation

- Controlled form for name, quantity, and category.
- Validates name length (minimum 2 characters).
- On submit:
  - calls parent `onAddItem` with cleaned form values
  - resets form state

---

## API Summary You Can Say to Your Professor

"When a user clicks a shopping item, I send the cleaned ingredient to the `MealIdeas` component. That component listens for ingredient changes with `useEffect`, calls TheMealDB API using `fetch`, and updates `meals`, `isLoading`, and `error` state. The UI then conditionally renders loading, error, no-results, or the meal list. My page component owns the main state and passes callbacks and props to child components."

---

## Quick 45-Second Presentation Script

"My Week 7 app is a React client page that combines local shopping-list state with external API data. The page component stores all items and the currently selected ingredient. Item clicks are sent up from `Item` to `ItemList` and then to page, where I clean the name to remove quantities and symbols. That cleaned value is passed into `MealIdeas`. In `MealIdeas`, `useEffect` runs every time the ingredient changes and calls TheMealDB `filter.php` endpoint. I handle loading, error, and empty results, then render meal names when data returns. So the app demonstrates parent-child communication, controlled forms, state lifting, and async data fetching."

