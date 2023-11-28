export type Question = {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: string[];
  feedback: string;
};
export type Round = {
  round_title: string;
  order: number;
  questions: Question[];
};
export type Activity = {
  activity_name: string;
  order: number;
  rounds: Round[];
};
export type AppInfo = {
  name: string;
  heading: string;
};

interface RawActivity extends Omit<Activity, "rounds"> {
  questions: Question[] | Round[];
}
export interface RawData extends AppInfo {
  activities: RawActivity[];
}

export enum Page {
  Home,
  Quiz,
  Results,
}

export type Results = {
  rounds: {
    questions: boolean[];
  }[];
};
