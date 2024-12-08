import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: quiz._id,
        course: quiz.course,
        title: quiz.title,
        description: quiz.description,
        availability: quiz.availability,
        due: quiz.due,
        availableFrom: quiz.availableFrom,
        availableUntil: quiz.availableUntil,
        points: quiz.points,
        numQuestions: quiz.numQuestions,
        score: quiz.score,
        type: quiz.type,
        group: quiz.group,
        shuffle: quiz.shuffle,
        limit: quiz.limit,
        attempts: quiz.attempts,
        accessCode: quiz.accessCode,
        oneQuestion: quiz.oneQuestion,
        webcam: quiz.webcam,
        lock: quiz.lock,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
