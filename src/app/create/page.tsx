'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';

type Step = 1 | 2 | 3;

export default function CreateIdea() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <main className="pt-16">
          <IdeaFlow />
        </main>
      </div>
    </ProtectedRoute>
  );
}

function IdeaFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [userTopic, setUserTopic] = useState('');
  const [creativeAngle, setCreativeAngle] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [angleInput, setAngleInput] = useState('');
  const [capsule, setCapsule] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/interpret-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: topicInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to interpret topic');
      }

      const data = await response.json();
      setUserTopic(data.topic);
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!angleInput.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/interpret-angle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ angleInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to interpret angle');
      }

      const data = await response.json();
      setCreativeAngle(data.angleLabel);
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleStep3 = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-capsule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userTopic, creativeAngle }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate capsule');
      }

      const data = await response.json();
      setCapsule(data.capsule);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setUserTopic('');
    setCreativeAngle('');
    setTopicInput('');
    setAngleInput('');
    setCapsule('');
    setError('');
  };

  useEffect(() => {
    if (step === 3 && !capsule && userTopic && creativeAngle) {
      handleStep3();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, userTopic, creativeAngle]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-8 md:p-12">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-2">
                What do you want today's Idea to be about?
              </h2>
              <p className="text-amber-700">
                It can be anything: a project, a feeling, a random idea, a question, or just a word.
              </p>
            </div>

            <form onSubmit={handleStep1} className="space-y-4">
              <textarea
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Type your topic here..."
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition min-h-[120px] resize-none"
                required
              />

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !topicInput.trim()}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-2">
                Nice. How do you want this Idea to feel?
              </h2>
              <p className="text-amber-700 mb-6">
                Pick one, or type your own:
              </p>
            </div>

            <form onSubmit={handleStep2} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Mysterious', 'Scientific', 'Emotional', 'Funny', 'Philosophical', 'Random surprise'].map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setAngleInput(angle)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      angleInput === angle
                        ? 'border-amber-500 bg-amber-100 text-amber-900 font-semibold'
                        : 'border-amber-200 bg-white text-amber-700 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>

              <div>
                <input
                  type="text"
                  value={angleInput}
                  onChange={(e) => setAngleInput(e.target.value)}
                  placeholder="Or type your own angle..."
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 border border-amber-300 text-amber-900 rounded-lg hover:bg-amber-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !angleInput.trim()}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? 'Processing...' : 'Generate Idea'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4 animate-pulse">🔍</div>
                <p className="text-amber-700 text-lg">Crafting your Idea...</p>
              </div>
            ) : capsule ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-amber-900 mb-2">
                    Your Idea
                  </h2>
                  <p className="text-amber-700">
                    Topic: <span className="font-semibold">{userTopic}</span> • 
                    Angle: <span className="font-semibold">{creativeAngle}</span>
                  </p>
                </div>

                <div className="prose prose-amber max-w-none">
                  <MarkdownRenderer content={capsule} />
                </div>

                <div className="pt-6 border-t border-amber-200 flex gap-3">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="flex-1 px-4 py-3 border border-amber-300 text-amber-900 rounded-lg hover:bg-amber-50 transition"
                  >
                    Back to Dashboard
                  </button>
                  <button
                    onClick={handleStartOver}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                  >
                    Start a New Idea
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-amber-700">Something went wrong. Please try again.</p>
                <button
                  onClick={handleStartOver}
                  className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

