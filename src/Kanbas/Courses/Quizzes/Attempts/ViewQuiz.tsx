import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as quizzesClient from "../client";

export default function ViewQuiz() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { attempts } = useSelector((state: any) => state.attemptsReducer);
  const [questions, setQuestions] = useState<any[]>([]);

  const attempt = attempts.find(
    (a: any) => a.quiz === qid && a.user === currentUser._id
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!qid) return;
      const fetchedQuestions = await quizzesClient.findQuestionsForQuiz(
        qid as string
      );
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, [qid]);

  const isAnswerCorrect = (question: any, userAnswer: string | string[]) => {
    if (!userAnswer) return false;

    switch (question.type) {
      case "TRUEFALSE":
      case "MULTIPLECHOICE":
        return question.correct.includes(userAnswer);
      
      case "FILLINBLANK":
        return question.correct.some(
          (correctAnswer: string) => 
            correctAnswer.toLowerCase().trim() === 
            (Array.isArray(userAnswer) ? userAnswer[0] : userAnswer).toLowerCase().trim()
        );
      
      default:
        return false;
    }
  };

  if (!attempt || !questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-attempts-viewer">
      <div className="container mt-4">
        <div className="mb-4">
          <h2>Quiz Attempt Details</h2>
          <p>Attempt Number: {attempt.attemptNum}</p>
          <p>Score: {attempt.score} / {questions.reduce((total, q) => total + q.points, 0)}</p>
        </div>

        {questions.map((question, index) => (
          <div key={question._id} className="card mb-3">
            <div className="card-header">
              <strong 
                className={
                  isAnswerCorrect(question, attempt.answers[index]) 
                    ? 'text-success' 
                    : 'text-danger'
                }
              >
                Question {index + 1} ({question.points} points)
              </strong>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="d-flex float-end mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`../Quizzes/Details/${qid}`)}
          >
            Back to Quiz Details
          </button>
        </div>
      </div>
    </div>
  );
}