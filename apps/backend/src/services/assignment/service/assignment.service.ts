import { AppError } from "../../../core/errors/AppError.js";
import { generationQueue } from "../../../jobs/queues/generation.queue.js";
import { AssessmentRepository } from "../../assessment/repository/assessment.repository.js";
import { UploadRepository } from "../../upload/repository/upload.repository.js";
import { UploadService } from "../../upload/service/upload.service.js";
import { CreateAssignmentDTO } from "../dto/create-assignment.dto.js";
import { AssignmentRepository } from "../repository/assignment.repository.js";

interface AssignmentServiceDeps {
  assignmentRepository: AssignmentRepository;
  assesmentRepository: AssessmentRepository;
}

export class AssignmentService {
  private repo: AssignmentRepository;
  private assesmentRepo: AssessmentRepository;

  constructor({
    assignmentRepository,
    assesmentRepository
  }: AssignmentServiceDeps) {
    this.repo = assignmentRepository;
    this.assesmentRepo = assesmentRepository;
  }

  async createAssignment(
    payload: CreateAssignmentDTO
  ) {
    const assignment =
      await this.repo.create(
        payload
      );
    await generationQueue.add(
      "assessment-generation",
      {
        assignmentId:
          assignment._id.toString(),
      },
      {
        attempts: 3,

        backoff: {
          type: "exponential",
          delay: 5000,
        },

        removeOnComplete: 100,
        removeOnFail: 50,
      }
    );

    return assignment;
  }

  async getAllAssignments() {
    return this.repo.findAll();
  }

  async getAssignmentById(
    id: string
  ) {
    const assignment =
      await this.repo.findById(id);

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    return assignment;
  }

  async getStatus(id: string) {
    const assignment =
      await this.repo.findById(id);

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    return {
      id: assignment._id,

      generationStatus:
        assignment.generationStatus,

      errorMessage:
        assignment.errorMessage,
    };
  }

  async retryGeneration(
    id: string
  ) {
    const assignment =
      await this.repo.findById(id);

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    assignment.generationStatus =
      "PENDING";

    assignment.errorMessage =
      undefined;

    await assignment.save();



    await generationQueue.add(
      "assessment-generation",
      {
        assignmentId:
          assignment._id.toString(),
      }
    );

    return assignment;
  }

  async generateAssessment(
    id: string
  ) {
    const assignment =
      await this.repo.findById(id);

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    await this.repo
      .updateGenerationStatus(
        id,
        "PROCESSING"
      );

    await generationQueue.add(
      "assessment-generation",
      {
        assignmentId: id,
      }
    );

    return {
      message:
        "Generation started",
    };
  }

  async createDraft(payload: {
    title: string;
    className: string;
    subject: string;
    timeAllowedMinutes: number;
  }) {

    return this.repo.create({
      ...payload,
      generationStatus: "DRAFT",
    });
  }
  async updateAssignment(
    id: string,
    payload: Partial<CreateAssignmentDTO>
  ) {
    const assignment =
      await this.repo.update(
        id,
        payload
      );

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    return assignment;
  }
  async updateBasicDetails(
    id: string,
    payload: {
      title?: string;
      className?: string;
      subject?: string;
      timeAllowedMinutes?: number;
    }
  ) {
    const assignment =
      await this.repo.update(
        id,
        payload
      );

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    return assignment;
  }
  async updateConfiguration(
    id: string,
    payload: {
      assignmentDate: Date;
      dueDate: Date;
      additionalInstructions?: string;
      questionRequirements: any[];
    }
  ) {
    const assignment =
      await this.repo.update(
        id,
        payload
      );

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    return assignment;
  }

  async uploadPdf(
    assignmentId: string,
    file: Express.Multer.File
  ) {
    const assignment =
      await this.repo.findById(
        assignmentId
      );

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    const uploadService =
      new UploadService({
        uploadRepository:
          new UploadRepository(),
      });

    const extracted =
      await uploadService.uploadPdf(
        file
      );



    if (!extracted.extractedText || extracted.extractedText.text.length === 0) {
      throw new AppError(
        "No readable content found in PDF",
        400
      );
    }

    let sourceContent = "";

    if (typeof extracted.extractedText.text === "string") {
      sourceContent = extracted.extractedText.text;
    } else if (
      extracted.extractedText && Array.isArray(extracted.extractedText.pages)
    ) {
      sourceContent = extracted.extractedText.pages.map(page => page.text?.trim()).filter(Boolean).join("\n\n");
    } else {
      throw new AppError(
        "Unable to extract PDF content",
        400
      );
    }


    return this.repo.update(
      assignmentId,
      {
        uploadedPdf: {
          fileName:
            extracted.fileName,

          fileUrl:
            extracted.fileUrl,

          fileSize:
            extracted.fileSize,
        },

        sourceContent,
      }
    );
  }
  async submitAssignment(
    id: string
  ) {
    const assignment =
      await this.repo.findById(id);

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    if (
      !assignment.questionRequirements
        ?.length
    ) {
      throw new AppError(
        "Question requirements missing",
        400
      );
    }

    if (
      !assignment.sourceContent
    ) {
      throw new AppError(
        "Study material missing",
        400
      );
    }

    await this.repo
      .updateGenerationStatus(
        id,
        "PENDING"
      );

    await generationQueue.add(
      "assessment-generation",
      {
        assignmentId: id,
      },
      {
        attempts: 3,

        backoff: {
          type: "exponential",
          delay: 5000,
        },

        removeOnComplete: 100,
        removeOnFail: 50,
      }
    );

    return {
      message:
        "Assessment generation started",
    };
  }

  async deleteAssignMentnAssesment(
    id: string
  ) {
    let result = await this.repo.delete(id);
    let result2 = await this.assesmentRepo.deleteByAssignmentId(id);

    return {
      message: "Assignment deleted",
    }
  }
}