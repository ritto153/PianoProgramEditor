export type EntrySchedules = {
  [entryId: string]: {
    startingTime: Date | null;
    endingTime: Date | null;
  };
};
