import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignments = db.assignments;
  console.log(aid);
  const assignment = assignments.find((a) => a._id === aid);
  return (
    <div id="wd-assignments-editor">
      <div className="container mt-4">
        {/* Assignment Name */}
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">
            Assignment Name
          </label>
          <input
            id="wd-name"
            className="form-control"
            value={assignment?.title ?? ""}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea id="wd-description" className="form-control" rows={13}>
            {assignment?.description ?? ""}
          </textarea>
        </div>
        {/* Form Fields */}
        <div className="mb-3">
          {/* Points */}
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-points">Points</label>
            </div>
            <div className="col-10">
              <input
                id="wd-points"
                className="form-control"
                value={assignment?.points ?? "0"}
              />
            </div>
          </div>
          {/* Assignment Group */}
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-group">Assignment Group</label>
            </div>
            <div className="col-10">
              <select id="wd-group" className="form-select">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              </select>
            </div>
          </div>
          {/* Display Grade As */}
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </div>
            <div className="col-10">
              <select id="wd-display-grade-as" className="form-select">
                <option value="PERCENTAGE">Percentage</option>
                <option value="LETTER">Letter Grade</option>
              </select>
            </div>
          </div>
          {/* Submission Type */}
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </div>
            <div className="col-10">
              <select id="wd-submission-type" className="form-select mb-3">
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">OFFLINE</option>
              </select>

              <div className="ms-2">
                <p className="mb-2">Online Entry Options</p>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="wd-text-entry"
                  />
                  <label className="form-check-label" htmlFor="wd-text-entry">
                    Text Entry
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="wd-website-url"
                  />
                  <label className="form-check-label" htmlFor="wd-website-url">
                    Website URL
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="wd-media-recordings"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-media-recordings"
                  >
                    Media Recordings
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="wd-student-annotation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-student-annotation"
                  >
                    Student Annotation
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="wd-file-upload"
                  />
                  <label className="form-check-label" htmlFor="wd-file-upload">
                    File Uploads
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Assign */}
          <div className="row mb-3">
            <div className="col-2 text-end pt-1">
              <label>Assign</label>
            </div>
            <div className="col-10">
              <div className="mb-3">
                <label htmlFor="wd-assign-to" className="form-label">
                  Assign to
                </label>
                <input
                  id="wd-assign-to"
                  className="form-control"
                  value="Everyone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label">
                  Due
                </label>
                <input
                  type="date"
                  id="wd-due-date"
                  className="form-control"
                  value={assignment?.due ?? "0000-00-00"}
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
                  value={assignment?.from ?? "0000-00-00"}
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
                  value={assignment?.until ?? "0000-00-00"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <Link
          className="d-flex float-end mt-4"
          to={`../Assignments`}
        >
          <button
            id="wd-cancel"
            type="button"
            className="btn btn-secondary me-2"
          >
            Cancel
          </button>
          <button id="wd-save" type="button" className="btn btn-danger">
            Save
          </button>
        </Link>
        {/* <Link
          key={link}
          to={link}
          id={`wd-course-${link}-link`}
          className={`list-group-item border border-0
              ${
                pathname.includes(link) ? "text-black active " : "text-danger"
              }`}
        >
          {link}
        </Link> */}
      </div>
    </div>
  );
}
