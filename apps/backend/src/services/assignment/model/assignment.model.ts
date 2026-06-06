import mongoose from "mongoose";

const QuestionRequirementSchema =
    new mongoose.Schema(
        {
            type: {
                type: String,
                required: true,
            },

            count: {
                type: Number,
                required: true,
                min: 1,
            },

            marksPerQuestion: {
                type: Number,
                required: true,
                min: 1,
            },

            difficulty: {
                type: String,
                enum: [
                    "easy",
                    "medium",
                    "hard",
                    "mixed",
                ],
                default: "mixed",
            },
        },
        {
            _id: true,
        }
    );

const AssignmentSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
            },

            className: {
                type: String,
            },

            subject: {
                type: String,
            },

            timeAllowedMinutes: {
                type: Number,
            },

            assignmentDate: {
                type: Date,
            },

            dueDate: {
                type: Date,
            },

            additionalInstructions: {
                type: String,
            },

            sourceContent: {
                type: String,
            },

            uploadedPdf: {
                fileName: String,
                fileUrl: String,
                fileSize: Number,
            },

            questionRequirements: [
                QuestionRequirementSchema,
            ],

            generationStatus: {
                type: String,
                enum: [
                    "DRAFT",
                    "PENDING",
                    "PROCESSING",
                    "COMPLETED",
                    "FAILED",
                ],
                default: "DRAFT",
            },

            errorMessage: String,
        },
        {
            timestamps: true,
        }
    );

export const AssignmentModel =
    mongoose.model(
        "Assignment",
        AssignmentSchema
    );