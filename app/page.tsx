import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export const metadata = {
	title: 'IELTS Reading Practice',
	description: 'Practice IELTS Reading tests online with interactive interface',
}

const sections = [
	{
		id: 'reading',
		title: 'Reading',
		description: 'Practice reading comprehension with 8 full tests',
		icon: '📖',
		tests: 8,
		href: '/reading',
	},
	{
		id: 'listening',
		title: 'Listening',
		description: 'Improve your listening skills',
		icon: '🎧',
		tests: 0,
		href: '#',
		disabled: true,
	},
	{
		id: 'writing',
		title: 'Writing',
		description: 'Develop your writing abilities',
		icon: '✍️',
		tests: 0,
		href: '#',
		disabled: true,
	},
	{
		id: 'speaking',
		title: 'Speaking',
		description: 'Practice speaking skills',
		icon: '🗣️',
		tests: 0,
		href: '#',
		disabled: true,
	},
]

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			{/* Header */}
			<div className='sticky top-0 z-50 backdrop-blur-md bg-white/70 fixed border-b border-white/20 shadow-sm'>
				<div className='max-w-6xl mx-auto px-4 py-4'>
					<h1 className='text-3xl font-bold text-slate-800 mb-2'>
						IELTS Practice Hub
					</h1>
					<p className='text-xl text-slate-500'>
						Master the IELTS exam with comprehensive practice materials
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-6xl mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{sections.map(section => (
						<Card
							key={section.id}
							className={section.disabled ? 'opacity-60' : ''}
						>
							<CardHeader>
								<div className='flex items-start justify-between'>
									<div>
										<CardTitle className='text-2xl'>{section.title}</CardTitle>
										<CardDescription>{section.description}</CardDescription>
									</div>
									<span className='text-4xl'>{section.icon}</span>
								</div>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<p className='text-sm text-slate-600'>
										{section.tests} {section.tests === 1 ? 'test' : 'tests'}{' '}
										available
									</p>
									{!section.disabled ? (
										<Link href={section.href}>
											<Button className='w-full bg-blue-600 hover:bg-blue-700'>
												Start Practice
											</Button>
										</Link>
									) : (
										<Button disabled className='w-full'>
											Coming Soon
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Features Section */}
				<div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<Card>
						<CardHeader>
							<CardTitle>Interactive Interface</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-slate-600'>
								Desktop and mobile-friendly interface with side-by-side passage
								and questions layout
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Timer Management</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-slate-600'>
								Built-in countdown timer with alerts and adjustable duration for
								each test
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Instant Feedback</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-slate-600'>
								Get detailed results and review your answers after completing
								each test
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
