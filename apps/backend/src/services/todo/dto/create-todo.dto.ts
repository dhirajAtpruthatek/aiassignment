import { z } from 'zod';

export const CreateTodoDTO = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional().default(false),
});

export type CreateTodoDTOType = z.infer<typeof CreateTodoDTO>;
