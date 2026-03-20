'use client';

import { Passage, UserAnswers } from '@/lib/types';
import QuestionCard from './QuestionCard';

interface QuestionsPanelProps {
  passage: Passage;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: number, answer: string) => void;
  showCorrectAnswers?: boolean;
  correctAnswers?: { [key: number]: boolean };
}

export default function QuestionsPanel({
  passage,
  userAnswers,
  onAnswerChange,
  showCorrectAnswers = false,
  correctAnswers = {},
}: QuestionsPanelProps) {
  const answeredCount = passage.questions.filter(
    (q) => userAnswers[q.id]
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Questions
          </h3>
          <div className="text-sm text-slate-600">
            {answeredCount} / {passage.questions.length} answered
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${passage.questions.length > 0 ? (answeredCount / passage.questions.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {passage.questions.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No questions for this passage
          </div>
        ) : (
          passage.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              userAnswer={userAnswers[question.id] || ''}
              onAnswerChange={onAnswerChange}
              isAnswered={!!userAnswers[question.id]}
              showCorrectAnswer={showCorrectAnswers}
              isCorrect={correctAnswers[question.id]}
            />
          ))
        )}
      </div>
    </div>
  );
}
