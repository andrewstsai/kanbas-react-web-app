import { useState, useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { Route, Routes, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import QuizControlButtons from "./QuizControlButtons";
import QuizzesControlButtons from "./QuizzesControlButtons";
import QuizControls from "./QuizControls";
import { deleteQuiz, setQuizzes } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const removeQuiz = async (quizId: string) => {
    console.log(quizId);
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div>
      {currentUser.role === "FACULTY" && <QuizControls />}
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-quiz list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-quizzes-title p-3 ps-2 bg-secondary fs-4">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-1" />
            QUIZZES
            <QuizzesControlButtons />
          </div>
          <ul id="wd-quiz-list" className="wd-module list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li className="wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-2" />
                <GoChecklist className="text-success me-2 fs-2" />
                <div>
                  <a
                    className="wd-quiz-link fw-bold"
                    href={`#/Kanbas/Courses/${quiz.course}/Quizzes/Details/${quiz._id}`}
                  >
                    {quiz.title}
                  </a>
                  <div>
                    Multiple Modules | Not available until May 6 at 12:00am |
                    Due May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                {currentUser.role === "FACULTY" && (
                  <div className="ms-auto">
                    <QuizControlButtons
                      quizId={quiz._id}
                      deleteQuiz={removeQuiz}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
