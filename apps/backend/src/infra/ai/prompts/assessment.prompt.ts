import type { CreateAssignmentDTO } from '../../../services/assignment/dto/create-assignment.dto.js';

function getQuestionTypeGuide(type: string, marksPerQuestion: number): string {
  switch (type) {
    case 'MCQ':
      return `
- Generate exactly 4 options.
- Only one option should be correct.
- Options should be realistic and meaningful.
- answer field must contain the correct option text.
`;

    case 'TRUE_FALSE':
      return `
- Generate True/False statements.
- answer must be either "True" or "False".
`;

    case 'FILL_IN_THE_BLANK':
      return `
- Generate fill-in-the-blank questions.
- answer must contain the missing word or phrase.
`;

    case 'ONE_WORD':
      return `
- Answer must be a single word or short term.
`;

    case 'VERY_SHORT_ANSWER':
      return `
- Answer should be 1-2 sentences.
`;

    case 'SHORT_ANSWER':
      return `
- Answer should be proportional to marks.
- Minimum 3-5 meaningful sentences.
`;

    case 'SHORT_NOTE':
      return `
- Answer should be written as a short note.
- Include important points from source material.
`;

    case 'LONG_ANSWER':
      return `
- Answer must be detailed and examination-ready.
- Never answer in 1-2 lines.
- Include multiple key points.
- Answer depth must match marks.
`;

    case 'ESSAY':
      return `
- Generate essay-style questions.
- Answer must contain:
  - Introduction
  - Main explanation
  - Conclusion
- Must be detailed and well structured.
`;

    case 'NUMERICAL_PROBLEM':
      return `
- Generate calculation-based questions only if supported by study material.
- Include final answer.
- Include working/steps whenever possible.
`;

    case 'DIAGRAM_BASED':
      return `
- Generate diagram-based questions only if supported by study material.
- Provide explanation in answer field.
`;

    default:
      return '';
  }
}

function getAnswerLengthGuide(marks: number): string {
  if (marks <= 1) {
    return 'Answer should be concise (1 sentence).';
  }

  if (marks === 2) {
    return 'Answer should contain 2-3 meaningful sentences.';
  }

  if (marks === 3) {
    return 'Answer should contain 3-5 meaningful sentences.';
  }

  if (marks === 4) {
    return 'Answer should contain 4-6 detailed sentences.';
  }

  if (marks === 5) {
    return `
- Answer must contain at least 5 substantial points
  OR
- A detailed paragraph of equivalent depth.
- Never answer in less than 100 words.
`;
  }

  return `
- Answer must be detailed.
- Include explanation, important points, examples (if available in source).
- Never answer briefly.
- Target 150+ words when appropriate.
`;
}

export function buildAssessmentPrompt(
  assignment: Pick<
    CreateAssignmentDTO,
    | 'title'
    | 'className'
    | 'subject'
    | 'timeAllowedMinutes'
    | 'additionalInstructions'
    | 'sourceContent'
    | 'questionRequirements'
  >,
) {
  const sections = assignment
    .questionRequirements!.map(
      (section, index) => `
SECTION ${index + 1}

QUESTION TYPE: ${section.type}

NUMBER OF QUESTIONS: ${section.count}

MARKS PER QUESTION: ${section.marksPerQuestion}

DIFFICULTY: ${section.difficulty}

QUESTION TYPE RULES:
${getQuestionTypeGuide(section.type, section.marksPerQuestion)}

ANSWER DEPTH RULES:
${getAnswerLengthGuide(section.marksPerQuestion)}
`,
    )
    .join('\n\n');

  return `
Generate a complete academic assessment.

ASSESSMENT DETAILS

Title: ${assignment.title}

Class: ${assignment.className}

Subject: ${assignment.subject}

Duration: ${assignment.timeAllowedMinutes} minutes

Additional Instructions:
${assignment.additionalInstructions || 'None'}

================================================================

STUDY MATERIAL

${assignment.sourceContent}

================================================================

QUESTION REQUIREMENTS

${sections}

================================================================

MANDATORY RULES

1. Use ONLY information from STUDY MATERIAL.
2. Never invent facts.
3. Never use external knowledge.
4. Follow exact section count.
5. Follow exact question count.
6. Follow exact marks.
7. Follow exact difficulty.
8. Create one section for each requirement.
9. Do not merge sections.
10. Do not create extra sections.
11. Do not create fewer questions.
12. Every question MUST contain an answer.
13. Never leave answer empty.
14. MCQ questions MUST contain exactly 4 options.
15. Long-answer questions must be proportional to marks.
16. 5-mark and higher answers must be detailed.
17. Avoid duplicate questions.
18. Cover different parts of the study material.
19. Questions must be grammatically correct.
20. Questions must be academically appropriate.

FINAL VALIDATION BEFORE RETURNING

- Verify every section exists.
- Verify every question has an answer.
- Verify MCQs have 4 options.
- Verify answer length matches marks.
- Verify question count matches requirements.
- Verify no duplicate questions.
- Verify output matches schema exactly.

Return only schema-compatible data.
`;
}
