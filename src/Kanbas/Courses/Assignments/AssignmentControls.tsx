import { FaPlus } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
export default function AssignmentControls() {
  return (
    <div id="wd-assignments-controls" className="text-nowrap d-flex ">
      <div className="input-group me-5">
        <span className="input-group-text">
          <HiOutlineMagnifyingGlass />
        </span>
        <input
          type="text"
          id="wd-search-assignment"
          className="form-control"
          placeholder="Search for Assignments"
        />
      </div>
      <div className="ms-auto">
        <button
          id="wd-add-assignment-group"
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
        <button
          id="wd-add-assignment"
          className="btn btn-lg btn-danger me-1 float-end"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </button>
      </div>
    </div>
  );
}
