import { ShoppingItem } from "./types";

interface ItemProps {
  item: ShoppingItem;
  onSelect?: (item: ShoppingItem) => void;
}

export default function Item({ item, onSelect }: ItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect?.(item)}
        className="m-2 w-full max-w-sm rounded-lg border border-slate-700 bg-slate-900 p-3 text-left transition hover:border-blue-400"
      >
        <div className="text-lg font-semibold capitalize">{item.name}</div>
        <div className="text-sm text-slate-300">
          Buy {item.quantity} in {item.category}
        </div>
      </button>
    </li>
  );
}
