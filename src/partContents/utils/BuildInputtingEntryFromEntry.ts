import { Entry, InputtingEntry } from "../../type/Entry";

export const BuildInputtingEntryFromEntry = (entry: Entry): InputtingEntry => ({
  participants: entry.participants.map((participant) => ({
    lastName: participant.lastName,
    firstName: participant.firstName,
    faculty: participant.faculty,
    grade: participant.grade,
  })),
  works: entry.works.map((work) => ({
    composer: work.composer,
    name: work.name,
  })),
  time: entry.time,
  memo: entry.memo,
});
