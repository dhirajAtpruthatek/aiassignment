import { CreateAssignmentDTO } from "../../../services/assignment/dto/create-assignment.dto.js";

function getQuestionTypeGuide(
     type: string
): string {
     switch (type) {
          case "MCQ":
               return "Generate 4 options for each question.";

          case "TRUE_FALSE":
               return "Questions should be answerable with True or False.";

          case "FILL_IN_THE_BLANK":
               return "Generate fill in the blank style questions.";

          case "ONE_WORD":
               return "Answer should be one word.";

          case "VERY_SHORT_ANSWER":
               return "Answer should be 1-2 sentences.";

          case "SHORT_ANSWER":
               return "Answer should be 3-5 sentences.";

          case "SHORT_NOTE":
               return "Generate short note style questions.";

          case "LONG_ANSWER":
               return "Generate detailed answer questions.";

          case "ESSAY":
               return "Generate essay style questions.";

          case "NUMERICAL_PROBLEM":
               return "Generate calculation-based questions.";

          case "DIAGRAM_BASED":
               return "Generate diagram-based questions.";

          default:
               return "";
     }
}

export function buildAssessmentPrompt(
     assignment: Pick<
          CreateAssignmentDTO,
          | "title"
          | "className"
          | "subject"
          | "timeAllowedMinutes"
          | "additionalInstructions"
          | "sourceContent"
          | "questionRequirements"
     >
) {
     const sections =
          assignment.questionRequirements
               .map(
                    section => `
QUESTION TYPE: ${section.type}

COUNT: ${section.count}

MARKS PER QUESTION: ${section.marksPerQuestion}

DIFFICULTY: ${section.difficulty}

GUIDELINE:
${getQuestionTypeGuide(section.type)}
`
               )
               .join("\n\n");

     return `
Generate an academic assessment.

ASSIGNMENT TITLE:
${assignment.title}

CLASS:
${assignment.className}

SUBJECT:
${assignment.subject}

TIME ALLOWED:
${assignment.timeAllowedMinutes} minutes

ADDITIONAL INSTRUCTIONS:
${assignment.additionalInstructions || "None"}

STUDY MATERIAL:

${assignment.sourceContent}

QUESTION REQUIREMENTS:

${sections}

STRICT RULES:

1. Use ONLY the study material.
2. Do not invent facts.
3. Follow exact question counts.
4. Follow exact marks.
5. Follow requested difficulty.
6. Create one section per question type.
7. Keep questions academically correct.
8. Return valid schema output only.
`;
}