import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const GEMINI_MODEL = "gemini-2.5-flash";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const testGeminiConnection = async (): Promise<boolean> => {
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent("Hello from Gemini!");
    return true;
  } catch (error: any) {
    console.error(`❌ Gemini connection failed with ${GEMINI_MODEL}:`, error.message);
    if (error.status === 404 || error.message?.includes("not found")) {
      console.error(
        "👉 The model might not be accessible in your current project or region. Make sure your API key has access to gemini-1.5-flash."
      );
    }
    return false;
  }
};

export const generateFormSchema = async (prompt: string): Promise<Record<string, any>> => {
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const systemPrompt = `You are a form generation expert. 
Based on a user's description, create a JSON schema for a form with:
- "title": form title
- "description": brief summary
- "fields": array of objects with { name, type, label, required, validation? }

Always return *only valid JSON*, no markdown, text, or explanation.
Example output:
{
  "title": "Signup Form",
  "description": "A form for user registration",
  "fields": [
    { "name": "name", "type": "text", "label": "Full Name", "required": true },
    { "name": "email", "type": "email", "label": "Email Address", "required": true }
  ]
}`;

    // Combine prompt and system instructions
    const input = `${systemPrompt}\n\nUser request: ${prompt}`;

    // ✅ The new SDK prefers plain strings — not structured roles/parts
    const result = await model.generateContent(input);

    const text = result.response.text();
    if (!text) throw new Error("Empty response from Gemini API");

    // Safely extract JSON structure
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON structure from Gemini response");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    console.log("✅ Form schema generated successfully.");
    return parsed;
  } catch (error: any) {
    console.error("❌ Error generating form schema:", error);

    if (error.status === 404) {
      throw new Error(
        "Gemini API model 'gemini-1.5-flash' not found — ensure your API key has access and project supports it."
      );
    }

    if (error.message?.includes("Invalid JSON")) {
      throw new Error("Gemini returned invalid JSON. Try refining your prompt.");
    }
    throw new Error("Failed to generate form schema. Please check your API configuration.");
  }
};