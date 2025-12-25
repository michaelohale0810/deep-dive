import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const model = getGeminiModel();
    
    const prompt = `You are the "Idea Topic Interpreter".

The user will write something they want today's Idea to be about.

The app will:
1. Briefly acknowledge their input in 1 short friendly sentence.
2. Extract a clean, short topic string.
3. Return a JSON object with:
   - "topic": the cleaned topic (max ~8 words)
   - "raw": their original input

IMPORTANT:
- Do not invent a topic they didn't imply.
- If their input is very short already ("time travel"), keep it as-is.
- Output ONLY valid JSON. No extra text.

User input: ${userInput}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to extract JSON from the response
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Error interpreting topic:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to interpret topic' },
      { status: 500 }
    );
  }
}

