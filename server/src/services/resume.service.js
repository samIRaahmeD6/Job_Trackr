import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

import { GoogleGenAI } from "@google/genai";
import Resume from "../models/Resume.model.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateWithRetry = async (model, contents, maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({ model, contents });
    } catch (error) {
      const isBusy = String(error).includes("503") || String(error).includes("UNAVAILABLE");
      if (isBusy && attempt < maxRetries - 1) {
        const wait = (attempt + 1) * 10000;
        await new Promise((r) => setTimeout(r, wait));
      } else {
        throw error;
      }
    }
  }
};

export const parseCV = async (fileBuffer, userId) => {
  const pdfData = await pdfParse(fileBuffer);
  const cvText = pdfData.text;

  const schemaPrompt = `
Extract the following resume into clean structured JSON with this exact schema
(leave fields empty/[] if not found):

{
  "name": "", "email": "", "phone": "", "linkedin": "", "github": "",
  "summary": "", "skills": [],
  "experience": [{"company": "", "role": "", "start_date": "", "end_date": "", "description": ""}],
  "education": [{"institution": "", "degree": "", "field": "", "start_date": "", "end_date": ""}],
  "certifications": [],
  "projects": [{"name": "", "description": "", "tech_used": []}]
}

Return ONLY valid JSON, no extra text, no markdown fences.

Resume text:
"""${cvText}"""
`;

  const response = await generateWithRetry("gemini-2.5-flash-lite", schemaPrompt);
  const raw = response.text.trim().replace(/```json|```/g, "");
  const parsedData = JSON.parse(raw);

  const savedResume = await Resume.findOneAndUpdate(
    { user: userId },
    { user: userId, ...parsedData },
    { new: true, upsert: true, runValidators: true }
  );

  return savedResume;
};

export const getActiveResume = async (userId) => {
  const resume = await Resume.findOne({ user: userId });
  if (!resume) {
    const err = new Error("No resume found");
    err.statusCode = 404;
    throw err;
  }
  return resume;
};

export const getAllResumes = async (userId) => {
  return await Resume.find({ user: userId });
};

export const deleteResume = async (userId, resumeId) => {
  const resume = await Resume.findOneAndDelete({ _id: resumeId, user: userId });
  if (!resume) {
    const err = new Error("Resume not found");
    err.statusCode = 404;
    throw err;
  }
  return resume;
};

// Add this alongside your existing parseCV logic — reuse the same genAI client + retry helper you already built

export const analyzeJobDescription = async (resumeSkills, jdText) => {
  const prompt = `
You are comparing a candidate's resume skills against a job description.

Candidate's current skills:
${JSON.stringify(resumeSkills)}

Job description:
"""
${jdText}
"""

Return ONLY valid JSON (no markdown, no code fences) in this exact shape:
{
  "requiredSkills": ["skill1", "skill2", ...],
  "matchedSkills": ["skill1", ...],
  "missingSkills": ["skill3", ...],
  "importantKeywords": ["AWS", "CI/CD", "Agile", ...],
  "matchPercentage": 72
}
`;

  const response = await generateWithRetry("gemini-2.5-flash-lite", prompt);
  const raw = response.text.trim().replace(/```json|```/g, "");
  return JSON.parse(raw);
};