import type { Todo } from '../types/todo.types.js';

export const TODO_EVENTS = {
  CREATED: 'todo.created',
  UPDATED: 'todo.updated',
} as const;

export type TodoEvents = {
  [TODO_EVENTS.CREATED]: Todo;
  [TODO_EVENTS.UPDATED]: Todo;
};
