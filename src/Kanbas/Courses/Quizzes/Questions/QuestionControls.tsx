import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function QuestionControls() {
  const { qid } = useParams();
  return (
    <div id="wd-questions-controls" className="text-nowrap d-flex ">
      <div className="ms-auto">
        <Link to="new" className="text-decoration-none">
          <button
            id="wd-add-question"
            className="btn btn-lg btn-danger me-1 float-end"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Question
          </button>
        </Link>
        <Link to={`../Quizzes/DetailsEditor/${qid}`} className="text-decoration-none">
          <button
            id="wd-add-question"
            className="btn btn-lg btn-secondary me-1 float-end"
          >
            Edit Details
          </button>
        </Link>
        <Link to="../Quizzes" className="text-decoration-none">
          <button
            id="wd-add-question"
            className="btn btn-lg btn-secondary me-1 float-end"
          >
            Save
          </button>
        </Link>
        <Link to="../Quizzes" className="text-decoration-none">
          <button
            id="wd-add-question"
            className="btn btn-lg btn-secondary me-1 float-end"
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
}
