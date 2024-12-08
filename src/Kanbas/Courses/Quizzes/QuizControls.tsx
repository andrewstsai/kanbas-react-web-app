import { FaPlus } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Link } from "react-router-dom";
export default function QuizControls() {
  return (
    <div id="wd-quizzes-controls" className="text-nowrap d-flex ">
      <div className="input-group me-5">
        <span className="input-group-text">
          <HiOutlineMagnifyingGlass />
        </span>
        <input
          type="text"
          id="wd-search-quiz"
          className="form-control"
          placeholder="Search for Quizzes"
        />
      </div>
      <div className="ms-auto">
        <button
          id="wd-add-quiz-group"
          className="btn btn-lg btn-secondary me-1 float-end"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </button>
      </div>
      <div className="ms-auto">
        <Link to="DetailsEditor/new" className="text-decoration-none">
          <button
            id="wd-add-quiz"
            className="btn btn-lg btn-danger me-1 float-end"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </button>
        </Link>
      </div>
    </div>
  );
}
