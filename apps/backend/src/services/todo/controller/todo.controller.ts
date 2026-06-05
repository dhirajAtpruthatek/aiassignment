import { Request, Response } from "express";
import { TodoService } from "../service/todo.service.js";
import { asyncHandler } from "../../../middlewares/system/asyncHandler.js";

interface TodoControllerDeps {
  todoService: TodoService;
}

export class TodoController {
  private service: TodoService;

  constructor({ todoService }: TodoControllerDeps) {
    this.service = todoService;
  }

  demoHandler = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.service.demoService();
    res.success({ data, message: "Testing the services" });
  })

}