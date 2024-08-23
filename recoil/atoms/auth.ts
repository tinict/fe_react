import { atom } from "recoil";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

export const auth = atom({
  key: "TodoList",
  default: initialState,
});
