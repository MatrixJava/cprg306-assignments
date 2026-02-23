import Link from "next/link";

const emailTemplate = `Subject: CPRG 306 Project Phase 1 Submission

Name(s):
Student ID(s):
Project Title:

Team Type:
- Individual / Group (2-3 members)

Problem Statement:
- What real problem are you solving?

Proposed Solution:
- Main idea and target users

Technology Level:
- Starter / Intermediate / Advanced / Expert

Planned Stack:
- Frontend:
- Backend / APIs:
- Data / Auth:

Sprint Plan (weekly):
- Week 10:
- Week 11:
- Week 12:
- Week 13:

GitHub Repo Link:
Deployment Target:
`;

export default function Week9ProjectPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Link href="/week-9" className="mb-4 inline-block text-blue-400 hover:underline">
        ← Week 9
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Week 9: Project Phase 1</h1>
      <p className="mb-6 max-w-3xl text-slate-300">
        Use this page to prepare the required project planning submission for Week 9.
      </p>

      <section className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">Phase 1 Requirements</h2>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>- Choose project mode: individual or group (2-3 members).</li>
          <li>- Define a concrete problem and a practical software solution.</li>
          <li>- Select your target difficulty level (Starter to Expert).</li>
          <li>- Propose your stack and core architecture plan.</li>
          <li>- Submit a week-by-week sprint plan and milestones.</li>
        </ul>
      </section>

      <section className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">Technology Levels</h2>
        <div className="overflow-x-auto text-sm">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-left text-slate-300">
                <th className="py-2 pr-4">Level</th>
                <th className="py-2 pr-4">Expectation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700/60">
                <td className="py-2 pr-4 font-semibold">Starter</td>
                <td className="py-2 pr-4 text-slate-300">Single-page app, local state, simple UI flow.</td>
              </tr>
              <tr className="border-b border-slate-700/60">
                <td className="py-2 pr-4 font-semibold">Intermediate</td>
                <td className="py-2 pr-4 text-slate-300">Multiple routes, reusable components, API usage.</td>
              </tr>
              <tr className="border-b border-slate-700/60">
                <td className="py-2 pr-4 font-semibold">Advanced</td>
                <td className="py-2 pr-4 text-slate-300">Authentication, database persistence, role-aware UX.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Expert</td>
                <td className="py-2 pr-4 text-slate-300">Production-ready architecture, testing, CI/CD quality.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">Submission Template (Copy/Paste)</h2>
        <pre className="overflow-x-auto rounded border border-slate-700 bg-black/40 p-4 text-xs text-slate-200">
          <code>{emailTemplate}</code>
        </pre>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-2 text-xl font-bold">Reference Link</h2>
        <a
          href="https://www.solaakinbode.com/week-9/project"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline"
        >
          Open official Week 9 project details
        </a>
      </section>
    </main>
  );
}
