'use client';

import { UserAnswers } from '@/lib/types';

interface PassageNavigatorProps {
  currentIndex: number;
  totalPassages: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  userAnswers: UserAnswers;
  allQuestionsIds: number[];
}

export default function PassageNavigator({
  currentIndex,
  totalPassages,
  onPreviousClick,
  onNextClick,
  userAnswers,
  allQuestionsIds,
}: PassageNavigatorProps) {
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < totalPassages - 1;

  // Get answered status for each passage
  const getPassageAnswerStatus = (passageIndex: number) => {
    // This would need to be calculated based on question ranges
    // For now, return a simple count
    return '?';
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onPreviousClick}
        disabled={!canGoBack}
        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
          canGoBack
            ? 'bg-slate-200 text-slate-900 hover:bg-slate-300 cursor-pointer'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        Previous Passage
      </button>
      
      <div className="flex gap-1">
        {Array.from({ length: totalPassages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx < currentIndex) {
                for (let i = 0; i < currentIndex - idx; i++) {
                  onPreviousClick();
                }
              } else if (idx > currentIndex) {
                for (let i = 0; i < idx - currentIndex; i++) {
                  onNextClick();
                }
              }
            }}
            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
              idx === currentIndex
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <button
        onClick={onNextClick}
        disabled={!canGoForward}
        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
          canGoForward
            ? 'bg-slate-200 text-slate-900 hover:bg-slate-300 cursor-pointer'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        Next Passage
      </button>
    </div>
  );
}
