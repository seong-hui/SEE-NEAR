import { atom } from "recoil";

export const selectedDateState = atom({
  key: "selectedDateState",
  default: new Date(),
});
