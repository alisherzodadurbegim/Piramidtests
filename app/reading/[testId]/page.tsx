'use client'

import ResultsPage from '@/components/ResultsPage'
import TestInterface from '@/components/TestInterface'
import { Button } from '@/components/ui/button'
import { getTestById } from '@/lib/test-utils'
import { UserAnswers } from '@/lib/types'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

interface TestPageProps {
	params: Promise<{ testId: string }>
}

export default function TestPage({ params }: TestPageProps) {
	const { testId } = use(params) // <-- shunda Promise unwrap bo‘ladi

	const [test, setTest] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [testCompleted, setTestCompleted] = useState(false)
	const [finalAnswers, setFinalAnswers] = useState<UserAnswers>({})

	useEffect(() => {
		const loadTest = async () => {
			try {
				const loadedTest = await getTestById(testId)
				if (!loadedTest) {
					setError('Test not found')
				} else {
					setTest(loadedTest)
				}
			} catch (err) {
				setError('Failed to load test')
			} finally {
				setLoading(false)
			}
		}
		loadTest()
	}, [testId])

	const handleTestComplete = (answers: UserAnswers) => {
		setFinalAnswers(answers)
		setTestCompleted(true)
	}

	const handleRetakeTest = () => {
		setFinalAnswers({})
		setTestCompleted(false)
	}

	if (loading) return <p>Loading...</p>
	if (error || !test)
		return (
			<div className='text-center mt-10'>
				<h1>{error || 'Test not found'}</h1>
				<Link href='/reading'>
					<Button>Back to Tests</Button>
				</Link>
			</div>
		)

	if (testCompleted)
		return (
			<ResultsPage
				test={test}
				userAnswers={finalAnswers}
				timeRemaining={0}
				onRetake={handleRetakeTest}
			/>
		)

	return <TestInterface test={test} onTestComplete={handleTestComplete} />
}
