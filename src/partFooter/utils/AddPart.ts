import { Part, PartMap } from "../../type/Part";
import { v4 as uuidv4 } from "uuid";

export const AddPart = (partId: string, partMap: PartMap) => {
  const originalPart = partMap[partId];

  const newPart: Part = {
    id: uuidv4(),
    partNum: originalPart.partNum + 1,
    startingTime: null,
    entryIds: [],
  };

  const newPartMap = { ...partMap };

  // newPart の partNum 以上の数字を持つ part の partNum を +1 する
  Object.values(newPartMap).forEach((part) => {
    if (part.partNum >= newPart.partNum) {
      part.partNum += 1;
    }
  });

  return {
    ...newPartMap,
    [newPart.id]: newPart,
  };
};
