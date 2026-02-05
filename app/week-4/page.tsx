import Link from "next/link";
import NewItem from "./new-item";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
        ← Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">New Item</h1>
      <NewItem />
    </main>
  );
}
