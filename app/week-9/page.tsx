import Link from "next/link";

export default function Week9Page() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Link href="/" className="mb-4 inline-block text-blue-400 hover:underline">
        ← Home
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Week 9: Exam + Project Topic</h1>
      <p className="mb-6 max-w-3xl text-slate-300">
        Week 9 focuses on midterm preparation and Project Phase 1 planning. Use the two modules below
        to complete what is required for this week.
      </p>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="mb-2 text-xl font-bold">Midterm Exam Details</h2>
          <p className="mb-4 text-sm text-slate-300">
            Review the exam format, covered topics (Weeks 1-7), and practice question style.
          </p>
          <Link
            href="/week-9/exam"
            className="inline-block rounded bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
          >
            Open Exam Guide
          </Link>
        </article>

        <article className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="mb-2 text-xl font-bold">Project Phase 1</h2>
          <p className="mb-4 text-sm text-slate-300">
            Define your project scope, technology level, sprint plan, and submission details.
          </p>
          <Link
            href="/week-9/project"
            className="inline-block rounded bg-emerald-600 px-4 py-2 font-semibold hover:bg-emerald-500"
          >
            Open Project Checklist
          </Link>
        </article>
      </section>

      <section className="mt-6 max-w-4xl rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h3 className="mb-2 text-lg font-bold">Week 9 Completion Checklist</h3>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>- Read exam details and practice from a sample repository.</li>
          <li>- Choose individual or group format for your project.</li>
          <li>- Choose target technology level (Starter, Intermediate, Advanced, or Expert).</li>
          <li>- Finalize project idea and architecture.</li>
          <li>- Prepare the email submission with all required details.</li>
        </ul>
      </section>
    </main>
  );
}
