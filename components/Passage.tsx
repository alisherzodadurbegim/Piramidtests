'use client'

import { Passage as PassageType } from '@/lib/types'

interface PassageProps {
	passage: PassageType
	passageIndex: number
	totalPassages: number
}

export default function Passage({
	passage,
	passageIndex,
	totalPassages,
}: PassageProps) {
	return (
		<div className='flex flex-col h-full'>
			{/* Sticky Header */}
			<div className='sticky top-0 bg-white border-b border-slate-200 px-6 py-4 z-10 shadow-sm'>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold text-slate-900'>
						{passage?.title ?? 'Untitled Passage'}
					</h2>
					<div className='text-sm text-slate-600'>
						{passageIndex + 1} of {totalPassages}
					</div>
				</div>
			</div>

			{/* Passage Content */}
			<div className='flex-1 overflow-y-auto px-6 py-6'>
				<div className='prose prose-sm max-w-none'>
					<div className='text-lg leading-relaxed text-slate-900 whitespace-pre-wrap'>
						{passage?.content ?? 'No content available.'}
					</div>
				</div>
			</div>
		</div>
	)
}
