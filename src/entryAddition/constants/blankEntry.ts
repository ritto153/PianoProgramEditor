
import { InputtingEntryToAdd } from "../../type/Entry";

export const blankEntry: InputtingEntryToAdd = {
  participants: [
    {
      lastName: "",
      firstName: "",
      faculty: "",
      grade: null,
    },
  ],
  works: [
    {
      composer: "",
      name: "",
    },
  ],
  time: null,
  memo: "",
};