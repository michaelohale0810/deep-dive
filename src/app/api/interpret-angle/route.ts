import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { angleInput } = await request.json();

    if (!angleInput || typeof angleInput !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const model = getGeminiModel();
    
    const prompt = `You are the "Creative Angle Interpreter".

The user will either:
- pick one of the suggested angles, or
- type their own angle.

Your job:
1. Normalize their angle into a short label.
2. Optionally keep a more descriptive version if they wrote something longer.
3. Return a JSON object:
   - "angleLabel": short label, e.g. "mysterious", "scientific", "darkly funny"
   - "angleRaw": their original angle text

If they say something like "surprise me", set angleLabel to "surprise".

Output ONLY valid JSON. No extra commentary.

User input: ${angleInput}`;

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
    console.error('Error interpreting angle:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to interpret angle' },
      { status: 500 }
    );
  }
}

