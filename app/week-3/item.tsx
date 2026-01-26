interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="p-2 m-4 bg-slate-900 max-w-sm">
      <div className="text-xl font-bold">{name}</div>
      <div className="text-sm">Buy {quantity} in {category}</div>
    </li>
  );
}
