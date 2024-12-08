import { useState, useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { Route, Routes, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as quizzesClient from "../client";
import * as questionsClient from "./client";
import { deleteQuestion, setQuestions } from "./reducer";
import QuestionControls from "./QuestionControls";
import QuestionsControlButtons from "./QuestionsControlButtons";
import QuestionControlButtons from "./QuestionControlButtons";

export default function Questions() {
  const { cid, qid } = useParams();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const removeQuestion = async (questionId: string) => {
    console.log(questionId);
    await questionsClient.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
  };
  console.log(cid)
  console.log(qid);


  const fetchQuestions = async () => {
    const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <div>
      {currentUser.role === "FACULTY" && <QuestionControls />}
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-questions" className="list-group rounded-0">
        <li className="wd-question list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-questions-title p-3 ps-2 bg-secondary fs-4">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-1" />
            QUESTIONS
            <QuestionsControlButtons />
          </div>
          <ul id="wd-question-list" className="wd-module list-group rounded-0">
            {questions.map((question: any) => (
              <li className="wd-question-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-2" />
                <GoChecklist className="text-success me-2 fs-2" />
                <div>
                  <a
                    className="wd-question-link fw-bold"
                    href={`#/Kanbas/Courses/${cid}/Quizzes/Questions/${question.quiz}/${question._id}`}
                  >
                    {question.title}
                  </a>
                </div>
                {currentUser.role === "FACULTY" && (
                  <div className="ms-auto">
                    <QuestionControlButtons
                      questionId={question._id}
                      deleteQuestion={removeQuestion}
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
