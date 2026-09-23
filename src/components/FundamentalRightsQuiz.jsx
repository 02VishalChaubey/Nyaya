import React, { useState } from 'react'
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react'
import { useApi } from '../hooks/useApi.js'
import { fetchRightsQuiz } from '../api/client.js'
import { practiceQuestions as fallbackQuestions } from '../data/rights.js'

export default function FundamentalRightsQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [revealed, setRevealed] = useState({})

  const { data: questionsData } = useApi(
    fetchRightsQuiz,
    [],
    fallbackQuestions
  )

  const practiceQuestions = questionsData || fallbackQuestions

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
    <section id="practice-questions" className="my-12 rounded-2xl border border-navy/15 bg-paper p-6 sm:p-9 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600/10 text-emerald-700">
              <HelpCircle size={16} />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
              Exam &amp; Awareness Preparation
            </span>
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-navy sm:text-2xl">
            Practice Multiple-Choice Questions
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink/70">
            Test your understanding of Part III Articles, reasonable restrictions, and Supreme Court landmark cases.
          </p>
        </div>

        {totalAnswered > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-navy/15 bg-navy/5 px-3 py-1.5 text-xs font-semibold text-navy">
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

      <div className="mt-6 space-y-6">
        {practiceQuestions.map((q, idx) => {
          const isSubmitted = !!revealed[q.id]
          const selected = selectedAnswers[q.id]

          return (
            <div
              key={q.id}
              className="rounded-xl border border-border/80 bg-page/40 p-5 transition-all"
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-paper">
                  {idx + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-navy leading-relaxed">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
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
                        'border-rose-500 bg-rose-50 text-rose-900 line-through'
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
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`flex items-center justify-between rounded-lg border p-3 text-left text-xs transition-all ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrect && (
                        <CheckCircle size={15} className="shrink-0 text-emerald-600" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle size={15} className="shrink-0 text-rose-500" />
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
                    className="rounded-md bg-navy px-3.5 py-1.5 text-xs font-semibold text-paper shadow-2xs hover:bg-navy/90 transition-colors"
                  >
                    Check Answer
                  </button>
                </div>
              )}

              {/* Explanation */}
              {isSubmitted && (
                <div className="mt-3 rounded-lg border border-border/80 bg-paper p-3 text-xs leading-relaxed text-ink/75">
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
