import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export const getGeminiModel = () => {
  // Using gemini-1.5-flash as it's the latest stable flash model
  // If "gemini-flash-latest" is available in your region, you can change this
  return genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
};

