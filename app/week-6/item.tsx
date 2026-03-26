import { ShoppingItem } from "./types";

interface ItemProps {
  item: ShoppingItem;
}

export default function Item({ item }: ItemProps) {
  return (
    <li className="m-2 max-w-sm rounded-lg border border-slate-700 bg-slate-900 p-3">
      <div className="text-lg font-semibold capitalize">{item.name}</div>
      <div className="text-sm text-slate-300">
        Buy {item.quantity} in {item.category}
      </div>
    </li>
  );
}
