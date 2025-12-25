'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';

export default function About() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-8 md:p-12">
              <h1 className="text-4xl font-bold text-amber-900 mb-6">
                About Divergent Distillery
              </h1>

              <div className="prose prose-amber max-w-none space-y-6 text-amber-900">
                <p className="text-lg leading-relaxed">
                  Divergent Distillery is a creativity app designed to spark your curiosity and inspire new ways of thinking. 
                  We blend your interests with fascinating real-world phenomena to create unique insights called "Ideas."
                </p>

                <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">
                  How It Works
                </h2>
                <p className="leading-relaxed">
                  Creating an Idea is simple. Start by sharing any topic that interests you—it could be a project you're 
                  working on, a feeling you're exploring, a random idea, or just a word. Then, choose a creative angle that 
                  defines how you want to approach it: mysterious, scientific, emotional, funny, philosophical, or something 
                  entirely your own.
                </p>
                <p className="leading-relaxed">
                  Our AI then crafts a personalized Idea that connects your topic with surprising real-world phenomena, 
                  offering creative angles, practical applications, and rabbit holes to explore further.
                </p>

                <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">
                  What Makes an Idea
                </h2>
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

                <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">
                  Our Mission
                </h2>
                <p className="leading-relaxed">
                  At Divergent Distillery, we believe that curiosity is the engine of creativity. By connecting your interests 
                  with unexpected insights from science, history, psychology, art, technology, and nature, we help you see 
                  familiar topics through new lenses and discover creative possibilities you might never have considered.
                </p>
                <p className="leading-relaxed">
                  Whether you're an artist seeking inspiration, a writer looking for fresh angles, a designer exploring new 
                  concepts, or simply someone who loves to learn, Divergent Distillery is here to fuel your curiosity and 
                  expand your creative horizons.
                </p>

                <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">
                  Get Started
                </h2>
                <p className="leading-relaxed">
                  Ready to create your first Idea? Head to your dashboard and click "Create New Idea" to begin your 
                  curiosity journey. Explore our examples to see what's possible, and let your imagination run wild.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

