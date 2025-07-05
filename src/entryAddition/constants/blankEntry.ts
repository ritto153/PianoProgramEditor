
import { InputtingEntry } from "../../type/Entry";

export const blankEntry: InputtingEntry = {
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