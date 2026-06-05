import { ChatGoogle } from "@langchain/google";
import { buildAssessmentPrompt } from "../ai/prompts/assessment.prompt.js";

import {
  AssessmentSchema,
} from "./schemas/assessment-output.schema.js";

export const model =
  new ChatGoogle(
    "gemini-2.5-flash",
    {
      apiKey:
        process.env.GOOGLE_API_KEY,
    }
  );

const structuredModel =
  model.withStructuredOutput(
    AssessmentSchema
  );

interface QuestionRequirement {
  type: string;

  count: number;

  marksPerQuestion: number;

  difficulty:
  | "easy"
  | "medium"
  | "hard"
  | "mixed";
}

interface GenerateAssessmentInput {
  title: string;

  className: string;

  subject: string;

  timeAllowedMinutes: number;

  additionalInstructions?: string;

  sourceContent: string;

  questionRequirements:
  QuestionRequirement[];
}

export async function generateAssessment(
  input: GenerateAssessmentInput
) {
  const prompt = buildAssessmentPrompt(input);

  return structuredModel.invoke([
    [
      "system",
      `
You are an expert academic assessment creator.

STRICT RULES:

- Use ONLY provided study material.
- Never invent facts.
- Follow section definitions exactly.
- Follow question count exactly.
- Follow marks exactly.
- Follow difficulty exactly.
- Never merge sections.
- Never create extra sections.
- Return only schema-compatible output.
`,
    ],
    [
      "human",
      prompt,
    ],
  ]);
}