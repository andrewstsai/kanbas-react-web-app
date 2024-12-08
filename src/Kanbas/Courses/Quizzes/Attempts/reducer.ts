import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  attempts: [],
};
const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    setAttempts: (state, action) => {
      state.attempts = action.payload;
    },
    addAttempt: (state, { payload: attempt }) => {
      const newAttempt: any = {
        _id: attempt._id,
        user: attempt.user,
        quiz: attempt.quiz,
        attemptNum: attempt.attemptNum,
        answers: attempt.answers,
        score: attempt.score,
      };
      state.attempts = [...state.attempts, newAttempt] as any;
    },
    updateAttempt: (state, { payload: attempt }) => {
      state.attempts = state.attempts.map((q: any) =>
        q._id === attempt._id ? attempt : q
      ) as any;
    },
  },
});
export const { addAttempt, updateAttempt, setAttempts } =
  attemptsSlice.actions;
export default attemptsSlice.reducer;
