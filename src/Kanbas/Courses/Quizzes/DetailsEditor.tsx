import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import { useState } from "react";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";

export default function DetailsEditor() {
  const { pathname } = useLocation();
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNewQuiz = pathname.endsWith("new");
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = isNewQuiz
    ? {
        _id: new Date().getTime().toString(),
        course: cid,
        title: "",
        description: "",
        type: "GRADED QUIZ",
        limit: 20,
        attempts: 1,
        dueDate: new Date(),
        availableFrom: new Date(),
        availableUntil: new Date(),
      }
    : quizzes.find((q: any) => q._id === qid);
  const saveQuiz = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = {
      ...quiz,
      course: cid,
      title: title,
      description: description,
      type: type,
      group: group,
      limit: limit,
      attempts: attempts,
      dueDate: dueDate,
      availableFrom: availableFrom,
      availableUntil: availableUntil,
    };
    const quizResponse = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quizResponse));
  };

  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [dueDate, setDueDate] = useState(quiz.dueDate);
  const [availableFrom, setAvailableFrom] = useState(quiz.availableFrom);
  const [availableUntil, setAvailableUntil] = useState(quiz.availableUntil);
  const [type, setType] = useState(quiz.type);
  const [group, setGroup] = useState(quiz.group);
  const [limit, setLimit] = useState(quiz.limit);
  const [attempts, setAttempts] = useState(quiz.attempts);

  const handleSave = async () => {
    if (isNewQuiz) {
      await createQuizForCourse();
      navigate("../Quizzes");
    } else {
      await saveQuiz({
        ...quiz,
        title: title,
        description: description,
        type: type,
        group: group,
        limit: limit,
        attempts: attempts,
        dueDate: dueDate,
        availableFrom: availableFrom,
        availableUntil: availableUntil,
      });
      navigate("../Quizzes");
    }
  };

  const editQuestions = async () => {
    if (isNewQuiz) {
      await createQuizForCourse();
      navigate(`../Quizzes/Questions/${qid}`);
    } else {
      await saveQuiz({
        ...quiz,
        title: title,
        description: description,
        type: type,
        group: group,
        limit: limit,
        attempts: attempts,
        dueDate: dueDate,
        availableFrom: availableFrom,
        availableUntil: availableUntil,
      });
      navigate(`../Quizzes/Questions/${qid}`);
    }
  }

  const handleCancel = () => {
    navigate("../Quizzes");
  };
  return (
    <div id="wd-quizzes-editor">
      <div className="container mt-4">
        {/* Quiz Name */}
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">
            Quiz Name
          </label>
          <input
            id="wd-name"
            className="form-control"
            defaultValue={quiz?.title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            id="wd-description"
            className="form-control"
            rows={13}
            defaultValue={quiz?.description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Form Fields */}
        <div className="mb-3">
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-type">Type</label>
            </div>
            <div className="col-10">
              <select
                onChange={(e) =>
                  setType(e.target.value)
                }
                className="form-control mb-2"
                id="wd-type"
                defaultValue="GRADED QUIZ"
              >
                <option value="GRADED QUIZ">Graded Quiz</option>{" "}
                <option value="PRACTICE QUIZ">Practice Quiz</option>
                <option value="GRADED SURVEY">Graded Survey</option>{" "}
                <option value="PRACTICE SURVEY">Practice Survey</option>
              </select>
            </div>
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-group">Group</label>
            </div>
            <div className="col-10">
              <select
                onChange={(e) =>
                  setGroup(e.target.value)
                }
                className="form-control mb-2"
                id="wd-group"
                defaultValue="QUIZZES"
              >
                <option value="QUIZZES">QUIZZES</option>{" "}
                <option value="EXAMS">EXAMS</option>{" "}
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECTS">PROJECTS</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-limit">Time Limit</label>
            </div>
            <div className="col-10">
              <input
                id="wd-limit"
                className="form-control"
                defaultValue={quiz?.limit || 20}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-attempts">Attempts</label>
            </div>
            <div className="col-10">
              <input
                id="wd-attempts"
                className="form-control"
                defaultValue={quiz?.attempts || 1}
                onChange={(e) => setAttempts(e.target.value)}
              />
            </div>
          </div>
          {/* Assign */}
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label>Assign</label>
            </div>
            <div className="col-10">
              <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label">
                  Due
                </label>
                <input
                  type="date"
                  id="wd-due-date"
                  className="form-control"
                  defaultValue={quiz?.dueDate || ""}
                  onChange={(e) => setDueDate(new Date(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wd-available-from" className="form-label">
                  Available from
                </label>
                <input
                  type="date"
                  id="wd-available-from"
                  className="form-control"
                  defaultValue={quiz?.availableFrom || ""}
                  onChange={(e) => setAvailableFrom(new Date(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wd-available-until" className="form-label">
                  Until
                </label>
                <input
                  type="date"
                  id="wd-available-until"
                  className="form-control"
                  defaultValue={quiz?.availableUntil || ""}
                  onChange={(e) => setAvailableUntil(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
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
            id="wd-save"
            type="button"
            className="btn btn-danger"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            id="wd-questions"
            type="button"
            className="btn btn-danger"
            onClick={editQuestions}
          >
            Save and Edit Questions
          </button>
        </div>
      </div>
    </div>
  );
}
