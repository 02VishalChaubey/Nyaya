import React from 'react'
import { CheckSquare, Layers, AlertOctagon } from 'lucide-react'
import { article13Principles } from '../data/rights.js'

export default function Article13Section() {
  return (
    <section id="article-13" className="my-12 border-b border-border pb-10">
      <div className="max-w-3xl">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">Constitutional Shield • Article 13</span>

        <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
          What Happens if a Law Violates a Fundamental Right? (Article 13)
        </h2>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/75">
          If the Indian Parliament or a State Legislature passes a law that takes away or shortens a Fundamental Right, <strong>Article 13</strong> comes into action:
        </p>
      </div>

      {/* Article 13 Table */}
      <div className="mt-6 overflow-x-auto rounded-md border border-border">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-paper-dim text-[11px] font-semibold uppercase tracking-wide text-ink/60">
              <th className="py-3.5 px-4 font-semibold text-navy w-1/3">Situation / Doctrine</th>
              <th className="py-3.5 px-4 font-semibold text-navy w-2/3">Action / Consequence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-paper">
            {article13Principles.map((item, idx) => (
              <tr key={idx} className="hover:bg-paper-dim/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-navy align-top">
                  <div className="flex items-center gap-2">
                    {idx === 0 && <CheckSquare size={16} className="text-navy" />}
                    {idx === 1 && <Layers size={16} className="text-brass-dark" />}
                    {idx === 2 && <AlertOctagon size={16} className="text-oxblood" />}
                    <span className="text-xs sm:text-sm font-semibold text-navy">
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

      {/* Severability comparison */}
      <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-border">
        <div className="sm:pr-6">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-brass-dark">
            Severable Law (Partial Strike Down)
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
            If Section 66A of the IT Act violates free speech (<em>Shreya Singhal</em>), the Supreme Court declares only Section 66A void. The rest of the Information Technology Act continues to operate normally.
          </p>
        </div>

        <div className="sm:pl-6">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-oxblood-dark">
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
