import type { EventBus } from '../../../utils/local-eventbus/eventBus.js';
import type { TodoEvents } from '../events/todo.events.js';
import { TODO_EVENTS } from '../events/todo.events.js';
import type { TodoRepository } from '../repository/todo.repository.js';

interface TodoServiceDeps {
  todoRepository: TodoRepository;
  eventBus: EventBus<TodoEvents>;
}

export class TodoService {
  private repo: TodoRepository;
  private eventBus: EventBus<TodoEvents>;

  constructor({ todoRepository, eventBus }: TodoServiceDeps) {
    this.repo = todoRepository;
    this.eventBus = eventBus;
  }

  async demoService() {
    this.eventBus.emit(TODO_EVENTS.CREATED, {
      id: '1',
      title: 'Todo 1',
      completed: false,
    });

    return [];
  }
}
