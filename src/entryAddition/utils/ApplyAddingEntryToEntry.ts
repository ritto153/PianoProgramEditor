import { InputtingEntryToAdd, Entry } from "../../type/Entry";
import { v4 as uuidv4 } from "uuid";

export default function ApplyAddingEntryToEntry(
  addingEntry: InputtingEntryToAdd,
  partId: string,
): Entry {
  const participants = addingEntry.participants.map((participant) => {
    return {
      id: uuidv4(),
      lastName: participant.lastName,
      firstName: participant.firstName,
      faculty: participant.faculty,
      grade: participant.grade ?? 0,
    };
  });

  const works = addingEntry.works.map((work) => {
    return {
      id: uuidv4(),
      composer: work.composer,
      name: work.name,
    }
  })

  return {
    id: uuidv4(),
    partId: partId,
    participants,
    works,
    time: Number(addingEntry.time),
    memo: addingEntry.memo,
  };
}
