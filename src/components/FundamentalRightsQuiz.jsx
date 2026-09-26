import React, { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react'
import { practiceQuestions } from '../data/rights.js'

export default function FundamentalRightsQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [revealed, setRevealed] = useState({})

  const handleSelect = (questionId, optionIndex) => {
    if (revealed[questionId]) return
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }))
  }

  const handleCheck = (questionId) => {
    setRevealed((prev) => ({
      ...prev,
      [questionId]: true,
    }))
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setRevealed({})
  }

  const totalAnswered = Object.keys(revealed).length
  const correctCount = practiceQuestions.reduce((acc, q) => {
    if (revealed[q.id] && selectedAnswers[q.id] === q.correctAnswer) {
      return acc + 1
    }
    return acc
  }, 0)

  return (
    <section id="practice-questions" className="my-12 border-b border-border pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">Knowledge Check &amp; Practical Application</span>
          <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
            Practice Multiple-Choice Questions
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink/70">
            Test your understanding of Part III Articles, reasonable restrictions, and Supreme Court landmark cases.
          </p>
        </div>

        {totalAnswered > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-navy">
              <Award size={15} className="text-brass-dark" />
              Score: {correctCount} / {practiceQuestions.length}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-medium text-ink/60 hover:text-navy transition-colors"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 divide-y divide-border border-t border-border">
        {practiceQuestions.map((q, idx) => {
          const isSubmitted = !!revealed[q.id]
          const selected = selectedAnswers[q.id]

          return (
            <div key={q.id} className="py-6 first:pt-6">
              <div className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-paper">
                  {idx + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-navy leading-relaxed">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div
                role="group"
                aria-label={`Options for question ${idx + 1}`}
                className="mt-4 grid gap-2 sm:grid-cols-2"
              >
                {q.options.map((opt, oIdx) => {
                  const isSelected = selected === oIdx
                  const isCorrect = q.correctAnswer === oIdx

                  let buttonStyle =
                    'border-border/80 bg-paper text-ink/80 hover:bg-page hover:border-navy/40'

                  if (isSubmitted) {
                    if (isCorrect) {
                      buttonStyle =
                        'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                    } else if (isSelected && !isCorrect) {
                      buttonStyle =
                        'border-oxblood bg-oxblood-faint text-oxblood-dark line-through'
                    } else {
                      buttonStyle = 'border-border/50 bg-paper/50 text-ink/50'
                    }
                  } else if (isSelected) {
                    buttonStyle =
                      'border-navy bg-navy/5 text-navy font-semibold ring-1 ring-navy'
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={isSubmitted}
                      aria-pressed={isSelected}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`flex items-center justify-between min-h-[44px] rounded-lg border p-3 text-left text-xs transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrect && (
                        <CheckCircle size={15} className="shrink-0 text-emerald-600" aria-hidden="true" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle size={15} className="shrink-0 text-oxblood" aria-hidden="true" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Check Answer Action */}
              {!isSubmitted && selected !== undefined && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleCheck(q.id)}
                    className="min-h-[40px] rounded-md bg-navy px-4 py-2 text-xs font-semibold text-paper shadow-2xs hover:bg-navy/90 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass"
                  >
                    Check Answer
                  </button>
                </div>
              )}

              {/* Explanation */}
              {isSubmitted && (
                <div role="region" aria-live="polite" className="mt-3 border-l-2 border-border pl-3 text-xs leading-relaxed text-ink/75">
                  <span className="font-semibold text-navy">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
