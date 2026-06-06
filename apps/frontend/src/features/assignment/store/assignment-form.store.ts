import { create } from 'zustand';

interface AssignmentStore {
  assignmentId: string | null;

  setAssignmentId: (id: string) => void;

  clear: () => void;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignmentId: null,

  setAssignmentId: (id) =>
    set({
      assignmentId: id,
    }),

  clear: () =>
    set({
      assignmentId: null,
    }),
}));
