// Default timer settings (in minutes)
export const DEFAULT_TIME_MINUTES = 20
export const DEFAULT_TEST_DURATION = DEFAULT_TIME_MINUTES * 60 // 20 minutes in seconds

// Available tests metadata
export const AVAILABLE_TESTS = [
	{
		id: 'test-1',
		title: 'Reading Test 1',
		passages: 3,
		questions: 12,
		duration: 20,
		difficulty: 'Medium',
	},
	{
		id: 'test-2',
		title: 'Reading Test 2',
		passages: 3,
		questions: 12,
		duration: 20,
		difficulty: 'Medium',
	},
	{
		id: 'test-3',
		title: 'Reading Test 3',
		passages: 3,
		questions: 40,
		duration: 20,
		difficulty: 'Medium',
	},
]

// UI Constants
export const PASSAGE_PADDING = 'p-6'
export const QUESTIONS_PADDING = 'p-6'
export const BORDER_RADIUS = 'rounded-lg'
export const CARD_SHADOW = 'shadow-sm'

// Color scheme (neutral and minimal)
export const COLORS = {
	primary: '#000000',
	secondary: '#666666',
	background: '#ffffff',
	border: '#e5e5e5',
	success: '#10b981',
	danger: '#ef4444',
	warning: '#f59e0b',
	text: {
		primary: '#1f2937',
		secondary: '#6b7280',
	},
}

// Test sections
export const EXAM_SECTIONS = [
	{ id: 'reading', title: 'Reading', icon: '📖' },
	{ id: 'listening', title: 'Listening', icon: '🎧' },
	{ id: 'writing', title: 'Writing', icon: '✏️' },
	{ id: 'speaking', title: 'Speaking', icon: '🎤' },
]

// Number of tests available
export const TOTAL_TESTS = 8

// Debounce delay for timer (ms)
export const TIMER_UPDATE_INTERVAL = 1000 // Update every second

// Local storage keys
export const STORAGE_KEYS = {
	TEST_STATE: 'ielts_test_state',
	USER_ANSWERS: 'ielts_user_answers',
	TEST_SETTINGS: 'ielts_test_settings',
}

// Audio settings
export const AUDIO_SETTINGS = {
	ALERT_SOUND_DURATION: 1000, // 1 second
}
