
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceText = async (text: string, type: 'summary' | 'experience' | 'skills'): Promise<string> => {
  const prompt = `
    You are a world-class professional resume writer. 
    Enhance the following ${type} text for a student's CV to make it more impactful, professional, and keyword-optimized.
    Keep it concise and highlight achievements. Use action verbs.
    
    Original text: "${text}"
    
    Return ONLY the enhanced text, no explanations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text.trim() || text;
  } catch (error) {
    console.error("Gemini enhancement failed:", error);
    return text;
  }
};

export const suggestSkills = async (jobRole: string, currentSkills: string[]): Promise<string[]> => {
  const prompt = `
    Based on the job role "${jobRole}" and current skill set [${currentSkills.join(', ')}], 
    suggest 5 additional high-impact technical or soft skills that would make this student more competitive.
    Return the result as a comma-separated list of 5 skills only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    const skillsText = response.text.trim();
    return skillsText.split(',').map(s => s.trim());
  } catch (error) {
    console.error("Skill suggestion failed:", error);
    return [];
  }
};
