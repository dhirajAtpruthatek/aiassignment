import { TodoRepository } from "./repository/todo.repository.js";
import { TodoService } from "./service/todo.service.js";
import { TodoController } from "./controller/todo.controller.js";
import createTodoRoutes from "./routes/todo.routes.js";
import { registerTodoListeners } from "./events/todo.listener.js";
import { eventBus } from "../../utils/local-eventbus/eventBusInstance.js";

export class TodoContainer {
     static init() {

          const repositories = {
               todoRepository: new TodoRepository(),
          };

          const services = {
               todoService: new TodoService({
                    todoRepository: repositories.todoRepository,
                    eventBus: eventBus,
               }),
          };

          const controllers = {
               todoController: new TodoController({
                    todoService: services.todoService,
               }),
          };

          const routes = {
               todoRoutes: createTodoRoutes({
                    todoController: controllers.todoController,
               }),
          };

          registerTodoListeners(eventBus);

          return {
               repositories,
               services,
               controllers,
               routes,
          };
     }
}