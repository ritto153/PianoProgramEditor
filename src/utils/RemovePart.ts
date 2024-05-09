import { PartMap } from "../type/Part";

export const RemovePart = (partId: string, partMap: PartMap) => {
  const originalPart = partMap[partId];

  const newPartMap = { ...partMap };

  // 削除するpartより後ろのpartのpartNumを-1する
  Object.values(newPartMap).forEach((part) => {
    if (part.partNum > originalPart.partNum) {
      part.partNum -= 1;
    }
  });

  delete newPartMap[partId];

  return newPartMap;
};
