import Link from "next/link";

export default function Week9ExamPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Link href="/week-9" className="mb-4 inline-block text-blue-400 hover:underline">
        ← Week 9
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Week 9: Midterm Exam Details</h1>
      <p className="mb-6 max-w-3xl text-slate-300">
        This guide captures the midterm expectations shared in Week 9 so you can prep with a clear
        checklist.
      </p>

      <section className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">Format</h2>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>- Online exam (D2L quiz format)</li>
          <li>- Mostly multiple-choice plus code-reading snippets</li>
          <li>- Covers Weeks 1-7 concepts</li>
          <li>- Focuses on understanding and interpretation over memorization</li>
        </ul>
      </section>

      <section className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">Key Topic Areas</h2>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>- JavaScript fundamentals and ES6+ features</li>
          <li>- Functional array methods and immutable patterns</li>
          <li>- React components, props, state, and event handling</li>
          <li>- Controlled forms and component composition</li>
          <li>- Next.js routing model and client/server boundaries</li>
          <li>- Debugging and identifying code behavior from snippets</li>
        </ul>
      </section>

      <section className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">How To Prepare</h2>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>- Rebuild at least one assignment without copy/paste.</li>
          <li>- Practice explaining what each component and hook is doing.</li>
          <li>- Work through code examples and predict output before running.</li>
          <li>- Review instructor-provided examples and past week exercises.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">Reference Link</h2>
        <a
          href="https://www.solaakinbode.com/week-9/exam"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline"
        >
          Open official Week 9 midterm details
        </a>
      </section>
    </main>
  );
}
