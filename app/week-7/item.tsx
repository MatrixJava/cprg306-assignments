interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li className="mb-2">
      <button
        type="button"
        onClick={onSelect}
        className="w-full rounded border p-2 text-left hover:bg-gray-50"
      >
        <div className="font-semibold">{name}</div>
        <div className="text-sm">Buy {quantity} in {category}</div>
      </button>
    </li>
  );
}
