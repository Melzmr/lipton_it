import create from 'zustand';
import { TestType } from './testsMocks';

export type CreateTestQuestion = {
  title: string;
  description?: string;
  data: [string, string?];
};

type CreateTestStore = {
  type?: TestType;
  name?: string;
  description?: string;
  questions?: CreateTestQuestion[];
  isPrivate?: boolean;
  platform?: 'mobile' | 'desktop';
  updateName(name?: string): void;
  updateDescription(desc?: string): void;
  updateType(type: TestType): void;
  appendQuestion(question: CreateTestQuestion): void;
  deleteQuestion(id: number): void;
  updateIsPrivate(value: boolean): void;
  updatePlatform(platform: 'mobile' | 'desktop'): void;
  clearAll(): void;
};

export const useCreateTestStore = create<CreateTestStore>((set) => ({
  updateName: (name: string) =>
    set({
      name,
    }),
  updateDescription: (desc: string) =>
    set({
      description: desc,
    }),
  updateType: (type: TestType) =>
    set({
      type,
    }),
  appendQuestion: (question: CreateTestQuestion) =>
    set((state) => ({
      questions: [...(state.questions ?? []), question],
    })),
  deleteQuestion: (id: number) =>
    set((state) => {
      const newQuestions = [...(state.questions ?? [])];
      newQuestions.splice(id, 1);

      return {
        questions: newQuestions,
      };
    }),
  updateIsPrivate: (value: boolean) =>
    set({
      isPrivate: value,
    }),
  updatePlatform: (platform: 'mobile' | 'desktop') =>
    set({
      platform,
    }),
  clearAll: () =>
    set({
      name: undefined,
      description: undefined,
      questions: undefined,
      type: undefined,
      platform: undefined,
      isPrivate: undefined,
    }),
}));
