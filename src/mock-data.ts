import type { Question, Activity, AppInfo } from "./shared.types";

export const mockQuestions: Question[] = [
  {
    is_correct: true,
    stimulus: "Example *question* 1",
    order: 1,
    user_answers: [],
    feedback: "Example *question* 1",
  },
  {
    is_correct: false,
    stimulus: "Example *question* 2",
    order: 2,
    user_answers: [],
    feedback: "*Example* question 2",
  },
];

export const mockActivities: Activity[] = [
  {
    activity_name: "Activity 1",
    order: 1,
    rounds: [
      { round_title: "Round 1", order: 1, questions: mockQuestions },
      { round_title: "Round 2", order: 2, questions: mockQuestions },
    ],
  },
  {
    activity_name: "Activity 2",
    order: 2,
    rounds: [
      { round_title: "Round 1", order: 1, questions: mockQuestions },
      { round_title: "Round 2", order: 2, questions: mockQuestions },
    ],
  },
];

export const mockAppInfo: AppInfo = {
  name: "mock app",
  heading: "mock heading",
};
