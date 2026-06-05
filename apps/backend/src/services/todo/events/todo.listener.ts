import { EventBus } from "../../../utils/local-eventbus/eventBus.js";
import { TodoEvents, TODO_EVENTS } from "./todo.events.js";

export function registerTodoListeners(eventBus: EventBus<TodoEvents>) {
     eventBus.on(TODO_EVENTS.CREATED, async (payload) => {
          console.log("📢 Todo Created Event:", payload);
          
     });
}