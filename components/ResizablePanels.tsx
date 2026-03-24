'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ResizablePanels({
	left,
	right,
}: {
	left: React.ReactNode
	right: React.ReactNode
}) {
	const [leftWidth, setLeftWidth] = useState(50)
	const [collapsed, setCollapsed] = useState<'left' | 'right' | null>(null)
	const isDragging = useRef(false)

	const handleMouseDown = () => {
		isDragging.current = true
		document.body.style.cursor = 'col-resize'
		document.body.style.userSelect = 'none'
	}

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging.current) return

			const newWidth = (e.clientX / window.innerWidth) * 100

			if (newWidth > 20 && newWidth < 80) {
				setLeftWidth(newWidth)
				setCollapsed(null)
			}
		}

		const handleMouseUp = () => {
			isDragging.current = false
			document.body.style.cursor = ''
			document.body.style.userSelect = ''
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
		}
	}, [])

	// collapse logika
	const toggleLeft = () => {
		if (collapsed === 'left') {
			setLeftWidth(50)
			setCollapsed(null)
		} else {
			setLeftWidth(0)
			setCollapsed('left')
		}
	}

	const toggleRight = () => {
		if (collapsed === 'right') {
			setLeftWidth(50)
			setCollapsed(null)
		} else {
			setLeftWidth(100)
			setCollapsed('right')
		}
	}

	return (
		<div className='flex w-full h-full relative'>
			{/* LEFT */}
			<div
				style={{ width: `${leftWidth}%` }}
				className='h-full overflow-auto transition-all'
			>
				{left}
			</div>

			{/* DIVIDER */}
			<div
				onMouseDown={handleMouseDown}
				className='relative w-2 bg-slate-300 hover:bg-blue-500 cursor-col-resize transition flex items-center justify-center'
			>
				{/* STRELKALAR */}
				<div className='absolute flex flex-col gap-1 bg-white shadow rounded p-1'>
					<button
						onClick={toggleLeft}
						className='hover:bg-slate-100 p-1 rounded'
					>
						<ArrowLeft size={16} />
					</button>
					<button
						onClick={toggleRight}
						className='hover:bg-slate-100 p-1 rounded'
					>
						<ArrowRight size={16} />
					</button>
				</div>
			</div>

			{/* RIGHT */}
			<div
				style={{ width: `${100 - leftWidth}%` }}
				className='h-full overflow-auto transition-all'
			>
				{right}
			</div>
		</div>
	)
}
