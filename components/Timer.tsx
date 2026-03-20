'use client'

import { playAlertSound } from '@/lib/audio-utils'
import { formatTime } from '@/lib/test-utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface TimerProps {
	initialSeconds: number
	onTimeUp?: () => void
	onEdit?: (newSeconds: number) => void
	isRunning?: boolean
	isEditable?: boolean
}

export default function Timer({
	initialSeconds,
	onTimeUp,
	onEdit,
	isRunning = false,
	isEditable = true,
}: TimerProps) {
	const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
	const [isActive, setIsActive] = useState(isRunning)
	const [isTimeUp, setIsTimeUp] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [editValue, setEditValue] = useState(Math.floor(initialSeconds / 60))
	const hasPlayedAlertRef = useRef(false)

	// Timer effect
	useEffect(() => {
		if (!isActive) return

		const interval = setInterval(() => {
			setRemainingSeconds(prev => {
				const newValue = prev - 1

				// Check if time is up
				if (newValue <= 0 && !isTimeUp) {
					setIsTimeUp(true)
					setIsActive(false)
					onTimeUp?.()

					// Play alert sound
					if (!hasPlayedAlertRef.current) {
						hasPlayedAlertRef.current = true
						playAlertSound().catch(() => {
							console.warn('Could not play alert sound')
						})
					}
				}

				return newValue
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [isActive, isTimeUp, onTimeUp])

	const handleToggleTimer = () => {
		if (!isTimeUp) {
			setIsActive(!isActive)
		}
	}

	const handleEditClick = () => {
		if (isEditable && !isActive) {
			setShowEditModal(true)
		}
	}

	const handleSaveEdit = () => {
		const newSeconds = editValue * 60
		setRemainingSeconds(newSeconds)
		setIsTimeUp(false)
		hasPlayedAlertRef.current = false
		onEdit?.(newSeconds)
		setShowEditModal(false)
	}

	const isTimeUpStatus = remainingSeconds <= 0
	const timerColor = isTimeUpStatus ? 'text-red-600' : 'text-slate-900'
	const timerBg = isTimeUpStatus ? 'bg-red-50' : 'bg-slate-50'

	return (
		<>
			{/* Timer Container */}
			<motion.div
				className={`flex flex-row items-center gap-2 ${timerBg} rounded-lg p-4 border border-slate-200`}
				animate={{
					borderColor: isTimeUpStatus ? '#fca5a5' : '#cbd5e1',
				}}
			>
				{/* <div className='text-sm font-medium text-slate-600'>Time Remaining</div> */}

				<motion.div
					className={`text-4xl font-bold font-mono ${timerColor} tracking-tight`}
					animate={{
						scale: isTimeUpStatus ? [1, 1.05, 1] : 1,
					}}
					transition={{
						duration: isTimeUpStatus ? 0.6 : 0,
						repeat: isTimeUpStatus ? Infinity : 0,
						repeatDelay: 0.4,
					}}
				>
					{formatTime(remainingSeconds)}
				</motion.div>

				<AnimatePresence>
					{isTimeUpStatus && (
						<motion.div
							className='text-sm font-semibold text-red-600'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
						>
							Time is over
						</motion.div>
					)}
				</AnimatePresence>

				{/* Control Buttons */}
				<div className='flex gap-2 mt-2'>
					{!isTimeUpStatus && (
						<button
							onClick={handleToggleTimer}
							className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
								isActive
									? 'bg-red-100 text-red-700 hover:bg-red-200'
									: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
							}`}
						>
							{isActive ? 'Pause' : 'Resume'}
						</button>
					)}

					{isEditable && !isActive && !isTimeUpStatus && (
						<button
							onClick={handleEditClick}
							className='px-4 py-2 rounded text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors'
						>
							Edit
						</button>
					)}
				</div>
			</motion.div>

			{/* Edit Modal */}
			<AnimatePresence>
				{showEditModal && (
					<motion.div
						className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className='bg-white rounded-lg p-6 w-full max-w-sm shadow-lg'
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
						>
							<h3 className='text-lg font-semibold mb-4'>Edit Time</h3>

							<div className='mb-4'>
								<label className='block text-sm font-medium text-slate-700 mb-2'>
									Minutes
								</label>
								<input
									type='number'
									min='1'
									max='180'
									value={editValue}
									onChange={e =>
										setEditValue(Math.max(1, parseInt(e.target.value) || 0))
									}
									className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
							</div>

							<div className='flex gap-2'>
								<button
									onClick={() => setShowEditModal(false)}
									className='flex-1 px-4 py-2 rounded text-sm font-medium bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors'
								>
									Cancel
								</button>
								<button
									onClick={handleSaveEdit}
									className='flex-1 px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors'
								>
									Save
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
