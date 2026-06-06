import type { EventBus } from '../../../utils/local-eventbus/eventBus.js';
import type { TodoEvents } from './todo.events.js';
import { TODO_EVENTS } from './todo.events.js';

export function registerTodoListeners(eventBus: EventBus<TodoEvents>) {
  eventBus.on(TODO_EVENTS.CREATED, async (payload) => {
    console.log('📢 Todo Created Event:', payload);
  });
}
