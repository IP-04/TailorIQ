import { apiRequest } from "./queryClient";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

// Function to send resume data to the server for LLM review
export async function requestLLMReview(resumeData: any) {
  try {
    const response = await apiRequest(
      "POST",
      "/api/resume/llm-review",
      { resumeData }
    );
    
    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error("Error getting LLM suggestions:", error);
    throw error;
  }
}

// Function to send specific text to the server for improvement suggestions
export async function getImprovement(
  section: string,
  text: string,
  context?: string
) {
  try {
    const response = await apiRequest(
      "POST",
      "/api/resume/improve-text",
      { 
        section,
        text,
        context 
      }
    );
    
    const data = await response.json();
    return data.improvement;
  } catch (error) {
    console.error("Error improving text:", error);
    throw error;
  }
}
