import Link from "next/link";

const weeks = [
  { href: "/week-2", label: "Week 2", cpu: "0.6%" },
  { href: "/week-3", label: "Week 3", cpu: "1.2%" },
  { href: "/week-4", label: "Week 4", cpu: "0.9%" },
  { href: "/week-5", label: "Week 5", cpu: "1.6%" },
  { href: "/week-6", label: "Week 6", cpu: "1.8%" },
  { href: "/week-7", label: "Week 7", cpu: "2.1%" },
  { href: "/week-8", label: "Week 8", cpu: "1.5%" },
  { href: "/week-10", label: "Week 10", cpu: "2.4%" },
];

const cpuWave = [
  20, 26, 30, 36, 42, 47, 52, 41, 34, 28, 23, 25, 32, 38, 44, 49, 43, 38, 34, 28, 24, 22, 27, 31, 37,
  42, 48, 46, 40, 35, 29, 24, 19, 22, 28, 34, 40, 45, 50, 56, 53, 47, 39, 32, 26, 23, 27, 31, 35, 39,
  44, 49, 45, 39, 34, 30, 26, 22, 25, 33, 41, 48, 55, 50, 42, 36, 30, 25, 21,
];

const netWave = [
  22, 30, 18, 35, 24, 40, 26, 18, 12, 20, 32, 46, 55, 38, 28, 17, 10, 15, 24, 30, 21, 14, 9, 18, 34, 47,
  30, 22, 15, 8, 14, 20, 26, 33, 28, 22,
];

export default function Home() {
  return (
    <main className="space-y-3 p-3 md:p-5">
      <section className="flex items-center justify-between rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-[11px] uppercase tracking-[0.16em]">
        <div className="flex items-center gap-2">
          <span className="rounded border border-slate-700 px-2 py-[2px]">cpu</span>
          <span className="rounded border border-slate-700 px-2 py-[2px]">menu</span>
        </div>
        <p className="font-semibold text-blue-400">CPRG 306 BASHTOP</p>
        <p className="text-slate-300">08:44:31 PM</p>
      </section>

      <section className="rounded-md border border-slate-700 bg-slate-900 p-3">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
          <span className="text-slate-300">cpu / uptime 18:39</span>
          <span className="text-blue-400">load avg: 0.91 0.82 0.69</span>
        </div>
        <div className="flex h-28 items-end gap-[2px] overflow-hidden rounded-sm border border-slate-700 bg-black/35 p-1">
          {cpuWave.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="w-[6px] rounded-sm bg-emerald-400/90 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-3">
          <div className="rounded-md border border-slate-700 bg-slate-900 p-3">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em]">Memory</h2>
            <div className="space-y-3 text-[12px]">
              <div>
                <div className="mb-1 flex justify-between text-slate-300">
                  <span>Used</span>
                  <span>5.75 GiB</span>
                </div>
                <div className="h-2 rounded-sm border border-slate-700 bg-black/35">
                  <div className="h-full w-[38%] rounded-sm bg-emerald-400/80" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-slate-300">
                  <span>Available</span>
                  <span>9.76 GiB</span>
                </div>
                <div className="h-2 rounded-sm border border-slate-700 bg-black/35">
                  <div className="h-full w-[63%] rounded-sm bg-cyan-300/80" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-slate-300">
                  <span>Cached</span>
                  <span>2.61 GiB</span>
                </div>
                <div className="h-2 rounded-sm border border-slate-700 bg-black/35">
                  <div className="h-full w-[22%] rounded-sm bg-fuchsia-300/80" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-slate-700 bg-slate-900 p-3">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em]">Net</h2>
            <div className="flex h-20 items-end gap-[2px] rounded-sm border border-slate-700 bg-black/35 p-1">
              {netWave.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className={`w-[5px] rounded-sm ${
                    index % 2 === 0 ? "bg-fuchsia-300/80" : "bg-cyan-300/80"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] uppercase tracking-[0.12em] text-slate-300">
              <span>down 1.07 KiBps</span>
              <span>up 54.2 MiB</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-slate-700 bg-slate-900 p-3 lg:col-span-6">
          <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-slate-300">
            <span>processes</span>
            <span>cpu responsive</span>
          </div>
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-3 border-b border-slate-700 pb-2 text-[11px] uppercase tracking-[0.14em] text-blue-400">
            <span>Program</span>
            <span>Threads</span>
            <span>CPU</span>
          </div>
          <div className="mt-2 space-y-2 text-sm">
            {weeks.map((week) => (
              <div key={week.href} className="grid grid-cols-[2fr_1fr_1fr] gap-x-3 border-b border-slate-700/60 pb-2">
                <Link href={week.href} className="truncate">
                  {week.label} assignment route
                </Link>
                <span className="text-slate-300">1 hyp</span>
                <span className="text-slate-300">{week.cpu}</span>
              </div>
            ))}
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-3 border-b border-slate-700/60 pb-2 text-slate-300">
              <span>next-dev (localhost)</span>
              <span>4 hyp</span>
              <span>3.3%</span>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-3 text-slate-300">
              <span>vercel deploy daemon</span>
              <span>2 hyp</span>
              <span>0.8%</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-slate-700 bg-slate-900 p-3 lg:col-span-3">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em]">Modules</h2>
          <div className="space-y-2 text-sm">
            {weeks.map((week, index) => (
              <Link
                key={week.href}
                href={week.href}
                className="flex items-center justify-between rounded border border-slate-700 bg-black/25 px-2 py-2"
              >
                <span>{week.label}</span>
                <span className={`text-xs ${index % 2 === 0 ? "text-blue-400" : "text-amber-300"}`}>
                  READY
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
