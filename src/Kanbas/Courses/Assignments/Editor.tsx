import { useLocation, useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { useState } from "react";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

export default function AssignmentEditor() {
  const { pathname } = useLocation();
  const { aid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNewAssignment = pathname.endsWith("new");
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = isNewAssignment
    ? {
        _id: new Date().getTime().toString(),
        title: "",
        course: cid,
        description: "",
        points: "",
        dueDate: new Date(),
        availableFrom: new Date(),
        availableUntil: new Date(),
      }
    : assignments.find((a: any) => a._id === aid);
  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };
  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {
      ...assignment,
      title: title,
      description: description,
      points: points,
      dueDate: dueDate,
      availableFrom: availableFrom,
      availableUntil: availableUntil,
    };
    const assignmentResponse = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignment
    );
    dispatch(addAssignment(assignmentResponse));
  };

  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [points, setPoints] = useState(assignment.points);
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [availableFrom, setAvailableFrom] = useState(assignment.availableFrom);
  const [availableUntil, setAvailableUntil] = useState(
    assignment.availableUntil
  );

  const handleSave = async () => {
    if (isNewAssignment) {
      await createAssignmentForCourse();
      navigate("../Assignments");
    } else {
      await saveAssignment({
        ...assignment,
        title: title,
        description: description,
        points: points,
        dueDate: dueDate,
        availableFrom: availableFrom,
        availableUntil: availableUntil,
      });
      navigate("../Assignments");
    }
  };

  const handleCancel = () => {
    navigate("../Assignments");
  };
  console.log(assignment);
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
            defaultValue={assignment?.title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            id="wd-description"
            className="form-control"
            rows={13}
            defaultValue={assignment?.description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
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
                defaultValue={assignment?.points || ""}
                onChange={(e) => setPoints(e.target.value)}
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
                  defaultValue={
                    // assignment?.dueDate?.toISOString().split("T")[0] || ""
                    assignment?.dueDate || ""
                  }
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
                  defaultValue={
                    // assignment?.availableFrom?.toISOString().split("T")[0] || ""
                    assignment?.availableFrom || ""
                  }
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
                  defaultValue={
                    // assignment?.availableUntil?.toISOString().split("T")[0] ||
                    // ""
                    assignment?.availableUntil || ""
                  }
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
        </div>
      </div>
    </div>
  );
}
