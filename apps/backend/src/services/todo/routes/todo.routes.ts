import { Router } from 'express';

import type { TodoController } from '../controller/todo.controller.js';

interface RouteDeps {
  todoController: TodoController;
}

export default function createTodoRoutes({ todoController }: RouteDeps) {
  const router = Router();

  router.get('/', todoController.demoHandler);

  return router;
}
