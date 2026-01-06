'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';

export default function Dashboard() {
  const router = useRouter();
  const [instructionsExpanded, setInstructionsExpanded] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-amber-900 mb-4">
                Your Ideas
              </h1>
              <p className="text-amber-700 text-lg">
                Explore your collection of creative insights and curiosities
              </p>
            </div>

            {/* Create New Idea CTA */}
            <div className="mb-12">
              <button
                onClick={() => router.push('/create')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
              >
                Create New Idea
              </button>
            </div>

            {/* Instructions Section */}
            <div className="mb-6">
              <div className="bg-white rounded-xl border border-amber-200 shadow-lg overflow-hidden">
                <button
                  onClick={() => setInstructionsExpanded(!instructionsExpanded)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-amber-50 transition-colors"
                >
                  <h2 className="text-2xl font-bold text-amber-900">
                    Instructions
                  </h2>
                  <svg
                    className={`w-6 h-6 text-amber-700 transition-transform ${
                      instructionsExpanded ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {instructionsExpanded && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="prose prose-amber max-w-none space-y-6 text-amber-900">
                      <p className="text-lg leading-relaxed">
                        Divergent Distillery is a creativity app designed to spark your curiosity and inspire new ways of thinking. 
                        We blend your interests with fascinating real-world phenomena to create unique insights called "Ideas."
                      </p>

                      <h3 className="text-2xl font-bold text-amber-800 mt-8 mb-4">
                        How It Works
                      </h3>
                      <p className="leading-relaxed mb-4">
                        Creating an Idea is simple. Follow these steps:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 ml-4 mb-4 leading-relaxed">
                        <li>Click on the "Create New Idea" button above.</li>
                        <li>Enter any topic that interests you—it could be a project you're working on, a feeling you're exploring, a random idea, or just a word.</li>
                        <li>Click "Continue".</li>
                        <li>Choose a creative angle that defines how you want to approach it: mysterious, scientific, emotional, funny, philosophical, or something entirely your own.</li>
                        <li>Finally, click "Generate Idea".</li>
                      </ol>
                      <p className="leading-relaxed">
                        Our AI then crafts a personalized Idea that connects your topic with surprising real-world phenomena, 
                        offering creative angles, practical applications, and rabbit holes to explore further.
                      </p>

                      <h3 className="text-2xl font-bold text-amber-800 mt-8 mb-4">
                        What Makes an Idea
                      </h3>
                      <p className="leading-relaxed">
                        Each Idea is structured to provide:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Spark:</strong> A fascinating phenomenon or concept that connects to your topic</li>
                        <li><strong>Why It's Interesting:</strong> The underlying principles and insights</li>
                        <li><strong>Creative Angles:</strong> Different ways to interpret and use the phenomenon</li>
                        <li><strong>Apply It:</strong> Concrete suggestions tailored to your specific topic</li>
                        <li><strong>Rabbit Holes:</strong> Micro-topics and directions for deeper exploration</li>
                      </ul>

                      <h3 className="text-2xl font-bold text-amber-800 mt-8 mb-4">
                        Get Started
                      </h3>
                      <p className="leading-relaxed">
                        Ready to create your first Idea? Just click "Create New Idea" to begin your 
                        curiosity journey. Explore our examples to see what's possible, and let your imagination run wild.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

