import { AssignmentRepository } from "./repository/assignment.repository.js";
import { AssignmentService } from "./service/assignment.service.js";
import { AssignmentController } from "./controller/assignment.controller.js";
import createAssignmentRoutes from "./routes/assignment.routes.js";
import { AssignmentModel } from "./model/assignment.model.js";
 
export class AssignmentContainer {
  static init() {

    const repositories = {
      assignmentRepository: new AssignmentRepository(AssignmentModel),
    };

    const services = {
      assignmentService: new AssignmentService({
        assignmentRepository: repositories.assignmentRepository 
      }),
    };

    const controllers = {
      assignmentController: new AssignmentController({
        assignmentService: services.assignmentService,
      }),
    };

    const routes = {
      assignmentRoutes: createAssignmentRoutes({
        assignmentController: controllers.assignmentController,
      }),
    };

   
    return {
      repositories,
      services,
      controllers,
      routes,
    };
  }
}