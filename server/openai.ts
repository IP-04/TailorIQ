import { Resume } from "@shared/schema";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key",
});

// Function to generate resume review suggestions
export async function generateResumeReview(resumeData: Resume) {
  try {
    const prompt = `
      You are an expert resume writer. Please review the following resume and provide specific improvement suggestions.
      Return exactly 2-4 suggestions that would significantly improve the impact and effectiveness of this resume.
      
      For each suggestion:
      1. Identify a specific section that can be improved
      2. Provide a clear rationale for why it should be improved
      3. Provide a concrete, rewritten version that shows the improvement
      
      Your response should be in JSON format with an array of suggestions, each containing:
      - section: The path to the section (e.g., "summary", "experience[0].achievements[1]")
      - title: A brief title for the suggestion
      - original: The original content
      - suggestion: Your improved version
      
      Resume data:
      ${JSON.stringify(resumeData, null, 2)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert resume reviewer providing actionable suggestions to improve resume content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    // Parse the JSON response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const suggestions = JSON.parse(content).suggestions || [];
    return suggestions;
  } catch (error) {
    console.error("Error generating resume review:", error);
    // Return a fallback suggestion if the API fails
    return [
      {
        section: "summary",
        title: "Enhance Your Professional Summary",
        original: resumeData.summary,
        suggestion: "Results-driven Software Engineer with 8+ years of experience designing and developing user-centered applications that deliver exceptional user experiences. Proven track record of reducing system complexity, improving performance, and implementing scalable solutions in fast-paced environments. Expert in full-stack development, database design, and cloud architecture."
      }
    ];
  }
}

// Function to generate improvement suggestions for specific text
export async function generateTextImprovement(section: string, text: string, context?: string) {
  try {
    const prompt = `
      As an expert resume writer, please improve the following ${section} text to make it more impactful and professional.
      
      Original text: "${text}"
      
      ${context ? `Context: ${context}` : ''}
      
      Provide a more compelling and achievement-focused version that will stand out to recruiters and hiring managers.
      Focus on quantifiable achievements, action verbs, and specific skills when relevant.
      
      Return your response in JSON format with:
      - original: the original text
      - improved: your improved version 
      - explanation: brief explanation of the improvements made
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer focused on making resume content more impactful and professional."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating text improvement:", error);
    return {
      original: text,
      improved: text,
      explanation: "Unable to generate improvements at this time."
    };
  }
}
