import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAttempt, updateAttempt } from "./reducer";
import { useState } from "react";
import * as quizzesClient from "../client";
import * as attemptsClient from "./client";
import { useEffect } from "react";

export default function TakeQuiz() {
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { attempts } = useSelector((state: any) => state.attemptsReducer);
  const [questions, setQuestions] = useState<any[]>([]);

  const fetchQuestions = async () => {
    const fetchedQuestions = await quizzesClient.findQuestionsForQuiz(
      qid as string
    );
    setQuestions(fetchedQuestions);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const attempt = attempts.find(
    (a: any) => a.quiz === qid && a.user === currentUser._id
  ) ?? {
    _id: "new",
    user: currentUser._id,
    quiz: qid,
    attemptNum: 0,
    answers: new Array(questions.length).fill(null),
    score: 0,
  };

  const attemptNum = attempt.attemptNum + 1;
  const [answers, setAnswers] = useState(attempt.answers);

  const saveAttempt = async (attempt: any) => {
    await attemptsClient.updateAttempt(attempt);
    dispatch(updateAttempt(attempt));
  };

  const createAttemptForQuiz = async () => {
    if (!qid) return;
    const finalScore = calculateScore();
    const newAttempt = {
      ...attempt,
      user: currentUser._id,
      quiz: qid,
      attemptNum: attemptNum,
      answers: answers,
      score: finalScore,
    };
    const attemptResponse = await quizzesClient.createAttemptForQuiz(
      qid,
      currentUser._id,
      newAttempt
    );
    dispatch(addAttempt(attemptResponse));
  };

  const handleSave = async () => {
    const finalScore = calculateScore();
    if (attempt._id === "new") {
      await createAttemptForQuiz();
    } else {
      await saveAttempt({
        ...attempt,
        attemptNum: attemptNum,
        answers: answers,
        score: finalScore,
      });
    }
    navigate(`../Quizzes/Details/${qid}`);
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const userAnswer = answers[index];

      if (!userAnswer) return;

      switch (question.type) {
        case "TRUEFALSE":
          if (question.correct.includes(userAnswer)) {
            totalScore += question.points;
          }
          break;
        case "MULTIPLECHOICE":
          if (question.correct.includes(userAnswer)) {
            totalScore += question.points;
          }
          break;

        case "FILLINBLANK":
          if (
            question.correct.some(
              (correctAnswer: any) =>
                correctAnswer.toLowerCase().trim() ===
                userAnswer.toLowerCase().trim()
            )
          ) {
            totalScore += question.points;
          }
          break;
      }
    });
    console.log(totalScore);
    return totalScore;
  };

  const updateAnswer = (index: number, answer: string | string[]) => {
    const newAnswers = [...answers];

    if (Array.isArray(answer)) {
      newAnswers[index] = answer.length > 0 ? answer[0] : null;
    } else {
      newAnswers[index] = answer || null;
    }

    setAnswers(newAnswers);
  };

  const renderQuestionInput = (question: any, index: number) => {
    const userAnswer = answers[index];

    switch (question.type) {
      case "TRUEFALSE":
        return (
          <div>
            {question.choices.map((choice: string) => (
              <div key={choice} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question-${index}`}
                  value={choice}
                  checked={userAnswer === choice}
                  onChange={() => updateAnswer(index, choice)}
                />
                <label className="form-check-label">{choice}</label>
              </div>
            ))}
          </div>
        );

      case "MULTIPLECHOICE":
        return (
          <div>
            {question.choices.map((choice: string) => (
              <div key={choice} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={choice}
                  checked={userAnswer === choice}
                  onChange={(e) => {
                    updateAnswer(index, e.target.checked ? [choice] : []);
                  }}
                />
                <label className="form-check-label">{choice}</label>
              </div>
            ))}
          </div>
        );

      case "FILLINBLANK":
        return (
          <input
            type="text"
            className="form-control"
            value={userAnswer || ""}
            onChange={(e) => updateAnswer(index, e.target.value)}
            placeholder="Enter your answer"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div id="wd-attempts-editor">
      <div className="container mt-4">
        {questions.map((question, index) => (
          <div key={question._id} className="card mb-3">
            <div className="card-header">
              <strong>Question {index + 1}</strong> ({question.points} points)
            </div>
            <div className="card-body">
              <h5 className="card-title">{question.title}</h5>
              {question.description && (
                <p className="card-text">{question.description}</p>
              )}
              {renderQuestionInput(question, index)}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="d-flex float-end mt-4">
          <button
            id="wd-save"
            type="button"
            className="btn btn-danger"
            onClick={handleSave}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
