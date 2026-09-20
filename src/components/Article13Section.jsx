import React from 'react'
import { ShieldX, CheckSquare, Layers, AlertOctagon, HelpCircle } from 'lucide-react'
import { article13Principles } from '../data/rights.js'

export default function Article13Section() {
  return (
    <section id="article-13" className="my-12 rounded-2xl border border-border/80 bg-paper p-6 sm:p-9 shadow-xs">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-500/10 text-rose-700">
            <ShieldX size={16} />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
            Constitutional Shield • Article 13
          </span>
        </div>

        <h2 className="mt-2 text-xl font-bold tracking-tight text-navy sm:text-2xl">
          What Happens if a Law Violates a Fundamental Right? (Article 13)
        </h2>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/75">
          If the Indian Parliament or a State Legislature passes a law that takes away or shortens a Fundamental Right, <strong>Article 13</strong> comes into action:
        </p>
      </div>

      {/* Article 13 Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-border/80 bg-page/30">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border/80 bg-page text-[11px] font-bold uppercase tracking-wider text-ink/60">
              <th className="py-3.5 px-4 font-semibold text-navy w-1/3">Situation / Doctrine</th>
              <th className="py-3.5 px-4 font-semibold text-navy w-2/3">Action / Consequence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-paper">
            {article13Principles.map((item, idx) => (
              <tr key={idx} className="hover:bg-page/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-navy align-top">
                  <div className="flex items-center gap-2">
                    {idx === 0 && <CheckSquare size={16} className="text-navy" />}
                    {idx === 1 && <Layers size={16} className="text-amber-600" />}
                    {idx === 2 && <AlertOctagon size={16} className="text-rose-600" />}
                    <span className="text-xs sm:text-sm font-bold text-navy">
                      {item.situation}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 leading-relaxed text-ink/80 align-top">
                  <p className="font-medium text-ink/90 text-xs sm:text-sm">
                    {item.actionConsequence}
                  </p>
                  {item.explanation && (
                    <p className="mt-1 text-[11px] leading-relaxed text-ink/65">
                      {item.explanation}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual illustration of Severability */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Severable Law (Partial Strike Down)
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
            If Section 66A of the IT Act violates free speech (<em>Shreya Singhal</em>), the Supreme Court declares only Section 66A void. The rest of the Information Technology Act continues to operate normally.
          </p>
        </div>

        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
            Inseverable Law (Complete Void)
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
            If an entire legislative scheme is built upon an unconstitutional purpose and removing the invalid sections leaves the statute truncated or unworkable, the entire Act is declared null and void.
          </p>
        </div>
      </div>
    </section>
  )
}
