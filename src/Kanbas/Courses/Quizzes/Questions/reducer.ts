import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  questions: [],
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: question._id,
        quiz: question.quiz,
        type: question.type,
        title: question.title,
        points: question.points,
        description: question.description,
        choices: question.choices,
        correct: question.correct,
      };
      state.questions = [...state.questions, newQuestion] as any;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
  },
});
export const { addQuestion, deleteQuestion, updateQuestion, setQuestions } =
  questionsSlice.actions;
export default questionsSlice.reducer;
