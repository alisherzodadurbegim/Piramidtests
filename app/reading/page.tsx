import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AVAILABLE_TESTS } from '@/lib/constants';

export const metadata = {
  title: 'IELTS Reading Tests',
  description: 'Choose a reading test to practice',
};

export default function ReadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Reading Tests</h1>
          <p className="text-xl text-slate-600">
            Select a test to begin practicing
          </p>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_TESTS.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>
                      {test.passages} passages • {test.questions} questions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-slate-600">
                    <p className="mb-2">Duration: {test.duration} minutes</p>
                    <p className="text-xs text-slate-500">
                      {test.difficulty} difficulty
                    </p>
                  </div>
                  <Link href={`/reading/${test.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Start Test
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Test Information</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• Each test contains 3 passages with multiple question types</li>
            <li>• Question types include: Multiple Choice, True/False/Not Given, Fill-in-the-Blank, Matching Headings</li>
            <li>• Default time: 20 minutes (adjustable before starting)</li>
            <li>• Your answers are saved as you progress through the test</li>
            <li>• Review detailed results and correct answers after completion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
