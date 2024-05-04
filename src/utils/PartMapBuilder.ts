import { Entry } from "../type/Entry";
import { PartMap } from "../type/Part";

type ResponsePart = {
  id: number;
  partNum: number;
  startingTime: string | null;
}

type ResponsePartMap = {
  [id: number]: ResponsePart;
}

export const PartMapBuilder = (response: {
  entries: Entry[];
  parts: ResponsePart[];
}): PartMap => {
  const { entries, parts } = response;

  const entriesByPartId = Object.groupBy(entries, (entry) => entry.partId);
  const partsByPartId: ResponsePartMap = {};
  parts.forEach((part) => {
    partsByPartId[part.id] = part;
  });

  const result: PartMap = {}

  Object.entries(entriesByPartId).forEach(([partId, entries]) => {
    if (!entries) throw new Error();

    const numPartId = Number(partId);
    const part = partsByPartId[numPartId];

    if (!part) throw new Error('エントリーの持つ部が存在しません');

    result[part.id] = {
      id: part.id,
      partNum: part.partNum,
      startingTime: part.startingTime,
      entryIds: entries.map((entry) => entry.id),
    }
  });

  return result;
};
