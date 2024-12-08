import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};

export const createAttemptForQuiz = async (
  quizId: string,
  userId: string,
  attempt: any
) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts/${userId}`,
    attempt
  );
  return response.data;
};

export const findAttemptsForQuiz = async (quizId: string, userId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/${userId}`
  );
  return response.data;
};
