import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NotesStatus = "ACTIVE" | "INACTIVE";

type UIState = {
  notesStatus: NotesStatus;
};

const initialState: UIState = {
  notesStatus: "ACTIVE",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotesStatus(state, action: PayloadAction<NotesStatus>) {
      state.notesStatus = action.payload;
    },
    toggleNotesStatus(state) {
      state.notesStatus =
        state.notesStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    },
  },
});

export const { setNotesStatus, toggleNotesStatus } = uiSlice.actions;
export default uiSlice.reducer;
