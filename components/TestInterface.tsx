'use client'

import { DEFAULT_TIME_MINUTES } from '@/lib/constants'
import { ReadingTest, UserAnswers } from '@/lib/types'
import { useEffect, useState } from 'react'
import Passage from './Passage'
import PassageNavigator from './PassageNavigator'
import QuestionsPanel from './QuestionsPanel'
import ResizablePanels from './ResizablePanels'
import Timer from './Timer'

interface TestInterfaceProps {
	test: ReadingTest
	onTestComplete?: (answers: UserAnswers, timeRemaining: number) => void
}

export default function TestInterface({
	test,
	onTestComplete,
}: TestInterfaceProps) {
	const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
	const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
	const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME_MINUTES * 60)
	const [isTimeEditable, setIsTimeEditable] = useState(true)
	const [isMobile, setIsMobile] = useState(false)
	const [showQuestions, setShowQuestions] = useState(false)

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768)
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const currentPassage = test.passages[currentPassageIndex]

	const handleAnswerChange = (questionId: number, answer: string) => {
		setUserAnswers(prev => ({
			...prev,
			[questionId]: answer,
		}))
	}

	const handleTimeChange = (newTime: number) => {
		setTimeRemaining(newTime)
		setIsTimeEditable(false)
	}

	const handleTimeExpired = () => {
		onTestComplete?.(userAnswers, 0)
	}

	const handleSubmitTest = () => {
		onTestComplete?.(userAnswers, timeRemaining)
	}

	const allQuestionIds = test.passages.flatMap(p => p.questions.map(q => q.id))

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			{/* HEADER */}
			<div className='sticky top-0 z-50 bg-white border-b shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 py-2 flex justify-between'>
					<h1 className='text-lg font-semibold'>{currentPassage?.title}</h1>

					<Timer
						initialSeconds={timeRemaining}
						isEditable={isTimeEditable}
						onTimeChange={handleTimeChange}
						onTimeExpired={handleTimeExpired}
					/>
				</div>
			</div>

			{/* MAIN */}
			<div className='max-w-7xl mx-auto p-4'>
				{isMobile ? (
					// 📱 MOBILE
					<div className='space-y-4'>
						<div className='flex gap-2 border-b'>
							<button onClick={() => setShowQuestions(false)}>Passage</button>
							<button onClick={() => setShowQuestions(true)}>Questions</button>
						</div>

						{!showQuestions ? (
							<Passage
								passage={currentPassage}
								passageIndex={currentPassageIndex}
								totalPassages={test.passages.length}
							/>
						) : (
							<QuestionsPanel
								passage={currentPassage}
								userAnswers={userAnswers}
								onAnswerChange={handleAnswerChange}
							/>
						)}

						<PassageNavigator
							currentIndex={currentPassageIndex}
							totalPassages={test.passages.length}
							onPreviousClick={() =>
								setCurrentPassageIndex(prev => Math.max(0, prev - 1))
							}
							onNextClick={() =>
								setCurrentPassageIndex(prev =>
									Math.min(test.passages.length - 1, prev + 1),
								)
							}
							userAnswers={userAnswers}
							allQuestionsIds={allQuestionIds}
						/>
					</div>
				) : (
					// 💻 DESKTOP (FAKAT RESIZABLE)
					<div className='h-[calc(100vh-160px)]'>
						<ResizablePanels
							left={
								<Passage
									passage={currentPassage}
									passageIndex={currentPassageIndex}
									totalPassages={test.passages.length}
								/>
							}
							right={
								<QuestionsPanel
									passage={currentPassage}
									userAnswers={userAnswers}
									onAnswerChange={handleAnswerChange}
								/>
							}
						/>
					</div>
				)}
			</div>

			{/* FOOTER */}
			<div className='sticky bottom-0 bg-white border-t p-4'>
				<div className='max-w-7xl mx-auto flex justify-between'>
					<PassageNavigator
						currentIndex={currentPassageIndex}
						totalPassages={test.passages.length}
						onPreviousClick={() =>
							setCurrentPassageIndex(prev => Math.max(0, prev - 1))
						}
						onNextClick={() =>
							setCurrentPassageIndex(prev =>
								Math.min(test.passages.length - 1, prev + 1),
							)
						}
						userAnswers={userAnswers}
						allQuestionsIds={allQuestionIds}
					/>

					<button
						onClick={handleSubmitTest}
						className='px-2 py-1 bg-blue-600 text-white rounded-lg'
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}
