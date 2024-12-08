import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import * as quizzesClient from "./client";

export default function QuizDetails() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { attempts } = useSelector((state: any) => state.attemptsReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const attempt = attempts.find(
    (a: any) => a.quiz === qid && a.user === currentUser._id
  );

  console.log(attempt);
  console.log(quiz.attempts);

  const handleCancel = () => {
    navigate("../Quizzes");
  };

  const editQuiz = () => {
    navigate(`../Quizzes/DetailsEditor/${qid}`);
  };

  const startQuiz = () => {
    if (attempt !== undefined && attempt.attemptNum >= quiz.attempts) {
      navigate(`../Quizzes/ViewQuiz/${qid}`);
    } else {
      navigate(`../Quizzes/TakeQuiz/${qid}`);
    }
  };

  return (
    <div>
      <h2>Quiz Information</h2>
      <p>Quiz Type: {quiz.type}</p>
      <p>Points: {quiz.points}</p>
      <p>Assignment Group: {quiz.group}</p>
      <p>Time Limit: {quiz.limit} minutes</p>
      <p>Multiple Attempts: {quiz.attempts > 1}</p>
      <p>Show Correct Answers: {quiz.showCorrectAnswers}</p>
      <p>One Question at a Time: {quiz.oneQuestion}</p>
      <p>Require Respondus LockDown: {quiz.lock}</p>
      <p>Webcam Required: {quiz.webcam}</p>
      <p>Due: {quiz.dueDate}</p>
      <p>Available from: {quiz.availableFrom}</p>
      <p>Until: {quiz.availableUntil}</p>
      <div className="d-flex float-end mt-4">
        <button
          id="wd-cancel"
          type="button"
          className="btn btn-secondary me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          id="wd-start"
          type="button"
          className="btn btn-secondary me-2"
          onClick={startQuiz}
        >
          {attempt !== undefined && attempt.attemptNum >= quiz.attempts
            ? "View Results"
            : "Start Quiz"}
        </button>
        {currentUser.role === "FACULTY" && (
          <button
            id="wd-edit"
            type="button"
            className="btn btn-secondary me-2"
            onClick={editQuiz}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
