import { RawData, Activity, AppInfo, Question, Round } from "./shared.types";

const sortOrdered = <T extends { order: number }>(arr: T[]): T[] => {
  return arr.sort((a, b) => a.order - b.order);
};

export const parseData = (data: RawData): [AppInfo, Activity[]] => {
  const { activities, ...appInfo } = data;
  const parsedActivities = activities.map((activity) => {
    const { questions, ...baseActivity } = activity;
    if (questions?.length > 0 && (questions[0] as Round).round_title) {
      const parsedRounds = (questions as Round[]).map(
        (round) =>
          ({
            ...round,
            questions: sortOrdered<Question>(round.questions),
          } as Round)
      );
      return {
        ...baseActivity,
        rounds: sortOrdered<Round>(parsedRounds),
      } as Activity;
    }
    return {
      ...baseActivity,
      rounds: [
        {
          round_title: "",
          order: 1,
          questions: sortOrdered<Question>(questions as Question[]),
        },
      ],
    } as Activity;
  });
  return [appInfo, sortOrdered<Activity>(parsedActivities)];
};
