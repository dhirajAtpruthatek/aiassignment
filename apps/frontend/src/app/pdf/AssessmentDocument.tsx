import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import "./fonts";


const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Inter",
  },

  schoolName: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: 700,
    marginBottom: 4,
  },

  subject: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 4,
  },

  className: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 24,
  },

  topMeta: {
    fontSize: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    fontWeight: 600,
  },

  instructions: {
    fontSize: 11,
    marginBottom: 16,
    fontWeight: 500,
  },

  studentBox: {
    marginBottom: 30,
    gap: 8,
  },

  fieldRow: {
    fontSize: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  line: {
    borderBottomWidth: 1,
    width: 120,
    marginLeft: 6,
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
  },

  questionType: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 4,
  },

  questionInfo: {
    fontSize: 10,
    marginBottom: 14,
  },

  question: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.6,
  },
});

export default function AssessmentDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}

        <Text style={styles.schoolName}>
          Delhi Public School, Sector-4, Bokaro
        </Text>

        <Text style={styles.subject}>
          Subject: English
        </Text>

        <Text style={styles.className}>
          Class: 5th
        </Text>

        {/* Meta */}

        <View style={styles.topMeta}>
          <Text>Time Allowed: 45 minutes</Text>
          <Text>Maximum Marks: 20</Text>
        </View>

        {/* Instructions */}

        <Text style={styles.instructions}>
          All questions are compulsory unless stated otherwise.
        </Text>

        {/* Student Details */}

        <View style={styles.studentBox}>
          <View style={styles.fieldRow}>
            <Text>Name:</Text>
            <Text>______________________</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text>Roll Number:</Text>
            <Text>_______________</Text>

          </View>

          <View style={styles.fieldRow}>
            <Text>Class: 5th Section:</Text>
            <Text>_________</Text>

          </View>
        </View>

        {/* Section */}

        <Text style={styles.sectionTitle}>
          Section A
        </Text>

        <Text style={styles.questionType}>
          Short Answer Questions
        </Text>

        <Text style={styles.questionInfo}>
          Attempt all questions. Each question carries 2 marks
        </Text>

        {questions.map((question, index) => (
          <Text
            key={question.id}
            style={styles.question}
          >
            {index + 1}. [{question.difficulty}]{" "}
            {question.question} [{question.marks} Marks]
          </Text>
        ))}
      </Page>
    </Document>
  );
}

const questions = [
  {
    id: "1",
    difficulty: "Easy",
    marks: 2,
    question:
      "Define electroplating. Explain its purpose.",
  },
  {
    id: "2",
    difficulty: "Moderate",
    marks: 2,
    question:
      "What is the role of a conductor in the process of electrolysis?",
  },
  {
    id: "3",
    difficulty: "Easy",
    marks: 2,
    question:
      "Why does a solution of copper sulfate conduct electricity?",
  },
  {
    id: "4",
    difficulty: "Moderate",
    marks: 2,
    question:
      "Describe one example of the chemical effect of electric current in daily life.",
  },
];