import type { Job } from 'bullmq';

import { generateAssessment } from '../../infra/ai/assessment-generator.js';
import type { SocketService } from '../../infra/socketio/socket.service.js';
import type { AssessmentRepository } from '../../services/assessment/repository/assessment.repository.js';
import type { AssignmentRepository } from '../../services/assignment/repository/assignment.repository.js';

interface Dependencies {
  assignmentRepository: AssignmentRepository;
  assessmentRepository: AssessmentRepository;
  socketService: SocketService;
}

export class AssessmentGenerationProcessor {
  constructor(private readonly deps: Dependencies) {}

  async process(assignmentId: string, job: Job) {
    await job.updateProgress({ percent: 10, step: 'Starting Generation' });
    console.log('Check 1');
    const assignment =
      await this.deps.assignmentRepository.findById(assignmentId);

    if (!assignment) {
      throw new Error('Assignment not found');
    }

    console.log('Check 2');
    await job.updateProgress({ percent: 20, step: 'Generating Questions' });
    await this.deps.assignmentRepository.updateGenerationStatus(
      assignmentId,
      'PROCESSING',
    );

    this.deps.socketService.emitStatus(assignmentId, 'PROCESSING');

    try {
      console.log('Check 3');
      await job.updateProgress({ percent: 30, step: 'Generating Assessment' });

      const assessment = await generateAssessment({
        title: assignment.title,
        className: assignment.className ?? '',
        subject: assignment.subject ?? '',
        timeAllowedMinutes: assignment.timeAllowedMinutes ?? 0,
        additionalInstructions: assignment.additionalInstructions ?? '',
        sourceContent: assignment.sourceContent ?? '',
        questionRequirements: assignment.questionRequirements,
      }); 
      console.log('Check 4');
      await job.updateProgress({ percent: 80, step: 'Saving Assessment' });

      console.log('Check 5');
      const totalMarks = assessment.sections.reduce(
        (sectionTotal, section) =>
          sectionTotal +
          section.questions.reduce(
            (questionTotal, q) => questionTotal + q.marks,
            0,
          ),
        0,
      );

      const latest =
        await this.deps.assessmentRepository.findLatestByAssignmentId(
          assignmentId,
        );
        
      const version = latest ? latest.version + 1 : 1;
      const savedAssessment = await this.deps.assessmentRepository.create({
        assignmentId,
        title: assessment.title,
        totalMarks,
        version: version,
        sections: assessment.sections.map((sec) => ({
          ...sec,
          totalMarks: sec.questions.reduce((acc, q) => acc + q.marks, 0),
        })),
      });

      console.log('Check 6');
      await this.deps.assignmentRepository.updateGenerationStatus(
        assignmentId,
        'COMPLETED',
      );

      console.log('Check 7');
      await job.updateProgress({ percent: 100, step: 'Completed' });

      this.deps.socketService.emitCompleted(
        assignmentId,
        savedAssessment._id.toString(),
      );

      return savedAssessment;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error';

      await this.deps.assignmentRepository.updateGenerationStatus(
        assignmentId,
        'FAILED',
        message,
      );

      this.deps.socketService.emitFailed(assignmentId, message);

      throw error;
    }
  }
}
