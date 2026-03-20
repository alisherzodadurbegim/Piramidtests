'use client'

import { Question } from '@/lib/types'
import { motion } from 'framer-motion'

interface QuestionCardProps {
	question: Question
	userAnswer: string | string[]
	onAnswerChange: (questionId: number, answer: string | string[]) => void
	isAnswered: boolean
	showCorrectAnswer?: boolean
	isCorrect?: boolean
}

export default function QuestionCard({
	question,
	userAnswer,
	onAnswerChange,
	isAnswered,
	showCorrectAnswer = false,
	isCorrect = false,
}: QuestionCardProps) {
	const renderQuestionContent = () => {
		switch (question.type) {
			case 'multiple':
				return (
					<div className='space-y-2 mt-4'>
						{question.options.map((option, idx) => (
							<label
								key={idx}
								className='flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-blue-50'
								style={{
									borderColor: userAnswer === option ? '#3b82f6' : '#e5e7eb',
									backgroundColor:
										userAnswer === option ? '#eff6ff' : 'transparent',
								}}
							>
								<input
									type='radio'
									name={`q${question.id}`}
									value={option}
									checked={userAnswer === option}
									onChange={e => onAnswerChange(question.id, e.target.value)}
									className='w-4 h-4 cursor-pointer'
								/>
								<div className='flex flex-row gap-1'>
									<div className='font-semibold text-slate-800'>{option}</div>
									<div className='font-semibold text-slate-600'>
										{question.optionsText?.[idx] || ''}
									</div>
								</div>
							</label>
						))}
					</div>
				)

			case 'true-false-not-given':
				return (
					<div className='space-y-2 mt-4'>
						{question.options.map(option => (
							<label
								key={option}
								className='flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-blue-50'
								style={{
									borderColor: userAnswer === option ? '#3b82f6' : '#e5e7eb',
									backgroundColor:
										userAnswer === option ? '#eff6ff' : 'transparent',
								}}
							>
								<input
									type='radio'
									name={`q${question.id}`}
									value={option}
									checked={userAnswer === option}
									onChange={e => onAnswerChange(question.id, e.target.value)}
									className='w-4 h-4 cursor-pointer'
								/>
								<span className='font-semibold text-slate-900'>{option}</span>
							</label>
						))}
					</div>
				)

			case 'fill-blank':
				return (
					<div className='mt-4'>
						<input
							type='text'
							value={userAnswer}
							onChange={e => onAnswerChange(question.id, e.target.value)}
							placeholder='Type your answer here...'
							className='w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
						{showCorrectAnswer && (
							<div className='mt-2 p-2 rounded bg-slate-50 text-sm text-slate-700'>
								<strong>Correct answer:</strong> {question.answer}
							</div>
						)}
					</div>
				)

			case 'matching-heading':
				return (
					<div className='space-y-2 mt-4'>
						<select
							value={userAnswer}
							onChange={e => onAnswerChange(question.id, e.target.value)}
							className='w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value=''>Select a heading...</option>
							{question.options.map(option => (
								<option key={option} value={option.split('.')[0].trim()}>
									{option}
								</option>
							))}
						</select>
					</div>
				)
			case 'multiple-multi':
				return question.options.map((opt, i) => {
					const current = (userAnswer as string[]) || []

					const checked = current.includes(opt)

					return (
						<label key={opt} className='flex gap-2 cursor-pointer'>
							<input
								type='checkbox'
								checked={checked}
								onChange={() => {
									let updated = [...current]

									if (checked) {
										updated = updated.filter(a => a !== opt)
									} else {
										updated.push(opt)
									}

									onAnswerChange(question.id, updated)
								}}
							/>
							{opt}. {question.optionsText[i]}
						</label>
					)
				})

			default:
				return null
		}
	}

	const answerStatusClass = showCorrectAnswer
		? isCorrect
			? 'bg-green-50 border-green-200'
			: 'bg-red-50 border-red-200'
		: isAnswered
			? 'bg-blue-50 border-blue-200'
			: 'bg-white border-slate-200'

	return (
		<motion.div
			className={`p-4 rounded-lg border-2 ${answerStatusClass} transition-all`}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className='flex items-start justify-between gap-4'>
				<div className='flex-1'>
					<div className='flex items-center gap-2 mb-2'>
						<span className='text-sm font-semibold text-slate-600'>
							Q{question.id}
						</span>
						{showCorrectAnswer && (
							<span
								className={`text-xs font-semibold px-2 py-1 rounded ${
									isCorrect
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
								}`}
							>
								{isCorrect ? 'Correct' : 'Incorrect'}
							</span>
						)}
						{!showCorrectAnswer && isAnswered && (
							<span className='text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800'>
								Answered
							</span>
						)}
					</div>
					<p className='text-slate-900 font-medium mb-4'>{question.question}</p>
					{renderQuestionContent()}
				</div>
			</div>
		</motion.div>
	)
}
