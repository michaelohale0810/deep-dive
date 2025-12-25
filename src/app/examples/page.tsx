'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Idea } from '@/types/quirk';

// Mock data for example ideas
const exampleIdeas: Idea[] = [
  {
    id: '1',
    topic: 'time travel paradoxes',
    creativeAngle: 'scientific',
    capsule: `**Spark**  
The grandfather paradox reveals that time travel creates logical impossibilities: if you go back and prevent your grandfather from meeting your grandmother, you'd never be born to travel back in time.

**Why It's Interesting**  
This isn't just a plot device—it highlights how causality and free will might fundamentally conflict in a universe where time is traversable. Physicists debate whether parallel timelines, self-consistency principles, or quantum mechanics could resolve these contradictions.

**Creative Angles**  
- Explore how small changes compound into massive divergences
- Use the paradox as a metaphor for regret and second-guessing
- Investigate the psychological weight of "what if" scenarios
- Create narratives where the paradox itself becomes the solution

**Apply It**  
- Write a story where preventing the paradox creates a new, unexpected outcome
- Design a game mechanic where time travel choices have cascading effects
- Use it as a framework for understanding decision-making under uncertainty

**Rabbit Holes**  
- Novikov self-consistency principle
- Many-worlds interpretation of quantum mechanics
- Closed timelike curves in general relativity`,
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    topic: 'creative block',
    creativeAngle: 'emotional',
    capsule: `**Spark**  
The Zeigarnik effect shows that unfinished tasks occupy our mental space more than completed ones, creating a psychological tension that can both inspire and paralyze.

**Why It's Interesting**  
Your brain keeps incomplete projects active in working memory, which explains why you can't stop thinking about that half-written story. This same mechanism that drives you to finish can also create overwhelming pressure when you have too many open loops.

**Creative Angles**  
- Use the tension of unfinished work as creative fuel
- Explore the relationship between anxiety and creativity
- Investigate how completion rituals affect mental clarity
- Create systems that leverage this psychological quirk

**Apply It**  
- Leave your work intentionally unfinished at a high point to maintain momentum
- Practice "creative closure" rituals to signal completion to your brain
- Use the effect to your advantage by starting multiple projects to keep ideas flowing

**Rabbit Holes**  
- Flow state and creative productivity
- The psychology of procrastination
- Mental models for managing creative projects`,
    createdAt: new Date('2024-01-14T14:20:00'),
  },
  {
    id: '3',
    topic: 'urban design',
    creativeAngle: 'philosophical',
    capsule: `**Spark**  
The concept of "desire paths"—unofficial trails worn into grass by people taking the most direct route—reveals how human behavior shapes space in ways architects never intended.

**Why It's Interesting**  
These paths represent the gap between designed intention and lived experience. They show that the best design often emerges from use, not planning. Cities are conversations between planners and inhabitants, with desire paths as the most honest form of feedback.

**Creative Angles**  
- Explore the tension between control and organic growth
- Use desire paths as a metaphor for finding your authentic path
- Investigate how digital spaces create their own "desire paths"
- Create work that honors both structure and spontaneity

**Apply It**  
- Observe desire paths in your environment and document what they reveal
- Design systems that allow for organic modification
- Use this concept to understand user behavior in your creative projects

**Rabbit Holes**  
- Participatory design methodologies
- The psychology of wayfinding
- Emergent urbanism and bottom-up city planning`,
    createdAt: new Date('2024-01-13T09:15:00'),
  },
];

export default function Examples() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-amber-900 mb-4">
                Example Ideas
              </h1>
              <p className="text-amber-700 text-lg">
                Explore example ideas to see what's possible
              </p>
            </div>

            {/* Example Ideas List */}
            <div className="space-y-8">
              {exampleIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-white rounded-2xl shadow-xl border border-amber-200 p-8 md:p-12"
                >
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-amber-900 mb-3">
                      {idea.topic}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-amber-600">
                      <span className="px-3 py-1 bg-amber-100 rounded-full text-amber-800 font-medium">
                        {idea.creativeAngle}
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-amber max-w-none">
                    <MarkdownRenderer content={idea.capsule} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

