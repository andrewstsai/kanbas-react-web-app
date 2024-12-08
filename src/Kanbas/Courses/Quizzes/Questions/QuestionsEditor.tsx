import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "./reducer";
import { useState, useEffect } from "react";
import * as quizzesClient from "../client";
import * as questionsClient from "./client";
import { FaTrash } from "react-icons/fa";

export default function QuestionsEditor() {
  const { pathname } = useLocation();
  const { qid, quesid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNewQuestion = pathname.endsWith("new");
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const question = isNewQuestion
    ? {
        _id: new Date().getTime().toString(),
        quiz: qid,
        type: "MULTIPLECHOICE",
        title: "",
        points: 0,
        description: "",
        choices: [],
        correct: [],
      }
    : questions.find((q: any) => q._id === quesid);

  const [title, setTitle] = useState(question.title);
  const [description, setDescription] = useState(question.description);
  const [type, setType] = useState(question.type);
  const [points, setPoints] = useState(question.points);
  const [choices, setChoices] = useState<string[]>(question.choices || []);
  const [correct, setCorrect] = useState<string[]>(question.correct || []);

  useEffect(() => {
    switch (type) {
      case "TRUEFALSE":
        setChoices(["True", "False"]);
        setCorrect([]);
        break;
      case "MULTIPLECHOICE":
        setChoices(choices.length === 0 ? Array(4).fill("") : choices);
        setCorrect([]);
        break;
      case "FILLINBLANK":
        setChoices([]);
        setCorrect([]);
        break;
    }
  }, [type]);

  const saveQuestion = async (question: any) => {
    await questionsClient.updateQuestion(question);
    dispatch(updateQuestion(question));
  };

  const createQuestionForQuiz = async () => {
    if (!qid) return;
    const newQuestion = {
      ...question,
      quiz: qid,
      type: type,
      title: title,
      points: points,
      description: description,
      choices: choices,
      correct: correct,
    };
    const questionResponse = await quizzesClient.createQuestionForQuiz(
      qid,
      newQuestion
    );
    dispatch(addQuestion(questionResponse));
  };

  const handleSave = async () => {
    if (isNewQuestion) {
      await createQuestionForQuiz();
      navigate(`../Quizzes/Questions/${qid}`);
    } else {
      console.log(type);
      console.log(title);
      console.log(points);
      console.log(description);
      console.log(choices);
      await saveQuestion({
        ...question,
        type: type,
        title: title,
        points: points,
        description: description,
        choices: choices,
        correct: correct,
      });
      navigate(`../Quizzes/Questions/${qid}`);
    }
  };

  const handleCancel = () => {
    navigate(`../Quizzes/Questions/${qid}`);
  };

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const removeChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
    const newCorrect = correct.filter(c => c !== choices[index]);
    setCorrect(newCorrect);
  };

  const toggleCorrect = (value: string) => {
    setCorrect(prev => 
      prev.includes(value) 
        ? prev.filter(c => c !== value) 
        : [...prev, value]
    );
  };

  const renderChoices = () => {
    switch (type) {
      case "TRUEFALSE":
        return choices.map((choice, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              value={choice}
              readOnly
            />
            <div className="input-group-text">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                checked={correct.includes(choice)}
                onChange={() => toggleCorrect(choice)}
              />
            </div>
          </div>
        ));

      case "MULTIPLECHOICE":
        return choices.map((choice, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder={`Option ${index + 1}`}
              value={choice}
              onChange={(e) => updateChoice(index, e.target.value)}
            />
            <div className="input-group-text">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                checked={correct.includes(choice)}
                onChange={() => toggleCorrect(choice)}
              />
            </div>
            <button 
              className="btn btn-outline-secondary" 
              type="button"
              onClick={() => removeChoice(index)}
            >
              <FaTrash />
            </button>
          </div>
        ));

      case "FILLINBLANK":
        return correct.map((answer, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Correct Answer"
              value={answer}
              onChange={(e) => {
                const newCorrect = [...correct];
                newCorrect[index] = e.target.value;
                setCorrect(newCorrect);
              }}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button"
              onClick={() => {
                const newCorrect = correct.filter((_, i) => i !== index);
                setCorrect(newCorrect);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ));

      default:
        return null;
    }
  };

  const addMoreOptions = () => {
    if (type === "MULTIPLECHOICE") {
      setChoices([...choices, ""]);
    } else if (type === "FILLINBLANK") {
      setCorrect([...correct, ""]);
    }
  };

  return (
    <div id="wd-questions-editor">
      <div className="container mt-4">
        {/* Question Name */}
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">
            Question Title
          </label>
          <input
            id="wd-name"
            className="form-control"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-10">
          <select
            onChange={(e) => setType(e.target.value)}
            className="form-control mb-2"
            id="wd-type"
            value={type}
          >
            <option value="MULTIPLECHOICE">Multiple Choice</option>
            <option value="TRUEFALSE">True/False</option>
            <option value="FILLINBLANK">Fill in Blank</option>
          </select>
        </div>
        <div className="col-10">
          <div>
            <label htmlFor="wd-points">Points</label>
          </div>
          <div className="mb-4">
            <input
              id="wd-points"
              type="number"
              className="form-control"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <textarea
            id="wd-description"
            className="form-control"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        {/* Dynamic Inputs */}
        <div className="mb-4">
          <h6>{type === "FILLINBLANK" ? "Correct Answers" : "Choices"}</h6>
          {renderChoices()}
          {(type === "MULTIPLECHOICE" || type === "FILLINBLANK") && (
            <button 
              className="btn btn-outline-secondary mt-2" 
              onClick={addMoreOptions}
            >
              Add {type === "MULTIPLECHOICE" ? "Choice" : "Answer"}
            </button>
          )}
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
        </div>
      </div>
    </div>
  );
}