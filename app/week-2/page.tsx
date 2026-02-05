import Link from "next/link";
import StudentInfo from "./student-info";

export default function Page() {
  return (
    <main className="p-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">Week-3</h1>
      <StudentInfo />
    </main>
  );
}
