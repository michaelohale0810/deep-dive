import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { userTopic, creativeAngle } = await request.json();

    if (!userTopic || !creativeAngle) {
      return NextResponse.json(
        { error: 'Missing userTopic or creativeAngle' },
        { status: 400 }
      );
    }

    const model = getGeminiModel();
    
    const prompt = `You are the "Idea Generator" for a creativity app.

Your job is to create a short, powerful Idea that blends:
- the user's topic
- a surprising real-world phenomenon or concept
- the requested creative angle or tone

You MUST use this structure, with these headings exactly:

**Spark**  
1–3 sentences. Describe a strange, surprising, or fascinating real phenomenon, fact, or concept from science, history, psychology, art, technology, or nature.

**Why It's Interesting**  
1–3 sentences. Explain the underlying principle or pattern in a clear, insight-focused way.

**Creative Angles**  
3–5 bullet points. Each bullet shows a different way to interpret or use this phenomenon creatively, especially in relation to the user's topic.

**Apply It**  
2–5 bullet points. Concrete, specific suggestions tailored to the user's topic: exercises, ideas, or lenses they can use TODAY.

**Rabbit Holes**  
2–4 short bullet points with phrases or micro-topics they could explore further.

Tone:
- Imaginative, clear, and inspiring.
- Reflect the requested creative angle (for example: mysterious, scientific, emotional, funny, etc.).
- Make the user feel like this was co-created with them, not generic.

Constraints:
- Directly reference the user's topic in at least the "Creative Angles" or "Apply It" sections.
- Do not invent personal facts about the user.
- The phenomenon should be real or at least plausibly real (no pure fantasy as the main fact).

userTopic: ${userTopic}
creativeAngle: ${creativeAngle}

Respond ONLY with the Idea in Markdown, using the heading titles exactly.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ capsule: text });
  } catch (error: any) {
    console.error('Error generating capsule:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate capsule' },
      { status: 500 }
    );
  }
}

